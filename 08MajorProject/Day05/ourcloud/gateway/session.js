import jwt from 'jsonwebtoken';
import { Account } from './db.js';

const JWT_SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.LOGIN_TOKEN_EXPIRES_IN || '8h';

// Called after a successful login or signup
export function createLoginToken(account) {
  const token = jwt.sign(
    { cloudName: account.cloudName, tokenVersion: account.tokenVersion },
    JWT_SECRET,
    { expiresIn: EXPIRES_IN },             // the expiry goes INSIDE the signed data
  );
  const { exp } = jwt.decode(token);       // exp = expiry time, in seconds
  return { token, expiresAt: new Date(exp * 1000) };
}

// Middleware for routes only a logged-in person may use
export async function requireLogin(req, res, next) {
  // 1. Expect the header:  Authorization: Bearer <token>
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Please log in' });

  // 2. Check the signature and the expiry
  let data;
  try {
    data = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    const message = error.name === 'TokenExpiredError'
      ? 'Your session has expired, please log in again'
      : 'Invalid login token';
    return res.status(401).json({ error: message });
  }

  // 3. Was this person logged out everywhere after the token was made?
  const account = await Account.findOne({ cloudName: data.cloudName });
  if (!account || account.tokenVersion !== data.tokenVersion) {
    return res.status(401).json({ error: 'You have been logged out, please log in again' });
  }

  // Remember who is logged in, for the route handler
  req.account = account;
  req.cloudName = account.cloudName;
  next();
}