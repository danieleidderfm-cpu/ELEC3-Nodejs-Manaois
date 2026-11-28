// Name: Daniel Eidderf P. Manaois
// Section: IV-BSIT-A
// Activity: N2 - Modular Calculator
// Date: November 28, 2026

function formatResult(operation, a, b, result) {
    switch (operation) {
        case "add":
            return `${a} + ${b} = ${result}`;

        case "subtract":
            return `${a} - ${b} = ${result}`;

        case "multiply":
            return `${a} * ${b} = ${result}`;

        case "divide":
            return `${a} / ${b} = ${result}`;

        case "average":
            return `Average of ${a} and ${b} = ${result}`;
    }
}

// Export formatting function
module.exports = formatResult;