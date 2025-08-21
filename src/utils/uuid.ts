import { customAlphabet } from "nanoid/non-secure";

export const createNanoId = (size = 8) => customAlphabet("1234567890abcdefg", size);

export const nanoid = createNanoId();

export { v4 as uuid } from "uuid";
