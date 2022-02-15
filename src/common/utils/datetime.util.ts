import * as moment from 'moment-timezone';

export const DatetimeFormatYYYYMMDDHHMM = 'YYYY-MM-DD HH:mm';
export const DateTimeFormatYYYYMMDDHH = 'YYYYMMDDHH';
export const MomentTimeZoneTaipei = 'Asia/Taipei';

/**
 * TODO 之後 有 common 的 plugin 可以處理
 */
export const Datetime = {
  datetime: {
    now(format: string) {
      return moment.utc().format(format);
    },
    isSameDay(date: Date) {
      return moment().isSame(date, 'day');
    },
    isBetweenYesterday(date: Date) {
      const [startOfYesterday, endOfYesterday] =
        Datetime.datetimeRange.yesterdayUTC();
      return moment(date).isBetween(startOfYesterday, endOfYesterday);
    },
  },
  YYYYMMDDHH: {
    getCurrentYYYYMMDDHH(timestamp?: number, offsetHour = 0) {
      let resetDay = 0;
      if (moment.tz(MomentTimeZoneTaipei).hours() < offsetHour) {
        resetDay = -1;
      }

      return Number(
        moment(timestamp)
          .tz(MomentTimeZoneTaipei)
          .startOf('hour')
          .add(resetDay, 'days')
          .add(offsetHour, 'hour')
          .utc()
          .format(DateTimeFormatYYYYMMDDHH),
      );
    },
    todayYYYYMMDDHH(timestamp?: number, offsetHour = 0) {
      let resetDay = 0;
      if (moment.tz(MomentTimeZoneTaipei).hours() < offsetHour) {
        resetDay = -1;
      }

      const startAt = Number(
        moment(timestamp)
          .tz(MomentTimeZoneTaipei)
          .startOf('day')
          .add(resetDay, 'days')
          .add(offsetHour, 'hour')
          .utc()
          .format(DateTimeFormatYYYYMMDDHH),
      );
      const endAt = Number(
        moment(timestamp)
          .tz(MomentTimeZoneTaipei)
          .endOf('day')
          .add(resetDay, 'days')
          .add(offsetHour, 'hour')
          .utc()
          .format(DateTimeFormatYYYYMMDDHH),
      );
      return [startAt, endAt];
    },
  },
  datetimeRange: {
    yesterday(format: string) {
      const startAt = moment
        .tz(MomentTimeZoneTaipei)
        .subtract(1, 'days')
        .startOf('day')
        .utc()
        .format(format);
      const endAt = moment
        .tz(MomentTimeZoneTaipei)
        .subtract(1, 'days')
        .endOf('day')
        .utc()
        .format(format);
      return [startAt, endAt];
    },
    yesterdayUTC() {
      const startAt = moment
        .tz(MomentTimeZoneTaipei)
        .subtract(1, 'days')
        .startOf('day')
        .utc();
      const endAt = moment
        .tz(MomentTimeZoneTaipei)
        .subtract(1, 'days')
        .endOf('day')
        .utc();
      return [startAt, endAt];
    },
    today(format: string, offsetHour = 0) {
      const startAt = moment
        .tz(MomentTimeZoneTaipei)
        .startOf('day')
        .add(offsetHour, 'hour')
        .utc()
        .format(format);
      const endAt = moment
        .tz(MomentTimeZoneTaipei)
        .endOf('day')
        .add(offsetHour, 'hour')
        .utc()
        .format(format);
      return [startAt, endAt];
    },

    thisWeek(format: string) {
      const startAt = moment
        .tz(MomentTimeZoneTaipei)
        .startOf('day')
        .utc()
        .format(format);
      const endAt = moment
        .tz(MomentTimeZoneTaipei)
        .endOf('day')
        .utc()
        .format(format);
      return [startAt, endAt];
    },
  },
};
