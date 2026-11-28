// Name: Daniel Eidderf P. Manaois
// Section: YOUR SECTION
// Activity: N2 - Modular Calculator
// Date: November 28, 2026

const operations = require("./operations");
const formatResult = require("./formatter");
const path = require("path");

// Read command-line arguments
const operation = process.argv[2];
const a = Number(process.argv[3]);
const b = Number(process.argv[4]);

console.log("=== MODULAR CALCULATOR ===");
console.log("Name: Daniel Eidderf P. Manaois");
console.log("Section: IV-BSIT-A");
console.log("--------------------------");

// Check user input
if (process.argv.length !== 5 ||
    !Number.isFinite(a) ||
    !Number.isFinite(b)) {

    console.log("Error: Enter an operation and two valid numbers.");
    console.log(`Usage: node ${path.basename(__filename)} add 12 8`);

} else if (!Object.hasOwn(operations, operation)) {

    console.log("Error: Unknown operation.");
    console.log("Available: add, subtract, multiply, divide, average");

} else {

    try {
        const result = operations[operation](a, b);

        console.log(formatResult(operation, a, b, result));

    } catch (error) {
        console.log("Error:", error.message);
    }
}