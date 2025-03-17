# TypeScript Data Transformation and Validation

This is a small project that deals with data manipulation (transformation & validation) of a JSON object that contains an array of complex objects.
Comments have been added throughout the files to make it easier to understand where to edit sample/test case scenarios. You can play around with the `sample-data.ts` file and edit the `sampleData` array of objects to test different scenarios of invalid properties.

## Features

- Validation and filtering of user data
- Detailed error handling and logging for invalid data
- Unit tests covering various scenarios
- Email format validation
- Filtering of non-string values from the tags arrrays

## Project Structure

- `data-transformer.ts`: The main module containing the data processing logic
- `data-transformer.test.ts`: Unit tests for the data processor
- `sample-data.ts`: Example usage of the data processor

## Installation & Testing

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the tests:
   ```
   npm test
   ```
   ```
   npm run build
   ```
   ```
   npm node dist/sample-data.js
   ```

## Usage

```typescript
import { processUserData } from "./data-transformer";

// input data array
const inputData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    tags: ["developer", "typescript"],
  },
  // add more user objects here
];

// process and validate the data
const validUsers = processUserData(inputData);

// use the validated data
console.log(validUsers);
```

## Validation Rules

The processor validates user objects according to the following rules:

1. `id` must be a number
2. `name` must be a string
3. `email` must be a string in valid email format
4. `status` must be either 'active' or 'inactive'
5. `tags` must be an array, and only string values are retained

Objects failing validation are removed from the result set and detailed error messages are logged.
