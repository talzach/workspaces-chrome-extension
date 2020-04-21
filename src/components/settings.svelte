<Dialog bind:this={dialog} aria-labelledby="settings" aria-describedby="settings">
    <DialogTitle id="settings-title">Settings</DialogTitle>
    <DialogContent id="settings-content">
        <FormField class="settings-field">
            <Switch bind:checked={changeTabTitles} on:change={tabTitleSettingChanged} />
            <span slot="label">Prefix workspace name to tab titles</span>
        </FormField>
    </DialogContent>
    <Actions>
        <Button>
            <Label>Close</Label>
        </Button>
    </Actions>
</Dialog>

<style>
    :global(.mdc-dialog__content > :first-child.settings-field) {
        margin-top: 20px;
    }
</style>

<script>
    import Switch from '@smui/switch';
    import FormField from '@smui/form-field';
    import IconButton from '@smui/icon-button';
    import Button, { Label } from '@smui/button';
    import Dialog, { Actions, InitialFocus, Content as DialogContent, Title as DialogTitle } from '@smui/dialog';

    const CHANGE_TAB_TITLE_SETTING_STORAGE_KEY = 'changeTabTitles';

    export let dialog = null;

    let changeTabTitles = false;

    init();

    async function init() {
        changeTabTitles = await getFromStorage(CHANGE_TAB_TITLE_SETTING_STORAGE_KEY);
    }

    function tabTitleSettingChanged() {
        saveToStorage(CHANGE_TAB_TITLE_SETTING_STORAGE_KEY, changeTabTitles);
    }
</script>
