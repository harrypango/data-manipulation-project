"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processUserData = processUserData;
// check if a value is a string
function isString(value) {
    return typeof value === "string";
}
// check if a value is a number
function isNumber(value) {
    return typeof value === "number" && !isNaN(value);
}
// function to validate and filter tags
function validateTags(tags) {
    if (!Array.isArray(tags)) {
        return [];
    }
    return tags.filter(isString);
}
// function to validate status
function isValidStatus(status) {
    return status === "active" || status === "inactive";
}
// function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
// Main function to process and validate user data
function processUserData(inputData) {
    const validUsers = [];
    const validationErrors = [];
    // check if inputData is an array
    if (!Array.isArray(inputData)) {
        console.error("Input is not an array");
        return [];
    }
    // process each object in the array
    inputData.forEach((userData, index) => {
        try {
            // check if userData is an object
            if (!userData || typeof userData !== "object") {
                validationErrors.push({
                    object: userData,
                    reason: "Input is not an object",
                });
                return; // skip to next iteration
            }
            // extract and validate id
            if (!isNumber(userData.id)) {
                validationErrors.push({
                    object: userData,
                    reason: `Invalid or missing 'id' property: expected number, got ${typeof userData.id}`,
                });
                return;
            }
            // extract and validate name
            if (!isString(userData.name)) {
                validationErrors.push({
                    object: userData,
                    reason: `Invalid or missing 'name' property: expected string, got ${typeof userData.name}`,
                });
                return;
            }
            // extract and validate email
            if (!isString(userData.email)) {
                validationErrors.push({
                    object: userData,
                    reason: `Invalid or missing 'email' property: expected string, got ${typeof userData.email}`,
                });
                return;
            }
            // email format validation
            if (!isValidEmail(userData.email)) {
                validationErrors.push({
                    object: userData,
                    reason: `Invalid email format: ${userData.email}`,
                });
                return;
            }
            // extract and validate status
            if (!isValidStatus(userData.status)) {
                validationErrors.push({
                    object: userData,
                    reason: `Invalid or missing 'status' property: expected 'active' or 'inactive', got ${userData.status}`,
                });
                return;
            }
            // validate and filter tags
            const validatedTags = validateTags(userData.tags);
            // if original tags array contained non-string values, log a warning but dont reject the object
            if (Array.isArray(userData.tags) &&
                validatedTags.length !== userData.tags.length) {
                console.warn(`Object at index ${index} had invalid tags that were filtered out`);
            }
            // create validated user object
            const validUser = {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                status: userData.status,
                tags: validatedTags,
            };
            validUsers.push(validUser);
        }
        catch (error) {
            // handle any unexpected errors during processing
            validationErrors.push({
                object: userData,
                reason: `Unexpected error: ${error instanceof Error ? error.message : String(error)}`,
            });
        }
    });
    if (validationErrors.length > 0) {
        console.error("Validation errors:", validationErrors);
    }
    return validUsers;
}
