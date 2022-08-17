import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

export function formatTime(data) {
  return dayjs(data).format("YYYY-MM-DD HH:mm:ss"); // 2022-5-7 9:17:56
}
