import { Storage } from 'megajs';
import { config } from 'dotenv';
config();

const email = process.env.NODE_EMAIL || 'xxxxx@gmail.com';
const password = process.env.NODE_PASSWORD || 'hgasseee@@@ed';

const storage = new Storage({ email, password });
await storage.ready;

export { storage };