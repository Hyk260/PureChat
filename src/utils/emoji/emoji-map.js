export const emojiUrl = "https://www.emojiall.com/img/platform/qq/";

export const localemojiUrl = "@/assets/emoji/";

export const emojiMap = {
  ...require("./emoji-map-qq").emojiMap,
  ...require("./emoji-map-douyin").emojiMap,
};

export const emojiName = [
  ...require("./emoji-map-qq").emojiName,
  ...require("./emoji-map-douyin").emojiName,
];
