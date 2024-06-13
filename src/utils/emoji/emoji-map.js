import { emojiMap as qqMap, emojiName as qqName } from "./emoji-map-qq";
import { emojiMap as doMap, emojiName as doName } from "./emoji-map-douyin";

export const emojiUrl = "https://www.emojiall.com/img/platform/qq/";

export const localemojiUrl = "@/assets/emoji/";

export const emojiMap = { ...qqMap, ...doMap };

export const emojiName = [...qqName, ...doName];
