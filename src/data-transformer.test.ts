import { processUserData, User } from "./data-transformer";

// sample test data
const validUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    tags: ["developer", "typescript"],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    status: "inactive",
    tags: ["designer", "ui"],
  },
];

const mixedUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    tags: ["developer", "typescript", 123, null, undefined], // some invalid tags
  },
  {
    id: "2", // invalid id
    name: "Jane Smith",
    email: "jane@example.com",
    status: "inactive",
    tags: ["designer", "ui"],
  },
  {
    id: 3,
    name: null, // invalid name
    email: "bob@example.com",
    status: "active",
    tags: [],
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    status: "pending", // invalid status
    tags: ["manager"],
  },
  {
    id: 5,
    name: "Charlie Green",
    email: "not-an-email", // invalid email format
    status: "active",
    tags: ["support"],
  },
  {}, // missing all required fields
];

describe("processUserData", () => {
  // test 1 - valid data processing
  test("should process valid user data correctly", () => {
    const result = processUserData(validUsers);
    expect(result).toHaveLength(2);
    expect(result).toEqual(validUsers);
  });

  // test 2 - empty array handling
  test("should return empty array when input is empty", () => {
    const result = processUserData([]);
    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  // test 3 - filtering invalid objects
  test("should filter out invalid objects", () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();

    const result = processUserData(mixedUsers);
    expect(result).toHaveLength(1);

    // the valid user should be the first one with invalid tags filtered out
    expect(result[0].id).toBe(1);
    expect(result[0].tags).toEqual(["developer", "typescript"]);

    expect(consoleWarnSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  // test 4 - non-array input handling
  test("should handle non-array input", () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    // @ts-ignore - testing incorrect input type
    const result = processUserData("not an array");

    expect(result).toHaveLength(0);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Input is not an array");

    consoleErrorSpy.mockRestore();
  });

  // test 4 - null and undefined handling
  test("should handle null and undefined input", () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    // @ts-ignore - testing null input
    const result1 = processUserData(null);
    expect(result1).toHaveLength(0);

    // @ts-ignore - testing undefined input
    const result2 = processUserData(undefined);
    expect(result2).toHaveLength(0);
    consoleErrorSpy.mockRestore();
  });
});
