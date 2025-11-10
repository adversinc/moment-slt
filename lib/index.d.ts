/**
 * Special truncated moment-timezone module which contains
 * SLT timezone (PDT) only.
 *
 * The problem is huge latest.json loaded by default moment-timezone.
 * Use this module instead of moment/moment-timezone everywhere.
 */
import dayjsOrig from 'dayjs';
export declare const dayjs: typeof dayjsOrig;
export declare const dayjsModule: typeof dayjsOrig;
