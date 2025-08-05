import { File } from 'megajs';
import fs from 'fs';
import path from 'path';
import os from 'os';

class MegaDownloader {
    constructor() {
        this.downloadsPath = path.join(os.homedir(), 'Downloads');
    }

    async downloadFile(token) {
        try {
            console.log('\x1b[33m\nDownloading file from MEGA...\x1b[0m');

            const url = new URL(`/file/${token}`, "https://mega.nz/");
            const file = File.fromURL(url.href);

            // if the file is not found, throw an error
            if (!file) {
                throw new Error('File not found');
            }

            await file.loadAttributes();

            console.log(`File name: \x1b[32m${file.name}\x1b[0m`);
            console.log(`File size: \x1b[32m${file.size} bytes\x1b[0m`);

            const originalName = file.name || 'downloaded.pdf';
            const fullPath = path.join(this.downloadsPath, originalName);

            const dataBuffer = await file.downloadBuffer();
            fs.writeFileSync(fullPath, dataBuffer);

            console.log(`\x1b[32mFile downloaded successfully to: ${fullPath}\x1b[0m`);
            return fullPath;
        } catch (error) {
            console.error('Error downloading file:', error);
            throw error;
        }
    }
}

// 6V9HnAZK#hnnVrrivXt8nPf_dPcgVdOLz-PGTUTKcc2dXEsxYLPk
let token = null;

process.argv.slice(2).forEach(arg => {
    if (arg.startsWith('--token=') || arg.startsWith('-t=')) {
        token = arg.split('=')[1];
    }
    else {
        console.error(`Unknown argument: ${arg}`);
        process.exit(1);
    }
});

if (!token) {
    console.error('No token provided');
    process.exit(1);
}

const downloader = new MegaDownloader();
downloader.downloadFile(token);