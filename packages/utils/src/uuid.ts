import { customAlphabet } from "nanoid/non-secure"

export const alphabet = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

export const createNanoId = (size = 8) => customAlphabet(alphabet, size)

export const nanoid = createNanoId()

export { v4 as uuid } from "uuid"
