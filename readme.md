# MEGA File Manager

A Node.js application for managing files on MEGA cloud storage. Upload, download, and list files with simple command-line interface.

## Features

- **Upload files** to MEGA cloud storage
- **Download files** from MEGA using file tokens
- **List files** and get public links from your MEGA storage
- **Directory management** - organize files in folders

## Setup

### Prerequisites

- Node.js (version 14 or higher)
- A MEGA account

### Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install megajs dotenv
   ```

3. Create a `.env` file in the project root:
   ```env
   NODE_EMAIL=your-mega-email@example.com
   NODE_PASSWORD=your-mega-password
   ```

## Usage

### Upload Files

Upload a file to your MEGA storage:

```bash
# Upload to root directory
node src/upload.js -f="C:/path/to/your/file.pdf"

# Upload to specific directory
node src/upload.js -f="C:/path/to/your/file.pdf" -d="test"
```

**Parameters:**
- `-f` or `--file`: Path to the file you want to upload
- `-d` or `--directory`: Target directory (defaults to "root")

### Download Files

Download a file using its MEGA token:

```bash
node src/download.js -t="6V9HnAZK#hnnVrrivXt8nPf_dPcgVdOLz-PGTUTKcc2dXEsxYLPk"
```

**Parameters:**
- `-t` or `--token`: MEGA file token (the part after `/file/` in MEGA links)

Downloaded files are saved to your system's Downloads folder.

### List Files

List all files in your MEGA storage and get their public links:

```bash
# List all files in root directory
node src/list.js root

# List files in "test" directory
node src/list.js test
```

## Project Structure

```
test-mega/
├── src/
│   ├── config.js      # MEGA configuration and authentication
│   ├── upload.js      # File upload functionality
│   ├── download.js    # File download functionality
│   └── list.js        # List files and generate links
├── .env               # Environment variables (create this)
└── README.md          # This file
```

## Configuration

The application uses environment variables for MEGA credentials:

- `NODE_EMAIL`: Your MEGA account email
- `NODE_PASSWORD`: Your MEGA account password

If not set in `.env`, it falls back to hardcoded values in `config.js` (not recommended for production).

## Examples

### Complete Workflow Example

1. **Upload a file:**
   ```bash
   node src/upload.js -f="C:/Users/john/Documents/report.pdf" -d="work"
   ```

2. **List files to get the link:**
   ```bash
   node src/list.js work
   ```

3. **Download using token from another machine:**
   ```bash
   node src/download.js -t="AbC123XyZ#randomHashKey"
   ```

## Error Handling

The application includes error handling for:
- Invalid file paths
- Network connectivity issues
- Authentication failures
- Missing arguments

## Security Notes

- Keep your `.env` file secure and never commit it to version control
- MEGA tokens in public links allow anyone to download the file
- Consider using private sharing for sensitive files

## Dependencies

- `megajs`: MEGA cloud storage API client
- `dotenv`: Environment variable management
- Built-in Node.js modules: `fs`, `path`, `os`