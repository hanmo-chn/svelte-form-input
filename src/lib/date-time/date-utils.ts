import dayjs from "dayjs";

/**
 * 获取今日的日期，时间清空
 */
const today = () => {
    return dayjs().hour(0).minute(0).second(0).millisecond(0);
}

/**
 * 格式化日期
 * @param d
 * @param fmt
 */
const formatDate = (d: dayjs.Dayjs | Date | string, fmt: string = 'YYYY-MM-DD'): string => {
    if (d == null) {
        return '';
    }
    d = dayjs.isDayjs(d) ? d : dayjs(d);
    return d.format(fmt);
}

const formatISODate = (d: dayjs.Dayjs | Date | string): string => {
    if (d == null) {
        return '';
    }
    d = dayjs.isDayjs(d) ? d : dayjs(d);
    return d.toISOString();
}

export default {today, formatDate, formatISODate}