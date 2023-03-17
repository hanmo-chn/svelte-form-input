<script lang="ts">

    import '@hanmotec/tsui-common/tsui-common.scss'
    import '../lib/tsui-form-fields.scss';
    import LookupTextField from "../lib/lookup-text-field";
    import {onMount} from "svelte";
    import DatePickupField from "../lib/date-time/date-pickup-field";

    onMount(()=>{

    })

</script>
<div style="width: 800px; margin: 10px auto; box-sizing: border-box">
    <LookupTextField readonly style="width: 300px" on:iconClick={()=>{console.log('icon click')}} text="最近两日原材料入厂台账"/>
    <div style="width: 400px; height:auto;">
        <DatePickupField style="width: 240px" value="2023-05-01" maxDate="2025-12-31" mandatory={true} on:select={(e)=>console.log(e.detail)}></DatePickupField>
    </div>
    <div style="width: 400px; height:auto;">
        <DatePickupField readonly style="width: 240px" value="2023-05-01" maxDate="2025-12-31" mandatory={true} on:select={(e)=>console.log(e.detail)}></DatePickupField>
    </div>
</div>




