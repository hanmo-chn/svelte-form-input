<script lang="ts">

    import iconSelect from "./icon_select.svg"
    import TrailingIconTextField from "../trailing-icon-field";

    export let value;
    export let text;
    export let style;
    export let mandatory: boolean = true;
    export let disabled: any = null;
    export let defaultText:string = '';
    export let readonly: boolean = false;

    const handleKeyDownEvent = (e) => {
        if (!mandatory && (e.code == "Backspace" || e.code == "Delete")) {
            value = null;
            text = '';
        }
        e.preventDefault();
        e.stopPropagation();
    }

    const handleFocusEvent = (e) => {
        e.srcElement.setSelectionRange(0,  (text || '').length);
    }

    let displayText: string;

    $: displayText = (text || '').trim().length == 0 ? defaultText : text;

</script>
<TrailingIconTextField {readonly} {disabled} {style} acceptKeyboard={false} on:focus={handleFocusEvent} on:keydown={handleKeyDownEvent}
                       on:iconClick on:blur on:keypress on:keyup img={iconSelect} text={displayText}/>
