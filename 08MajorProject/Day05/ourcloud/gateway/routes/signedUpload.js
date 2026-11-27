import express from 'express';
import { requireValidSignature } from '../signature.js';

export const signedUploadRouter = express.Router();

const STORAGE = process.env.STORAGE_NODE_URL;
const INTERNAL_TOKEN = process.env.INTERNAL_TOKEN;

// CORS: the Browser runs on Aman's website (another origin), and uploads to us.
// Browsers block that unless WE say it's allowed.
function allowBrowsers(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Checksum-SHA256');
  if (req.method === 'OPTIONS') return res.status(204).end(); // the browser's "may I?" question
  next();
}

signedUploadRouter.use('/signed-upload', allowBrowsers);

// UPLOAD with a signed URL: no API secret involved, only the signature
signedUploadRouter.put('/signed-upload', requireValidSignature, async (req, res) => {
  const url = `${STORAGE}/pieces/${req.cloudName}/${req.publicId}/original`;

  const headers = { 'content-length': req.headers['content-length'], 'x-internal-token': INTERNAL_TOKEN };
  if (req.headers['x-checksum-sha256']) headers['x-checksum-sha256'] = req.headers['x-checksum-sha256'];

  try {
    const response = await fetch(url, { method: 'PUT', body: req, duplex: 'half', headers });
    const result = await response.json();
    res.status(response.status).json({ publicId: req.publicId, ...result });
  } catch {
    res.status(502).json({ error: 'Storage node is not reachable' });
  }
});