"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleData = void 0;
const data_transformer_1 = require("./data-transformer");
exports.sampleData = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        status: "active",
        tags: ["developer", "typescript", 123, null],
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        status: "inactive",
        tags: ["designer", "ui"],
    },
    {
        id: 3,
        name: "Bob Johnson",
        email: "bob@example.com",
        status: "active",
        tags: "not-an-array",
    },
    {
        id: 4,
        name: "Alice Brown",
        email: "alice@example.com",
        status: "pending",
        tags: ["manager"],
    },
    {
        name: "Charlie Green",
        email: "charlie@example.com",
        status: "active",
        tags: ["support"],
    },
];
// Process the data
const processedData = (0, data_transformer_1.processUserData)(exports.sampleData);
// Display results
console.log("Original data count:", exports.sampleData.length);
console.log("Processed data count:", processedData.length);
console.log("Processed data:", JSON.stringify(processedData, null, 2));
