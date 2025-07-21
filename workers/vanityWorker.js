import { parentPort, workerData } from 'worker_threads';
import { Keypair } from '@solana/web3.js';

function matches(publicKey, pattern, mode) {
  const pk = publicKey.toLowerCase();
  const pat = pattern.toLowerCase();

  return mode === 'prefix'
    ? pk.startsWith(pat)
    : pk.endsWith(pat);
}

while (true) {
  const keypair = Keypair.generate();
  const pubKey = keypair.publicKey.toBase58();

  if (matches(pubKey, workerData.pattern, workerData.mode)) {
    parentPort.postMessage({
      publicKey: pubKey,
      secretKey: Array.from(keypair.secretKey)
    });
    break;
  }
}
