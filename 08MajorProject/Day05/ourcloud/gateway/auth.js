import { ApiKey } from './db.js';
import { decrypt, safeEqual } from './crypto.js';

// What each role is allowed to do
const PERMISSIONS = {
  admin: ['upload', 'read'],
  upload: ['upload'],
  read: ['read'],
};

// Use it on a route like:  requireApiKey('upload')
export function requireApiKey(permission) {
  return async (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    const apiSecret = req.headers['x-api-secret'];

    // 1. Did they send credentials at all?
    if (!apiKey || !apiSecret) {
      return res.status(401).json({ error: 'Send X-Api-Key and X-Api-Secret headers' });
    }

    // 2. Does this key exist, and is it still active?
    const key = await ApiKey.findOne({ apiKey });
    if (!key || key.status !== 'active') {
      return res.status(401).json({ error: 'Invalid API key or secret' });
    }

    // 3. Is the secret correct?
    if (!safeEqual(apiSecret, decrypt(key.secretEncrypted))) {
      return res.status(401).json({ error: 'Invalid API key or secret' });
    }

    // 4. Is it THEIR account? (Aman's key can't touch another company's files)
    if (req.params.cloud && req.params.cloud !== key.cloudName) {
      return res.status(403).json({ error: 'This key does not belong to that cloud' });
    }

    // 5. Does the key's role allow this action?
    if (!PERMISSIONS[key.role].includes(permission)) {
      return res.status(403).json({ error: `A "${key.role}" key cannot do "${permission}"` });
    }

    // Remember who is calling, for the route handler
    req.cloudName = key.cloudName;

    // Record when the key was last used (don't wait for it)
    ApiKey.updateOne({ _id: key._id }, { lastUsedAt: new Date() }).catch(() => {});

    next();
  };
}