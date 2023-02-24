<script lang="ts">

    import '@hanmotec/tsui-themes/tsui-themes.css';
    import LookupTextField from "../lib/lookup-text-field";
    import {onMount} from "svelte";


    onMount(()=>{

    })

</script>
<div style="width: 800px; margin: 10px auto; box-sizing: border-box">
    <LookupTextField style="width: 300px" on:iconClick={()=>{console.log('icon click')}} text="最近两日原材料入厂台账"/>
</div>




