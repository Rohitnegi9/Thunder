import express from 'express';
import { connectDb } from './db.js';
import { accountsRouter } from './routes/accounts.js';
import { filesRouter } from './routes/files.js';
import { signedUploadRouter } from './routes/signedUpload.js';

await connectDb();

const app = express();

// Upload routers FIRST: uploads must arrive as a raw stream,
// before any JSON body parser (in accountsRouter) could touch them.
app.use(filesRouter);
app.use(signedUploadRouter);
app.use(accountsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Gateway running on http://localhost:${process.env.PORT}`);
});