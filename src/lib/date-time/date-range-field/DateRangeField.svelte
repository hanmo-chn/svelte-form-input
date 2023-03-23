<script lang="ts">

    import DatePickerField from "../date-pickup-field"

    export let from: string;
    export let to: string;
    export let mandatory: boolean = true;
    export let maxDate: string = null;
    export let minDate: string = null;

</script>

<div style="width: 100%; display: grid; grid-template-columns: auto 10px auto;">
    <DatePickerField style="width: 100%; top:0" {mandatory} bind:value={from} maxDate={to} {minDate}/>
    <div style="line-height: 38px; text-align: center"><span>-</span></div>
    <DatePickerField {mandatory} style="width: 100%; top:0" bind:value={to} minDate={from} {maxDate} time="23:59:59.999"/>
</div>