import express from 'express';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { requireApiKey } from '../auth.js';

export const filesRouter = express.Router();

const STORAGE = process.env.STORAGE_NODE_URL;
const INTERNAL_TOKEN = process.env.INTERNAL_TOKEN;

function storageUrl({ cloud, video, file }) {
  return `${STORAGE}/pieces/${encodeURIComponent(cloud)}/${encodeURIComponent(video)}/${encodeURIComponent(file)}`;
}

// UPLOAD: requires a key with the "upload" permission, for THIS cloud
filesRouter.put('/upload/:cloud/:video/:file', requireApiKey('upload'), async (req, res) => {
  const size = req.headers['content-length'];
  if (!size) return res.status(411).json({ error: 'Content-Length header is required' });

  const headers = { 'content-length': size, 'x-internal-token': INTERNAL_TOKEN };
  if (req.headers['x-checksum-sha256']) headers['x-checksum-sha256'] = req.headers['x-checksum-sha256'];

  try {
    const response = await fetch(storageUrl(req.params), { method: 'PUT', body: req, duplex: 'half', headers });
    res.status(response.status).json(await response.json());
  } catch {
    res.status(502).json({ error: 'Storage node is not reachable' });
  }
});

// DOWNLOAD: requires the "read" permission (public playback comes in a later module)
filesRouter.get('/videos/:cloud/:video/:file', requireApiKey('read'), async (req, res) => {
  const headers = { 'x-internal-token': INTERNAL_TOKEN };
  if (req.headers.range) headers.range = req.headers.range;

  try {
    const response = await fetch(storageUrl(req.params), { headers });
    res.status(response.status);
    for (const name of ['content-type', 'content-length', 'content-range', 'accept-ranges']) {
      const value = response.headers.get(name);
      if (value) res.setHeader(name, value);
    }
    if (!response.body) return res.end();
    await pipeline(Readable.fromWeb(response.body), res);
  } catch {
    if (!res.headersSent) res.status(502).json({ error: 'Storage node is not reachable' });
  }
});