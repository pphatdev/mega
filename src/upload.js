import fs from 'fs';
import { megaConfig } from "./config.js";

const uploadFile = async ({
    directory = "root",
    filePath
}) => {

    if (!filePath) {
        console.error('No file path provided');
        process.exit(1);
    }

    // Initialize storage
    const storage = await megaConfig.initialize();

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

// C:/Users/front-end.01/Downloads/PDF_05082025_042543.pdf
let filePath = null;
let directory = "root";


process.argv.slice(2).forEach(arg => {
    if (arg.startsWith('--directory=') || arg.startsWith('-d=')) {
        directory = arg.split('=')[1];
    } else if (arg.startsWith('--file=') || arg.startsWith('-f=')) {
        filePath = arg.split('=')[1];
    } else {
        console.error(`Unknown argument: ${arg}`);
        process.exit(1);
    }
});


if (!filePath) {
    console.error('Usage: node upload.js -f=<file_path> [-d=<directory>]');
    console.error('Example: node upload.js -f="C:/path/to/file.pdf" -d="test"');
    process.exit(1);
}

uploadFile({ directory, filePath });