let months:Array<string> = [
    '一月', '二月', '三月','四月', '五月', '六月','七月', '八月', '九月','十月', '十一月', '十二月',
]

let weekTitle:Array<string> = [
    "日", "一", "二", "三", "四", "五", "六"
]

let weekBegin: number = 1;

const setMonthTitle = (value: Array<string>):void => {
    months = value;
}

const getMonthTitle = ():Array<string> => months;

export default {
    setMonthTitle,
    getMonthTitle,
    getWeekTitle: ():Array<string> => weekTitle.slice(weekBegin).concat(weekTitle.slice(0,weekBegin)),
    getWeekBegin: ():number => weekBegin
}