// Run with MongoDB, storage node and gateway running:   node test.js
import crypto from 'node:crypto';

const GATEWAY = 'http://localhost:3000';
const check = (name, ok, details = '') => console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}  ${details}`);
const sha256 = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');

// ---------- Small helpers ----------
const post = (path, body, token) => fetch(`${GATEWAY}${path}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }) },
  body: JSON.stringify(body ?? {}),
});

const get = (path, token) => fetch(`${GATEWAY}${path}`, {
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});

const keyHeaders = (key) => (key ? { 'X-Api-Key': key.apiKey, 'X-Api-Secret': key.apiSecret } : {});

const upload = (cloud, file, key) => fetch(`${GATEWAY}/upload/${cloud}/vid_1/${file}`, {
  method: 'PUT',
  body: Buffer.from('hello lecture'),
  headers: keyHeaders(key),
});

// A new cloud name every run, so the test can be repeated
const cloud = 'test-' + crypto.randomBytes(3).toString('hex');
const email = `${cloud}@example.com`;
const password = 'password123';

// ---------- People: signup and login ----------
let res = await post('/accounts/signup', { email, password, cloudName: cloud });
check('1. Sign up returns a login token', res.status === 201 && !!(await res.json()).token, cloud);

res = await post('/accounts/login', { email, password: 'wrong-password' });
check('2. Wrong password → 401', res.status === 401, `status ${res.status}`);

res = await post('/accounts/login', { email, password });
const login = await res.json();
check('3. Login works', res.status === 200 && !!login.token, `expires ${login.expiresAt}`);
const token = login.token;

res = await get('/accounts/me', token);
check('4. /me with token', res.status === 200, JSON.stringify(await res.json()));

res = await get('/accounts/me');
check('5. /me without token → 401', res.status === 401, `status ${res.status}`);

res = await get('/accounts/me', token.slice(0, -3) + 'abc');
check('6. Edited token → 401', res.status === 401, `status ${res.status}`);

// ---------- Keys: created by a logged-in person ----------
res = await post('/keys', { role: 'upload' });
check('7. Create key without login → 401', res.status === 401, `status ${res.status}`);

const admin = await (await post('/keys', { role: 'admin' }, token)).json();
const uploader = await (await post('/keys', { role: 'upload' }, token)).json();
const reader = await (await post('/keys', { role: 'read' }, token)).json();
check('8. Created admin, upload and read keys', !!admin.apiKey && !!uploader.apiKey && !!reader.apiKey);

// ---------- Servers: uploads and downloads with API keys ----------
res = await upload(cloud, 'chunk_1');
check('9. Upload without key → 401', res.status === 401, `status ${res.status}`);

res = await upload(cloud, 'chunk_1', { apiKey: admin.apiKey, apiSecret: 'sk_wrong' });
check('10. Wrong secret → 401', res.status === 401, `status ${res.status}`);

res = await upload('some-other-company', 'chunk_1', admin);
check('11. Other company\'s cloud → 403', res.status === 403, `status ${res.status}`);

res = await upload(cloud, 'chunk_1', reader);
check('12. Read key cannot upload → 403', res.status === 403, `status ${res.status}`);

res = await upload(cloud, 'chunk_1', uploader);
check('13. Upload key can upload', res.status === 201, `status ${res.status}`);

res = await fetch(`${GATEWAY}/videos/${cloud}/vid_1/chunk_1`, { headers: keyHeaders(reader) });
const back = Buffer.from(await res.arrayBuffer());
check('14. Read key can download, bytes identical',
  res.status === 200 && sha256(back) === sha256(Buffer.from('hello lecture')));

// ---------- Revoking and logging out ----------
await fetch(`${GATEWAY}/keys/${uploader.apiKey}`, {
  method: 'DELETE',
  headers: { Authorization: `Bearer ${token}` },
});
res = await upload(cloud, 'chunk_2', uploader);
check('15. Revoked key → 401', res.status === 401, `status ${res.status}`);

res = await get('/keys', token);
const keys = await res.json();
check('16. Key list never shows secrets', keys.every((k) => !('secretEncrypted' in k) && !('apiSecret' in k)),
  keys.map((k) => `${k.role}:${k.status}`).join(', '));

res = await post('/accounts/logout-all', {}, token);
res = await get('/accounts/me', token);
check('17. Old login token rejected after logout-all', res.status === 401, (await res.json()).error);

res = await upload(cloud, 'chunk_3', admin);
check('18. API keys still work after logout (they are not logins)', res.status === 201, `status ${res.status}`);