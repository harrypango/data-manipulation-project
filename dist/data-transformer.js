"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processUserData = processUserData;
// Custom type guard to check if a value is a string
function isString(value) {
    return typeof value === "string";
}
// Custom type guard to check if a value is a number
function isNumber(value) {
    return typeof value === "number" && !isNaN(value);
}
// Function to validate and filter tags
function validateTags(tags) {
    // If tags is not an array, return an empty array
    if (!Array.isArray(tags)) {
        return [];
    }
    // Filter out non-string values
    return tags.filter(isString);
}
// Function to validate status
function isValidStatus(status) {
    return status === "active" || status === "inactive";
}
// Function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
// Main function to process and validate user data
function processUserData(inputData) {
    const validUsers = [];
    const validationErrors = [];
    // Check if inputData is an array
    if (!Array.isArray(inputData)) {
        console.error("Input is not an array");
        return [];
    }
    // Process each object in the array
    inputData.forEach((userData, index) => {
        try {
            // Check if userData is an object
            if (!userData || typeof userData !== "object") {
                validationErrors.push({
                    object: userData,
                    reason: "Input is not an object",
                });
                return; // Skip to next iteration
            }
            // Extract and validate id
            if (!isNumber(userData.id)) {
                validationErrors.push({
                    object: userData,
                    reason: `Invalid or missing 'id' property: expected number, got ${typeof userData.id}`,
                });
                return; // Skip to next iteration
            }
            // Extract and validate name
            if (!isString(userData.name)) {
                validationErrors.push({
                    object: userData,
                    reason: `Invalid or missing 'name' property: expected string, got ${typeof userData.name}`,
                });
                return; // Skip to next iteration
            }
            // Extract and validate email
            if (!isString(userData.email)) {
                validationErrors.push({
                    object: userData,
                    reason: `Invalid or missing 'email' property: expected string, got ${typeof userData.email}`,
                });
                return; // Skip to next iteration
            }
            // Additional email format validation
            if (!isValidEmail(userData.email)) {
                validationErrors.push({
                    object: userData,
                    reason: `Invalid email format: ${userData.email}`,
                });
                return; // Skip to next iteration
            }
            // Extract and validate status
            if (!isValidStatus(userData.status)) {
                validationErrors.push({
                    object: userData,
                    reason: `Invalid or missing 'status' property: expected 'active' or 'inactive', got ${userData.status}`,
                });
                return; // Skip to next iteration
            }
            // Validate and filter tags
            const validatedTags = validateTags(userData.tags);
            // If original tags array contained non-string values, log a warning but don't reject the object
            if (Array.isArray(userData.tags) &&
                validatedTags.length !== userData.tags.length) {
                console.warn(`Object at index ${index} had invalid tags that were filtered out`);
            }
            // Create validated user object
            const validUser = {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                status: userData.status,
                tags: validatedTags,
            };
            // Add to valid users array
            validUsers.push(validUser);
        }
        catch (error) {
            // Handle any unexpected errors during processing
            validationErrors.push({
                object: userData,
                reason: `Unexpected error: ${error instanceof Error ? error.message : String(error)}`,
            });
        }
    });
    // Log all validation errors
    if (validationErrors.length > 0) {
        console.error("Validation errors:", validationErrors);
    }
    return validUsers;
}
