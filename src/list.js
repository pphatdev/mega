import { storage } from "./config.js";

async function listFilesWithLinks(folder, prefix = '') {
    for (const item of folder.children) {
        const path = `${prefix}${item.name}`;
        if (item.directory) {
            await listFilesWithLinks(item, `${path}/`);
        } else {
            // Get the full public link for the file
            const link = await item.link();
            console.log(`${path}: ${link}`);
        }
    }
}

if (process.argv.slice(2).length === 0) {
    console.log('Usage: node list.js <root|test>');
    // await listFilesWithLinks(storage.root);
    process.exit(1);
}


process.argv.slice(2).forEach(async (arg) => {
    if (arg === 'root') {
        await listFilesWithLinks(storage.root);
        process.exit(0);
    }
    else if (arg === 'test') {
        const testFolder = storage.root.children.find(item => item.name === 'test' && item.directory);
        if (testFolder) {
            await listFilesWithLinks(testFolder);
            process.exit(0);
        } else {
            console.log('Folder "test" not found in the root directory');
        }
    } else {
        console.log(`Unknown argument: ${arg}`);
        process.exit(1);
    }
});
