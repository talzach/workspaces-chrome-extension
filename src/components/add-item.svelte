<form on:submit|preventDefault={addItem}>
    <Textfield
        {label}
        {type}
        bind:value={newItem}
        bind:this={addItemRef}
        withLeadingIcon
        variant="filled"
        fullwidth
        lineRipple={true}
        required
        input$aria-controls="helper-text-standard-a"
        input$aria-describedby="helper-text-standard-a" />

    <span class="icon-wrapper">
        <IconButton type="submit" class="material-icons" disabled={!newItem}>add_box</IconButton>
    </span>
</form>

<style>
    .icon-wrapper {
        position: relative;
        bottom: -10px;
    }
    form {
        display: contents;
    }
</style>

<script>
    import IconButton from '@smui/icon-button';
    import Textfield, { Input } from '@smui/textfield';
    import { createEventDispatcher } from 'svelte';

    export let type;
    export let label;
    export let addItemRef = null;

    const dispatch = createEventDispatcher();
    let newItem = '';

    function addItem() {
        const trimmedNewItem = newItem.trim();
        if (trimmedNewItem) {
            dispatch('newItem', trimmedNewItem);
            newItem = '';
        }
    }
</script>
