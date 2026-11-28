// Name: Daniel Eidderf P. Manaois
// Section: IV-BSIT-A
// Activity: N3 - File Manager with fs and path
// Date: November 28, 2026

const fs = require("fs");
const path = require("path");

// Storage folder
const filesDir = path.join(__dirname, "files");

if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir);
}

// Read command-line arguments
const command = process.argv[2];
const fileName = process.argv[3];
const content = process.argv.slice(4).join(" ");

// Construct and validate the file path
function getFilePath(name) {
    if (!name ||
        name !== path.basename(name) ||
        path.extname(name) !== ".txt") {
        throw new Error("Please enter a valid .txt filename.");
    }

    return path.join(filesDir, name);
}

// Create a new file
function createFile() {
    fs.writeFileSync(getFilePath(fileName), content, {
        flag: "wx"
    });

    console.log("Successfully created:", fileName);
}

// Read file contents
function readFile() {
    const data = fs.readFileSync(
        getFilePath(fileName), "utf8"
    );

    console.log(`--- Contents of ${fileName} ---`);
    console.log(data);
}

// Append new content
function updateFile() {
    const filePath = getFilePath(fileName);

    if (!fs.existsSync(filePath)) {
        throw new Error("File not found.");
    }

    fs.appendFileSync(filePath, "\n" + content);

    console.log("Successfully updated:", fileName);
}

// Delete a file
function deleteFile() {
    fs.unlinkSync(getFilePath(fileName));

    console.log("Successfully deleted:", fileName);
}

// Display all text files
function listFiles() {
    const files = fs.readdirSync(filesDir, {
        withFileTypes: true
    }).filter(file =>
        file.isFile() && path.extname(file.name) === ".txt"
    );

    console.log("--- FILES IN STORAGE ---");

    for (const file of files) {
        const fullPath = path.join(filesDir, file.name);
        const name = path.basename(fullPath);
        const extension = path.extname(fullPath);
        const data = fs.readFileSync(fullPath, "utf8");

        console.log("Full Path:", fullPath);
        console.log(`File Name: ${name} | Extension: ${extension}`);
        console.log("Contents:", data);
        console.log("------------------------------------------");
    }

    console.log("Total files:", files.length);
}

// Execute the selected command
try {
    switch (command) {
        case "create":
            createFile();
            break;

        case "read":
            readFile();
            break;

        case "update":
            updateFile();
            break;

        case "delete":
            deleteFile();
            break;

        case "list":
            listFiles();
            break;

        default:
            console.log("=== FILE MANAGER ===");
            console.log("Available commands:");
            console.log("node index.js create <file.txt> <text>");
            console.log("node index.js read <file.txt>");
            console.log("node index.js update <file.txt> <text>");
            console.log("node index.js delete <file.txt>");
            console.log("node index.js list");
    }

} catch (error) {
    if (error.code === "ENOENT") {
        console.log("Error: File not found.");

    } else if (error.code === "EEXIST") {
        console.log("Error: File already exists.");

    } else {
        console.log("Error:", error.message);
    }
}