import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a unique API key using UUID v4.
 *
 * This function generates a universally unique identifier (UUID) using the
 * `uuidv4` method from the `uuid` package and returns it as a string. The
 * generated UUID can be used as an API key for clients or other entities
 * requiring unique identifiers.
 *
 * @returns {string} - A unique API key as a string.
 */
export function generateApiKey(): string {
  return uuidv4();
}
