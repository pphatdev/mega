const filePath = "C:/Users/front-end.01/Downloads/PDF_05082025_042543.pdf";
import fs from 'fs';
import { storage } from "./config.js";

const uploadFile = async (directory = "root") => {
    // Get file size
    const fileStats = fs.statSync(filePath);
    const fileSize = fileStats.size;
    const fileName = filePath.split('/').pop();

    // Find or create the "test" folder
    let targetFolder;
    if (directory === "root") {
        targetFolder = storage.root;
    } else {
        targetFolder = storage.root.children.find(item => item.name === directory && item.directory);
    }
    if (!targetFolder) {
        targetFolder = await storage.mkdir(directory);
    }

    const uploadStream = targetFolder.upload({
        name: fileName,
        size: fileSize
    });
    fs.createReadStream(filePath).pipe(uploadStream);

    uploadStream.on('complete', file => {
        console.log('Upload complete!');
        file.link().then(link => {
            console.log('MEGA link:', link);
        });

        process.exit(0);
    });

    uploadStream.on('error', err => {
        console.error('Upload error:', err);
        process.exit(1);
    });
};

uploadFile();
