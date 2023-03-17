<script lang="ts">
    import {createEventDispatcher} from "svelte";

    export let value: number;
    export let maxYear: number = -1;
    export let minYear: number = -1;
    const dispatch = createEventDispatcher();
    const MARGIN = 12;

    const handleYearClick = (idx) => {
        let y = value-MARGIN+idx
        if (!isDisabled(y)) {
            dispatch('select', y);
        }
    }

    const isDisabled = (y) => (maxYear > 0 && y > maxYear) || (minYear > 0 && y < minYear);

</script>
<div class="popup-year-panel">
    {#each Array(25) as _, i}
        <div on:click={()=>handleYearClick(i)} class:disabled={isDisabled(value-MARGIN+i)} class:selected={value===value-MARGIN+i}>
            <span>{value-MARGIN+i}</span>
        </div>
    {/each}
</div>
<style>
    .popup-year-panel {
        width: 100%;
        height: 100%;
        padding: 10px;
        position: relative;
        box-sizing: border-box;
        display: grid;
        gap: 10px 10px;
        grid-template-columns: repeat(5, 1fr);
        grid-auto-rows: 1fr;
        align-items: center;
        font-size: 14px;
    }

    .popup-year-panel .selected {
        border-bottom: 2px solid #0277BD;
    }

    .popup-year-panel .disabled {
        color: #d9d9d9;
    }

    .popup-year-panel>div {
        text-align: center;
        padding: 10px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .popup-year-panel>div:hover {
        background-color: #f0f0f0;
    }

    .popup-year-panel>div.disabled:hover {
        background-color: #ffffff;
    }

</style>