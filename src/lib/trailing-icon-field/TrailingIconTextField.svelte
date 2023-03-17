<script lang="ts">

    import {createEventDispatcher} from "svelte";

    export let text;
    export let style;
    export let disabled: any = null;
    export let img:null = null;
    export let readonly:boolean = false;
    export let acceptKeyboard: boolean = true;

    let input$readonly = {}

    $: if (acceptKeyboard || readonly) {
        input$readonly = {readonly: true}
    } else {
        input$readonly = {}
    }

    const dispatch = createEventDispatcher();

    const handleIconClick = () => {
        dispatch('iconClick');
    }

</script>
<div class="tsui-input-field trailing-icon" {style}>
    <input {...input$readonly} {disabled} on:focus on:blur on:keydown on:keypress on:keyup bind:value={text}/>
    {#if !readonly && !disabled}
        <div class="icon-bar">
            <slot name="trailing-icon">
                <img alt="" src={img} on:click={handleIconClick}/>
            </slot>
        </div>
    {/if}
</div>