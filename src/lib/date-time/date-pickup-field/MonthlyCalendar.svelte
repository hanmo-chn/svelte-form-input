<script lang="ts">

    import dateUtils from "../date-utils";
    import calendarContext from "./calendar-context";
    import dayjs from "dayjs";
    import {createEventDispatcher, onMount} from "svelte";

    export let value: dayjs.Dayjs;
    export let min: dayjs.Dayjs;
    export let max: dayjs.Dayjs;
    export let year:number;
    export let month:number;

    let weekTitle = calendarContext.getWeekTitle();
    let today = dateUtils.today();
    const dispatch = createEventDispatcher();

    let isWeekend = idx => {
        let dow = (idx + calendarContext.getWeekBegin()) % 7;
        return dow == 6 || dow == 0;
    }

    let days = [];

    onMount(()=>{

    })

    $: showCalendar(year, month);

    const showCalendar = (y, m) => {
        let beginDay = dayjs(new Date(y, m, 1));
        let od = ((beginDay.day() % 7 - calendarContext.getWeekBegin()) + 7) % 7;
        if (od==0) {
            od = 7;
        }
        let from = beginDay.add(-od, "days");
        days = [];
        for (let i=0; i<42; i++) {
            days.push({m: from.month()==month, d: from.date(), isToday: from.month()==month && from.isSame(today),
                selected:from.isSame(value), disabled: (min != null && from.isBefore(min)) || (max != null && from.isAfter(max)) })
            from = from.add(1, "days");
        }
        days = [...days];
    }

    let respondClick:boolean = true;
    const handleDayClick = (ad) => {
        if (ad.m && respondClick) {
            respondClick = false;
            setTimeout(()=>{respondClick=true}, 200);
            dispatch("select", ad.d);
        }
    }

</script>
<div class="monthly-calendar">
    {#each Array(7) as _, idx}
        <div class="cell title" class:weekend={isWeekend(idx)}><span>{weekTitle[idx]}</span></div>
    {/each}
    {#each days as day, idx}
        <div class="cell calendar-day" class:weekend={idx % 7 >=5} class:today={day.isToday}
             on:click={()=>{handleDayClick(day)}}
             class:selected={day.selected}
             class:disabled={day.disabled || !day.m}><span>{day.d}</span></div>
    {/each}
</div>

<style>
    .monthly-calendar {
        position: relative;
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: 36px repeat(6, 28px);
        padding: 0 4px;
        grid-gap: 2px;
        align-items: center;
        overflow: hidden;
        text-align: center;
        font-size: 12px;
    }

    .monthly-calendar .title {
        font-size: 1.05em;
        font-weight: 600;
    }

    .monthly-calendar .weekend {
        color: #ff3e00;
    }

    .monthly-calendar .disabled, .monthly-calendar .weekend.disabled {
        color: #7f7f7f;
    }

    .calendar-day span{
        width: 28px;
        height: 28px;
        display: inline-block;
        line-height: 28px;
        border-radius: 50%;
        position: relative;
    }

    .calendar-day span:hover {
        background-color: #f0f0f0;
    }

    .monthly-calendar .today span {
        font-weight: 600;
        background-color: #ff3e00;
        color: white;
    }

    .monthly-calendar .selected  span{
        font-weight: 600;
        background-color: #0277BD;
        color: white;
    }

    .calendar-day:active  span{
        top: 1px;
    }

    .disabled:hover  span{
        background-color: unset;
    }

    .disabled:active  span{
        top: 0;
    }



</style>