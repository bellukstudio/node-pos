import * as bcrypt from "bcrypt"

const SALT_ROUND = +(process.env.SALT_ROUNDS || 10)

/**
 * Hash a given plaintext password using bcrypt
 * @param plaintext The plaintext password to hash
 * @returns A promise that resolves to the hashed password
 */
export async function hashPassword(plaintext: string) {
    return bcrypt.hash(plaintext, SALT_ROUND)
}


/**
 * Verify a given password against an encrypted password.
 * @param password The password to verify
 * @param encrypted The encrypted password to compare against
 * @returns A boolean indicating whether the password matches
 */
export async function verifyPassword(password: string, encrypted: string) {
    return bcrypt.compare(password, encrypted)
}