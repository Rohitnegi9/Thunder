import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { saveFile } from './saveFile.js';

const NODE_ID = process.env.NODE_ID;
const PORT = process.env.PORT;
const DATA_DIR = path.resolve(process.env.DATA_DIR);

const FILES_FOLDER = path.join(DATA_DIR, 'files'); // complete files only
const TMP_FOLDER = path.join(DATA_DIR, 'tmp');     // uploads in progress

// When the server starts, no upload can be in progress.
// So anything left in tmp/ is junk from a crash: delete it.
fs.rmSync(TMP_FOLDER, { recursive: true, force: true });
fs.mkdirSync(TMP_FOLDER, { recursive: true });
fs.mkdirSync(FILES_FOLDER, { recursive: true });

const app = express();

// Only allow simple names: letters, numbers, _ and -, plus one optional extension.
// This blocks tricks like "../../secret".
const SAFE_NAME = /^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9]+)?$/;

function getFilePath(req) {
  const { cloud, video, file } = req.params;
  const allSafe = [cloud, video, file].every((name) => SAFE_NAME.test(name));
  if (!allSafe) return null;
  return path.join(FILES_FOLDER, cloud, video, file);
}

// SAVE a file
app.put('/pieces/:cloud/:video/:file', async (req, res) => {
  const filePath = getFilePath(req);
  if (!filePath) return res.status(400).json({ error: 'Invalid name' });

  try {
    const result = await saveFile(req, filePath, TMP_FOLDER);
    console.log(`Saved ${req.params.file} (${result.size} bytes)`);
    res.status(201).json({ node: NODE_ID, ...result });
  } catch (error) {
    console.log(`Rejected ${req.params.file}: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

// READ a file (Express handles Range requests for us)
app.get('/pieces/:cloud/:video/:file', (req, res) => {
  const filePath = getFilePath(req);
  if (!filePath) return res.status(400).json({ error: 'Invalid name' });

  res.sendFile(filePath, (error) => {
    if (error && !res.headersSent) res.status(404).json({ error: 'File not found' });
  });
});

// DELETE a file
app.delete('/pieces/:cloud/:video/:file', async (req, res) => {
  const filePath = getFilePath(req);
  if (!filePath) return res.status(400).json({ error: 'Invalid name' });

  try {
    await fs.promises.unlink(filePath);
    res.status(204).end();
  } catch {
    res.status(404).json({ error: 'File not found' });
  }
});

// Is this node alive?
app.get('/health', (req, res) => {
  res.json({ node: NODE_ID, status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Storage node ${NODE_ID} running on http://localhost:${PORT}`);
});