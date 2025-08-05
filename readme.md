# MEGA File Operations

A Node.js project for uploading, downloading, listing, and previewing files using the MEGA cloud storage service.

## Features

- **Upload files** to MEGA storage with organized folder structure
- **Download files** from MEGA using file tokens
- **List files** and get shareable links from MEGA storage
- **Preview PDF files** by downloading and parsing content
- **Class-based architecture** for better code organization

## Prerequisites

- Node.js (version 12 or higher)
- MEGA account with email and password
- npm or yarn package manager

## Installation

1. Clone or download this project
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
NODE_EMAIL=your-mega-email@example.com
NODE_PASSWORD=your-mega-password
```

## Project Structure

```
test-mega/
├── config.js          # MEGA storage configuration
├── upload.js          # File upload functionality
├── download.js        # File download functionality (class-based)
├── list.js            # List files and get links
├── preview.js         # PDF preview and parsing
├── package.json       # Project dependencies
└── .env               # Environment variables (create this)
```

## Usage

### Upload Files

Upload a file to MEGA storage:

```bash
node upload.js
```

- Modify the `filePath` variable in `upload.js` to specify the file to upload
- Files are uploaded to a "test" folder by default
- Returns a shareable MEGA link upon completion

### Download Files

Download files using MEGA tokens:

```bash
node download.js -t=YOUR_MEGA_TOKEN
# or
node download.js --token=YOUR_MEGA_TOKEN
```

Example:
```bash
node download.js -t=6V9HnAZK#hnnVrrivXt8nPf_dPcgVdOLz-PGTUTKcc2dXEsxYLPk
```

- Downloads files to your system's Downloads folder
- Displays file name and size before downloading
- Uses class-based `MegaDownloader` for better organization

### List Files

List files and get shareable links:

```bash
# List all files in root directory
node list.js root

# List files in "test" folder
node list.js test
```

### Preview PDF Files

Download and extract text from PDF files:

```bash
node preview.js -t=YOUR_MEGA_TOKEN
```

- Downloads PDF files and extracts readable text
- Useful for content preview without manual download

## Configuration

The project uses environment variables for MEGA authentication:

- `NODE_EMAIL`: Your MEGA account email
- `NODE_PASSWORD`: Your MEGA account password

Make sure to add your `.env` file to `.gitignore` to keep credentials secure.

## Dependencies

- **megajs**: MEGA cloud storage API client
- **pdf-parse**: PDF text extraction
- **dotenv**: Environment variable management
- **fs, path, os**: Node.js built-in modules

## Scripts

Available npm scripts:

```bash
npm run list    # Run the list command
```

## Error Handling

All operations include comprehensive error handling:
- File not found errors
- Authentication failures
- Network connectivity issues
- Invalid token errors

## Security Notes

- Never commit your `.env` file with real credentials
- Use environment variables for sensitive information
- Tokens in the code are examples only

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC License - see package.json for