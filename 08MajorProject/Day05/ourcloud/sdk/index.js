import crypto from 'node:crypto';

// The SAME function is used by Aman's server (to sign) and by our Gateway (to check).
// If both sides build the text differently by even one character, the signatures won't match.
export function createSignature(params, apiSecret) {
  // 1. Put the fields in a fixed order (alphabetical), e.g.
  //    action=upload&api_key=ak_..&cloud=aman-app&expires=1764160000&max_bytes=5242880&public_id=vid_..
  const textToSign = Object.keys(params)
    .sort()
    .map((name) => `${name}=${params[name]}`)
    .join('&');

  // 2. Fingerprint that text with the secret (HMAC)
  return crypto.createHmac('sha256', apiSecret).update(textToSign).digest('hex');
}

// Creates a signed upload URL. Runs on Aman's server: NO network call to our platform.
export function createUploadUrl({ gatewayUrl, cloudName, apiKey, apiSecret, publicId, maxBytes, expiresInSeconds = 3600 }) {
  const params = {
    cloud: cloudName,
    public_id: publicId,
    api_key: apiKey,
    max_bytes: String(maxBytes),
    expires: String(Math.floor(Date.now() / 1000) + expiresInSeconds), // unix time, in seconds
  };

  // "action=upload" is signed too, so this signature can never be used for anything else
  const signature = createSignature({ action: 'upload', ...params }, apiSecret);

  const query = new URLSearchParams({ ...params, signature });
  return `${gatewayUrl}/signed-upload?${query}`;
}

// A unique name for each new video, e.g. "vid_3f9a1c2b7d4e"
export function newPublicId(prefix = 'vid') {
  return `${prefix}_${crypto.randomBytes(6).toString('hex')}`;
}