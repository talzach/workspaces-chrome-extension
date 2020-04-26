<Dialog bind:this={dialog} aria-labelledby="settings" aria-describedby="settings" class="settings-dialog">
    <DialogTitle id="settings-title">Settings</DialogTitle>
    <DialogContent id="settings-content">
        <div class="dialog-content">
            <FormField class="settings-field">
                <Switch bind:checked={changeTabTitles} on:change={tabTitleSettingChanged} />
                <div slot="label" class="tooltip">
                    Prefix workspace name to tab titles
                    <span class="tooltiptext">Prefix workspace name to tab titles with square brackets</span>
                </div>
            </FormField>
            <FormField class="settings-field">
                <Switch bind:checked={homogenicWorkspaces} on:change={homogenicWorkspacesSettingChanged} />
                <span slot="label" class="tooltip">
                    Homogenic workspaces
                    <span class="tooltiptext">Remove none-workspace tabs from workspace window</span>
                </span>
            </FormField>
        </div>
    </DialogContent>
    <Actions>
        <Button>
            <Label>Close</Label>
        </Button>
    </Actions>
</Dialog>

<style>
    :global(.mdc-dialog__content .settings-field) {
        margin-top: 20px;
    }

    :global(.mdc-dialog.settings-dialog .mdc-dialog__surface) {
        width: 400px;
        height: 280px;
    }

    .dialog-content {
        display: flex;
        flex-direction: column;
    }
</style>

<script>
    import Switch from '@smui/switch';
    import FormField from '@smui/form-field';
    import IconButton from '@smui/icon-button';
    import Button, { Label } from '@smui/button';
    import Dialog, { Actions, InitialFocus, Content as DialogContent, Title as DialogTitle } from '@smui/dialog';
    import {
        CHANGE_TAB_TITLE_SETTING_STORAGE_KEY,
        HOMOGENIC_WORKSPACES_SETTING_STORAGE_KEY,
    } from '../settings-service';

    export let dialog = null;

    let changeTabTitles = false;
    let homogenicWorkspaces = false;

    init();

    async function init() {
        changeTabTitles = await storageService.get(CHANGE_TAB_TITLE_SETTING_STORAGE_KEY);
        homogenicWorkspaces = await storageService.get(HOMOGENIC_WORKSPACES_SETTING_STORAGE_KEY);
    }

    function tabTitleSettingChanged() {
        storageService.set(CHANGE_TAB_TITLE_SETTING_STORAGE_KEY, changeTabTitles);
    }

    function homogenicWorkspacesSettingChanged() {
        storageService.set(HOMOGENIC_WORKSPACES_SETTING_STORAGE_KEY, homogenicWorkspaces);
    }
</script>
