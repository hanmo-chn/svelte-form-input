<script lang="ts">

    import {createEventDispatcher} from "svelte";
    import calendarContext from "./calendar-context";

    const dispatch = createEventDispatcher();
    const months = calendarContext.getMonthTitle();
    export let value:number = 0;

    const handleMonthClick = (idx: number) => {
        dispatch('select', idx);
    }
</script>
<div class="popup-month-panel">
    {#each months as month, i}
        <div on:click={()=>handleMonthClick(i)} class:selected={i===value}><label>{month}</label></div>
    {/each}
</div>

<style>
    .popup-month-panel {
        width: 100%;
        height: 100%;
        position: relative;
        box-sizing: border-box;
        display: grid;
        padding: 10px;
        gap: 10px 10px;
        grid-template-columns: repeat(4, 1fr);
        grid-auto-rows: 33%;
        align-items: center;
        font-size: 14px;
    }

    .popup-month-panel .selected {
        border-bottom: 2px solid #0277BD;
    }

    .popup-month-panel>div {
        text-align: center;
        padding: 10px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .popup-month-panel>div:hover {
        background-color: #f0f0f0;
    }

</style>