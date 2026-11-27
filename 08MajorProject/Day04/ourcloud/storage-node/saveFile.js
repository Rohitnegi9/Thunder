import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { pipeline } from 'node:stream/promises';

// Saves the uploaded bytes safely:
//   1. write to a temporary file
//   2. check the size
//   3. check the fingerprint (SHA-256)
//   4. force it onto the disk (fsync)
//   5. move it to its final name (rename)
export async function saveFile(req, finalPath, tmpFolder) {
  // 1. A random temporary name, so two uploads never share a temp file
  const tmpPath = path.join(tmpFolder, crypto.randomUUID());

  // While bytes flow to the disk, we also count them and fingerprint them
  const hash = crypto.createHash('sha256');
  let receivedBytes = 0;
  req.on('data', (chunk) => {
    hash.update(chunk);
    receivedBytes += chunk.length;
  });

  try {
    // Stream the request into the temp file (waits until all bytes are written)
    await pipeline(req, fs.createWriteStream(tmpPath));

    // 2. Did every byte arrive?
    const expectedBytes = Number(req.headers['content-length']);
    if (receivedBytes !== expectedBytes) {
      throw new Error(`Size mismatch: expected ${expectedBytes} bytes, got ${receivedBytes}`);
    }

    // 3. Are they exactly the bytes that were sent?
    const sha256 = hash.digest('hex');
    const expectedSha256 = req.headers['x-checksum-sha256'];
    if (expectedSha256 && expectedSha256 !== sha256) {
      throw new Error('Checksum mismatch: the data was damaged on the way');
    }

    // 4. Force the bytes onto the physical disk
    const file = await fs.promises.open(tmpPath, 'r+');
    await file.sync();
    await file.close();

    // 5. Move it to its final name (instant, all-or-nothing)
    await fs.promises.mkdir(path.dirname(finalPath), { recursive: true });
    await fs.promises.rename(tmpPath, finalPath);

    return { size: receivedBytes, sha256 };
  } catch (error) {
    // Anything went wrong (interrupted, wrong size, wrong checksum):
    // delete the temp file, so broken data never stays on disk
    await fs.promises.rm(tmpPath, { force: true });
    throw error;
  }
}