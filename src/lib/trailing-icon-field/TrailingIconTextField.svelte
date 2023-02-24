<script lang="ts">

    import {createEventDispatcher} from "svelte";

    export let text;
    export let style;
    export let disabled: any = null;
    export let img:null;
    export let readonly:boolean = null;

    const dispatch = createEventDispatcher();

    const handleIconClick = () => {
        dispatch('iconClick');
    }

</script>
<div class="tsui-input-field trailing-icon" {style}>
    <input {readonly} {disabled} on:focus on:blur on:keydown on:keypress on:keyup bind:value={text}/>
    <div>
        <img alt="" src={img} on:click={handleIconClick}/>
    </div>
</div>