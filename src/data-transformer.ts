// define the User interface as specified in the PDF assignment
interface User {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
  tags: string[];
}

// Interface representing any object that might be a User but needs validation
interface UnvalidatedUser {
  id: unknown;
  name: unknown;
  email: unknown;
  status: unknown;
  tags: unknown;
}

type ValidationError = {
  object: Partial<UnvalidatedUser>;
  reason: string;
};

// check if a value is a string
function isString(value: any): value is string {
  return typeof value === "string";
}

// check if a value is a number
function isNumber(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value);
}

// function to validate and filter tags
function validateTags(tags: unknown): string[] {
  if (!Array.isArray(tags)) {
    return [];
  }
  return tags.filter(isString);
}

// function to validate status
function isValidStatus(status: unknown): status is "active" | "inactive" {
  return status === "active" || status === "inactive";
}

// function to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Main function to process and validate user data
function processUserData(inputData: unknown[]): User[] {
  const validUsers: User[] = [];
  const validationErrors: ValidationError[] = [];

  if (!Array.isArray(inputData)) {
    console.error("Input is not an array");
    return [];
  }

  inputData.forEach((userData, index) => {
    try {
      if (
        !userData ||
        typeof userData !== "object" ||
        Array.isArray(userData)
      ) {
        validationErrors.push({
          object: userData as Partial<UnvalidatedUser>,
          reason: "Input is not an object",
        });
        return; // skip to next iteration
      }

      const user = userData as UnvalidatedUser;

      // extract and validate id
      if (!isNumber(user.id)) {
        validationErrors.push({
          object: user,
          reason: `Invalid or missing 'id' property: expected number, got ${typeof user.id}`,
        });
        return;
      }

      // extract and validate name
      if (!isString(user.name)) {
        validationErrors.push({
          object: user,
          reason: `Invalid or missing 'name' property: expected string, got ${typeof user.name}`,
        });
        return;
      }

      // extract and validate email
      if (!isString(user.email)) {
        validationErrors.push({
          object: user,
          reason: `Invalid or missing 'email' property: expected string, got ${typeof user.email}`,
        });
        return;
      }

      // email format validation
      if (!isValidEmail(user.email)) {
        validationErrors.push({
          object: user,
          reason: `Invalid email format: ${user.email}`,
        });
        return;
      }

      // extract and validate status
      if (!isValidStatus(user.status)) {
        validationErrors.push({
          object: user,
          reason: `Invalid or missing 'status' property: expected 'active' or 'inactive', got ${String(
            user.status
          )}`,
        });
        return;
      }

      // validate and filter tags
      const validatedTags = validateTags(user.tags);

      if (
        Array.isArray(user.tags) &&
        validatedTags.length !== user.tags.length
      ) {
        console.warn(
          `Object at index ${index} had invalid tags that were filtered out`
        );
      }

      // create validated user object
      const validUser: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status,
        tags: validatedTags,
      };

      validUsers.push(validUser);
    } catch (error) {
      // handle any unexpected errors during processing
      validationErrors.push({
        object: userData as Partial<UnvalidatedUser>,
        reason: `Unexpected error: ${
          error instanceof Error ? error.message : String(error)
        }`,
      });
    }
  });

  if (validationErrors.length > 0) {
    console.error("Validation errors:", validationErrors);
  }

  return validUsers;
}

export { processUserData, User, ValidationError };
