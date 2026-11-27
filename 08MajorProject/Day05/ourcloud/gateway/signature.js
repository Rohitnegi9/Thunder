import { ApiKey } from './db.js';
import { decrypt, safeEqual } from './crypto.js';
import { createSignature } from '../sdk/index.js';

const SAFE_ID = /^[a-zA-Z0-9_-]{1,100}$/;

// Checks a signed upload URL, step by step
export async function requireValidSignature(req, res, next) {
  const { cloud, public_id, api_key, max_bytes, expires, signature } = req.query;

  // 1. Are all the fields there?
  if (!cloud || !public_id || !api_key || !max_bytes || !expires || !signature) {
    return res.status(400).json({ error: 'This upload URL is incomplete' });
  }
  if (!SAFE_ID.test(public_id)) {
    return res.status(400).json({ error: 'Invalid public_id' });
  }

  // 2. Has it expired? (cheap check first, before touching the database)
  if (Date.now() / 1000 > Number(expires)) {
    return res.status(401).json({ error: 'This upload URL has expired' });
  }

  // 3. Is the key real, active, and from this cloud?
  const key = await ApiKey.findOne({ apiKey: api_key });
  if (!key || key.status !== 'active' || key.cloudName !== cloud) {
    return res.status(401).json({ error: 'Invalid upload URL' });
  }

  // 4. Is the key allowed to upload?
  if (!['admin', 'upload'].includes(key.role)) {
    return res.status(403).json({ error: `A "${key.role}" key cannot sign uploads` });
  }

  // 5. Recompute the signature with OUR copy of the secret, and compare
  const expected = createSignature(
    { action: 'upload', cloud, public_id, api_key, max_bytes, expires },
    decrypt(key.secretEncrypted),
  );
  if (!safeEqual(signature, expected)) {
    return res.status(401).json({ error: 'Invalid signature: the URL was changed' });
  }

  // 6. Is the file within the size Aman allowed?
  const size = Number(req.headers['content-length']);
  if (!size) return res.status(411).json({ error: 'Content-Length header is required' });
  if (size > Number(max_bytes)) {
    return res.status(413).json({ error: `File is ${size} bytes, this URL allows at most ${max_bytes}` });
  }

  req.cloudName = cloud;
  req.publicId = public_id;
  next();
}