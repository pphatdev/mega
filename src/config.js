import { Storage } from 'megajs';
import { config } from 'dotenv';
config();

class MegaConfig {
    constructor() {
        this.email = process.env.NODE_EMAIL || 'xxxxx@gmail.com';
        this.password = process.env.NODE_PASSWORD || 'hgasseee@@@ed';
        this.storage = null;
    }

    async initialize() {
        if (!this.storage) {
            this.storage = new Storage({
                email: this.email,
                password: this.password
            });
            await this.storage.ready;
        }
        return this.storage;
    }

    getStorage() {
        if (!this.storage) {
            throw new Error('Storage not initialized. Call initialize() first.');
        }
        return this.storage;
    }
}

const megaConfig = new MegaConfig();
export { megaConfig, MegaConfig };