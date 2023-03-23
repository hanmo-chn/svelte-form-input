<script lang="ts">

    import dayjs from "dayjs";
    import dateUtils from "../date-utils";
    import iconCalendar from "./calendar_icon.svg";
    import iconDelete from "./delete_icon.svg";
    import Popover from "@hanmotec/tsui-common/popover"
    import CalendarPanel from "./CalendarPanel.svelte";
    import utils from "../utils";


    export let format:string = 'YYYY-MM-DD';
    export let style: string = '';
    export let disabled: any = null;
    export let mandatory: boolean = true;
    export let minDate: string;
    export let maxDate: string;
    export let value: string;
    export let readonly: boolean = false;
    export let time: string = '00:00:00';

    let valueText: string = '';

    let min: dayjs.Dayjs;
    let max: dayjs.Dayjs;
    let date: dayjs.Dayjs;


    $: min = minDate == null ? null : dayjs(minDate);
    $: max = maxDate == null ? null : dayjs(maxDate);

    $: if (utils.isEmpty(value)) {
        if (mandatory) {
            value = dateUtils.formatISODate(dateUtils.formatDate(dateUtils.today()).concat(' ').concat(time));
            date = dayjs(value);
            valueText = dateUtils.formatDate(date);
        } else {
            date = null;
            valueText = '';
        }
    } else {
        value = dateUtils.formatISODate(dateUtils.formatDate(dayjs(value)).concat(' ').concat(time));
        date = dayjs(value);
        valueText = dateUtils.formatDate(date);
    }

    let popover;

    const handleCalendarClick = () => {
        console.debug('打开日期选择框');
        popover.doOpen();
    }

    const handleCalendarSelect = (e) => {
        console.debug('关闭日期选择框');
        value = e.detail;
        popover.close();
    }


</script>
<div class="tsui-input-field trailing-icon" style="display: block; {style}">
    <input readonly {disabled} on:focus on:blur value={valueText}/>
    {#if !readonly}
        <div class="icon-bar">
            {#if !mandatory}
                <img style="padding: 6px" alt="" src={iconDelete} on:click={()=>{value=''}}/>
            {/if}
            <img style="padding: 6px" alt="" src={iconCalendar} on:click={handleCalendarClick}/>
        </div>
        <Popover bind:this={popover} posX="right" width="230" height="240">
            <CalendarPanel on:select={handleCalendarSelect} value={date || dayjs()} {min} {max} {time}/>
        </Popover>
    {/if}
</div>
