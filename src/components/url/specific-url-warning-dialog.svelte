<Dialog
    bind:this={dialog}
    aria-labelledby="specific-url"
    aria-describedby="specific-url"
    on:MDCDialog:closed={addUrlHandler}
    class="specific-url-dialog">
    <DialogTitle id="specific-url-title">Adding URL</DialogTitle>
    <DialogContent id="specific-url-content">
        You are going to add a specific URL.
        <br />
        This means that other urls from that site are not going to open on the same window.
        <br />
        Usually you want to add a URL that contains only the domain name. For example: https://yourdomain.com
        <br />
        <br />
        Are you sure those were your intentions?
    </DialogContent>
    <Actions>
        <Button action="add">
            <Label>Yes</Label>
        </Button>
        <Button default use={[InitialFocus]}>
            <Label>Cancel</Label>
        </Button>
    </Actions>
</Dialog>

<style>
    :global(.mdc-dialog.specific-url-dialog .mdc-dialog__surface) {
        width: 750px;
        height: 320px;
    }
</style>

<script>
    import { createEventDispatcher } from 'svelte';
    import Button, { Label } from '@smui/button';
    import Dialog, { Actions, InitialFocus, Content as DialogContent, Title as DialogTitle } from '@smui/dialog';

    const dispatch = createEventDispatcher();
    export let dialog = null;

    function addUrlHandler(e) {
        switch (e.detail.action) {
            case 'add':
                dispatch('addUrl');
                break;
            default:
                break;
        }
    }
</script>
