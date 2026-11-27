import mongoose from 'mongoose';

export async function connectDb() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('Connected to MongoDB');
}

// One account = one customer (e.g. Aman's company)
const accountSchema = new mongoose.Schema({
  cloudName: { type: String, required: true, unique: true }, // permanent, appears in URLs
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  tokenVersion: { type: Number, default: 0 },                 // +1 = log out everywhere
}, { timestamps: true });

// One account can have MANY api keys, each with its own role
const apiKeySchema = new mongoose.Schema({
  apiKey: { type: String, required: true, unique: true },     // public: "which credential"
  secretEncrypted: { type: String, required: true },          // proof, stored encrypted
  cloudName: { type: String, required: true },                // which account it belongs to
  role: { type: String, enum: ['admin', 'upload', 'read'], required: true },
  status: { type: String, enum: ['active', 'revoked'], default: 'active' },
  lastUsedAt: Date,
}, { timestamps: true });

export const Account = mongoose.model('Account', accountSchema);
export const ApiKey = mongoose.model('ApiKey', apiKeySchema);