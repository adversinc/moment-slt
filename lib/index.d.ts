/**
 * Special truncated moment-timezone module which contains
 * SLT timezone (PDT) only.
 *
 * The problem is huge latest.json loaded by default moment-timezone.
 * Use this module instead of moment/moment-timezone everywhere.
 */
import dayjs from "dayjs";
declare const _default: dayjs.DayjsTimezone;
export default _default;
