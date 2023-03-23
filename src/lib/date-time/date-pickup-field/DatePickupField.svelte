<script lang="ts">

    import dayjs from "dayjs";
    import dateUtils from "../date-utils";
    import iconCalendar from "./calendar_icon.svg";
    import iconDelete from "./delete_icon.svg";
    import Popover from "@hanmotec/tsui-common/popover"
    import CalendarPanel from "./CalendarPanel.svelte";
    import utils from "../utils";
    import {onMount} from "svelte";


    export let format:string = 'YYYY-MM-DD';
    export let style: string = '';
    export let disabled: any = null;
    export let mandatory: boolean = true;
    export let minDate: string;
    export let maxDate: string;
    export let value: string;
    export let readonly: boolean = false;
    export let time: string = null;

    let valueText: string = '';

    let min: dayjs.Dayjs;
    let max: dayjs.Dayjs;
    let date: dayjs.Dayjs;

    const toFormattedDate = (d) => {
        let dt =  dateUtils.formatDate(d);
        if (time == null) {
            return dt;
        } else {
            return dateUtils.formatISODate(dt.concat(' ').concat(time));
        }
    }

    onMount(()=>{
        if (utils.isEmpty(value)) {
            if (mandatory) {
                value = toFormattedDate(dateUtils.today());
                date = dayjs(value);
                valueText = dateUtils.formatDate(date);
            } else {
                date = null;
                valueText = '';
            }
        } else {
            value = toFormattedDate(dayjs(value));
            date = dayjs(value);
            valueText = dateUtils.formatDate(date);
        }
    })


    $: min = minDate == null ? null : dayjs(minDate);
    $: max = maxDate == null ? null : dayjs(maxDate);

    $: if (!utils.isEmpty(value)) {
        value = toFormattedDate(dayjs(value));
        date = dayjs(value);
        valueText = dateUtils.formatDate(date);
    }

    let popover;

    const handleCalendarClick = () => {
        popover.doOpen();
    }

    const handleCalendarSelect = (e) => {
        value = e.detail;
        popover.close();
    }


</script>
<div class="tsui-input-field trailing-icon" style="display: block; {style}">
    <input readonly {disabled} on:focus on:blur value={valueText}/>
    {#if !readonly}
        <div class="icon-bar">
            {#if !mandatory}
                <img style="padding: 6px" alt="" src={iconDelete} on:click={()=>{value=''; valueText=''}}/>
            {/if}
            <img style="padding: 6px" alt="" src={iconCalendar} on:click={handleCalendarClick}/>
        </div>
        <Popover bind:this={popover} posX="right" width="230" height="240">
            <CalendarPanel on:select={handleCalendarSelect} value={date || dayjs()} {min} {max} {time}/>
        </Popover>
    {/if}
</div>
