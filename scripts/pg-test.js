import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config({ path: '.env' });

const client = new Client({ connectionString: process.env.DATABASE_URL });

client.connect()
  .then(() => console.log('pg connected'))
  .catch((e) => console.error('pg error', e.message || e))
  .finally(() => client.end());
