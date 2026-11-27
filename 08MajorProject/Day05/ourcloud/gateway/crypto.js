import crypto from 'node:crypto';

// ---------- Passwords: HASH them (we never need the original back) ----------
export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(':');
  const check = crypto.scryptSync(password, salt, 64).toString('hex');
  return safeEqual(check, hash);
}

// ---------- API secrets: ENCRYPT them (Module 4 needs the original back for HMAC) ----------
const MASTER_KEY = Buffer.from(process.env.MASTER_KEY, 'hex'); // 32 bytes

export function encrypt(text) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', MASTER_KEY, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decrypt(stored) {
  const [iv, tag, encrypted] = stored.split(':').map((part) => Buffer.from(part, 'hex'));
  const decipher = crypto.createDecipheriv('aes-256-gcm', MASTER_KEY, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8');
}

// ---------- Helpers ----------
export function newApiKey() {
  return 'ak_' + crypto.randomBytes(12).toString('hex');
}

export function newApiSecret() {
  return 'sk_' + crypto.randomBytes(24).toString('base64url');
}

// Compares two strings without leaking (through timing) how many characters matched
export function safeEqual(a, b) {
  const hashA = crypto.createHash('sha256').update(String(a)).digest();
  const hashB = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}