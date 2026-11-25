// Tests for the storage node. Works the same on Windows, macOS and Linux.
// Run it while the storage node is running:   node test.js
import fs from 'node:fs';
import http from 'node:http';
import crypto from 'node:crypto';

const BASE = 'http://localhost:7001';
const URL_PATH = '/pieces/aman-app/vid_1';

// Helper: fingerprint of some bytes
const sha256 = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');

// Helper: print PASS or FAIL
function check(name, ok, details = '') {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}  ${details}`);
}

// 0. Create a 50 MB test file (only the first time)
if (!fs.existsSync('test.bin')) {
  fs.writeFileSync('test.bin', crypto.randomBytes(50 * 1024 * 1024));
  console.log('Created test.bin (50 MB)');
}
const original = fs.readFileSync('test.bin');
const originalHash = sha256(original);

// 1. Health
let res = await fetch(`${BASE}/health`);
check('1. Health check', res.status === 200, JSON.stringify(await res.json()));

// 2. Upload with the correct fingerprint
res = await fetch(`${BASE}${URL_PATH}/chunk_1`, {
  method: 'PUT',
  body: original,
  headers: { 'X-Checksum-SHA256': originalHash },
});
check('2. Upload with correct checksum', res.status === 201, `status ${res.status}`);

// 3. Upload with a wrong fingerprint
res = await fetch(`${BASE}${URL_PATH}/chunk_2`, {
  method: 'PUT',
  body: original,
  headers: { 'X-Checksum-SHA256': 'wrong' },
});
check('3. Wrong checksum is rejected', res.status === 400, `status ${res.status}`);
res = await fetch(`${BASE}${URL_PATH}/chunk_2`);
check('   ...and chunk_2 was not saved', res.status === 404, `status ${res.status}`);

// 4. Download it back and compare fingerprints
res = await fetch(`${BASE}${URL_PATH}/chunk_1`);
const downloaded = Buffer.from(await res.arrayBuffer());
check('4. Downloaded file is identical', sha256(downloaded) === originalHash,
  `${downloaded.length} bytes`);

// 5. Range read: first 100 bytes
res = await fetch(`${BASE}${URL_PATH}/chunk_1`, { headers: { Range: 'bytes=0-99' } });
const part = Buffer.from(await res.arrayBuffer());
check('5. Range read returns 100 bytes', res.status === 206 && part.equals(original.subarray(0, 100)),
  `status ${res.status}, ${part.length} bytes`);

// 6. Dangerous name
res = await fetch(`${BASE}${URL_PATH}/..%2F..%2Fsecret`);
check('6. Dangerous name is blocked', res.status === 400, `status ${res.status}`);

// 7. Interrupted upload: send only 5 MB of a "50 MB" upload, then cut the connection
await new Promise((resolve) => {
  const req = http.request(`${BASE}${URL_PATH}/chunk_3`, {
    method: 'PUT',
    headers: { 'Content-Length': original.length },
  });
  req.on('error', () => resolve());          // expected: we cut it ourselves
  req.write(original.subarray(0, 5 * 1024 * 1024));
  setTimeout(() => { req.destroy(); resolve(); }, 500);
});
await new Promise((r) => setTimeout(r, 300));  // give the server a moment to clean up
res = await fetch(`${BASE}${URL_PATH}/chunk_3`);
check('7. Interrupted upload left no file', res.status === 404, `status ${res.status}`);
console.log('      (also look in data/A1/tmp: it should be empty)');