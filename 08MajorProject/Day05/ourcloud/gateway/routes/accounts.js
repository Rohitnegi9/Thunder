import express from 'express';
import { Account, ApiKey } from '../db.js';
import { hashPassword, verifyPassword, encrypt, newApiKey, newApiSecret } from '../crypto.js';
import { createLoginToken, requireLogin } from '../session.js';

export const accountsRouter = express.Router();
accountsRouter.use(express.json());

// ---------- Account: signup, login, me, logout everywhere ----------

// SIGN UP: create the account and log the person in straight away
accountsRouter.post('/accounts/signup', async (req, res) => {
  const { email, password, cloudName } = req.body ?? {};

  if (!email || !password || password.length < 8) {
    return res.status(400).json({ error: 'email and password (8+ characters) are required' });
  }
  if (!/^[a-z0-9-]{3,30}$/.test(cloudName ?? '')) {
    return res.status(400).json({ error: 'cloudName: 3-30 characters, lowercase letters, numbers and -' });
  }

  let account;
  try {
    account = await Account.create({ email, cloudName, passwordHash: hashPassword(password) });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ error: 'cloudName or email already taken' });
    throw error;
  }

  res.status(201).json({ cloudName, ...createLoginToken(account) });
});

// LOG IN: email + password → a token valid for 8 hours
accountsRouter.post('/accounts/login', async (req, res) => {
  const { email, password } = req.body ?? {};
  const account = await Account.findOne({ email });

  // Same message for "no such email" and "wrong password":
  // don't tell an attacker which emails exist.
  if (!account || !verifyPassword(password ?? '', account.passwordHash)) {
    return res.status(401).json({ error: 'Wrong email or password' });
  }

  res.json({ cloudName: account.cloudName, ...createLoginToken(account) });
});

// WHO AM I: lets the dashboard check its token
accountsRouter.get('/accounts/me', requireLogin, (req, res) => {
  res.json({ cloudName: req.account.cloudName, email: req.account.email });
});

// LOG OUT EVERYWHERE: every token issued before now stops working
accountsRouter.post('/accounts/logout-all', requireLogin, async (req, res) => {
  await Account.updateOne({ _id: req.account._id }, { $inc: { tokenVersion: 1 } });
  res.json({ message: 'Logged out on all devices' });
});

// ---------- API keys: managed by a LOGGED-IN person ----------

// Creates a key, saves its secret encrypted, and returns the secret ONCE
async function createKey(cloudName, role) {
  const apiKey = newApiKey();
  const apiSecret = newApiSecret();
  await ApiKey.create({ apiKey, cloudName, role, secretEncrypted: encrypt(apiSecret) });
  return { apiKey, apiSecret, role, warning: 'Save apiSecret now. It will never be shown again.' };
}

// CREATE a key
accountsRouter.post('/keys', requireLogin, async (req, res) => {
  const role = req.body?.role;
  if (!['admin', 'upload', 'read'].includes(role)) {
    return res.status(400).json({ error: 'role must be admin, upload or read' });
  }
  res.status(201).json(await createKey(req.cloudName, role));
});

// LIST keys (never shows secrets)
accountsRouter.get('/keys', requireLogin, async (req, res) => {
  const keys = await ApiKey.find({ cloudName: req.cloudName })
    .select('apiKey role status lastUsedAt createdAt -_id');
  res.json(keys);
});

// REVOKE a key
accountsRouter.delete('/keys/:apiKey', requireLogin, async (req, res) => {
  const result = await ApiKey.updateOne(
    { apiKey: req.params.apiKey, cloudName: req.cloudName },
    { status: 'revoked' },
  );
  if (result.matchedCount === 0) return res.status(404).json({ error: 'Key not found' });
  res.json({ revoked: req.params.apiKey });
});