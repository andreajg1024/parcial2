import net from 'net';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.test' });

const url = new URL(process.env.DATABASE_URL);
const host = url.hostname || 'localhost';
const port = parseInt(url.port, 10) || 5432;

function waitFor(host, port, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    (function attempt() {
      const socket = net.createConnection(port, host);
      socket.on('connect', () => {
        socket.destroy();
        resolve();
      });
      socket.on('error', () => {
        socket.destroy();
        if (Date.now() - start > timeout) return reject(new Error('Timeout waiting for DB'));
        setTimeout(attempt, 500);
      });
    })();
  });
}

(async () => {
  console.log(`Waiting for DB at ${host}:${port} ...`);
  try {
    await waitFor(host, port, 60000);
    console.log('DB is ready');
    process.exit(0);
  } catch (err) {
    console.error('DB did not become ready:', err.message);
    process.exit(1);
  }
})();
