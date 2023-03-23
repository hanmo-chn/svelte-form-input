<script lang="ts">

    import dateUtils from "../date-utils";
    import dayjs from "dayjs";
    import YearPickupPanel from "./YearPickupPanel.svelte";
    import MonthPickupPanel from "./MonthPickupPanel.svelte";
    import MonthlyCalendar from "./MonthlyCalendar.svelte";
    import iconLeft from "./icon_left.svg";
    import iconRight from "./icon_right.svg";
    import {createEventDispatcher} from "svelte";

    export let value: dayjs.Dayjs;
    export let min: dayjs.Dayjs;
    export let max: dayjs.Dayjs;
    export let time: string;

    const dispatch = createEventDispatcher();
    const today = dateUtils.today();

    let year;
    let month;
    let showMode: 'Monthly' | 'Month-Choose' | 'Year-Choose' = 'Monthly';

    const extractDateValue = (dv):void => {
        year = dv.year();
        month = dv.month();
    }

    $:  if (value != null) {
            extractDateValue(value);
        } else {
            extractDateValue(today);
        }

    const handleDateSelected = (e) => {
        let value = new Date(year, month, e.detail);
        let allow = (min == null || !min.isAfter(value)) && (max == null || !max.isBefore(value));
        if (allow) {
            dispatch('select',  dateUtils.formatDate(value));
        }
    }

    const showNextMonth = () => {
        month = month + 1;
        if (month > 11) {
            month = 0;
            year++;
        }
    }

    const showPreviousMonth = () => {
        month = month - 1;
        if (month < 0) {
            month = 11;
            year--;
        }
    }

</script>
<div class="tsui-calendar-panel" style="width: 100%; height: 100%">
    {#if showMode === 'Monthly'}
        <div class="month-calendar">
            <div class="calendar-title-bar">
                <div>
                    <img src={iconLeft} on:click={()=>{showPreviousMonth()}}/>
                </div>
                <div style="width: 100%; text-align: center; line-height: 20px">
                    <span style="cursor: pointer; font-weight: 600" on:click={()=>{showMode='Year-Choose'}}>{year}</span>
                    <span> 年 </span>
                    <span style="cursor: pointer; font-weight: 600" on:click={()=>{showMode='Month-Choose'}}>{month+1}</span>
                    <span> 月 </span>
                </div>
                <div>
                    <img src={iconRight} on:click={()=>showNextMonth()}/>
                </div>
            </div>
            <MonthlyCalendar {year} {month} {max} {min} value={value} on:select={handleDateSelected} style="flex-grow: 1; flex-shrink: 1"/>
        </div>
    {:else if showMode === 'Month-Choose'}
        <MonthPickupPanel value={month} on:select={(e)=>{month=e.detail; showMode='Monthly'}}/>
    {:else}
        <YearPickupPanel value={year} minYear={min == null ? null : min.year()}
                   maxYear={max == null ? null : max.year()}  on:select={(e)=>{year=e.detail; showMode='Month-Choose'}}/>
    {/if}
</div>

<style>
    .tsui-calendar-panel {
        width: 100%;
        height: 100%;
        background-color: var(--tsui-app-background-color, #ffffff);
        box-sizing: border-box;
        position: relative;
        font-size: 12px;
    }

    .month-calendar {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }

    .month-calendar .calendar-title-bar {
        display: flex;
        font-size: 1.1em;
        flex-grow: 0;
        flex-shrink: 0;
        padding: 2px 10px;
        height: 22px;
        box-sizing: border-box;
        border-bottom: 1px solid #d9d9d9;
    }

    .calendar-title-bar img{
        width: 20px;
        height: 20px;
        padding: 2px;
        position: relative;
        box-sizing: border-box;
    }

    .calendar-title-bar img:hover {
        background-color: #f0f0f0;
        border-radius: 50%;
    }
</style>