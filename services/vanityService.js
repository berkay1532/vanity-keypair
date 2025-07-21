import { Worker } from 'worker_threads';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function handleKeypairGeneration({ prefix, suffix }) {
    return new Promise((resolve, reject) => {
      const mode = prefix ? 'prefix' : 'suffix';
      const pattern = prefix || suffix;
  
      const worker = new Worker(path.join(__dirname, '../workers/vanityWorker.js'), {
        workerData: { mode, pattern }
      });
  
      worker.on('message', (data) => {
        saveKeypairToFile(data.secretKey);  // 🔥 Buraya ekliyoruz
        resolve(data);
      });
  
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) reject(new Error(`Worker exited with code ${code}`));
      });
    });
}
  

function saveKeypairToFile(secretKey) {
    const dir = path.join(__dirname, '../keypairs');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `vanity-${timestamp}.json`;
    const filepath = path.join(dir, filename);
  
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  
    fs.writeFileSync(filepath, JSON.stringify(secretKey, null, 2));
    console.log(`💾 Keypair kaydedildi: ${filename}`);
  }
  