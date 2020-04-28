<Dialog bind:this={dialog} aria-labelledby="settings" aria-describedby="settings" class="settings-dialog">
    <DialogTitle id="settings-title">Settings</DialogTitle>
    <DialogContent id="settings-content">
        <div class="dialog-content">
            <FormField class="settings-field">
                <Switch bind:checked={isChangeTabTitles} on:change={tabTitleSettingChanged} />
                <span slot="label" class="tooltip">
                    Prefix workspace name
                    <span class="tooltiptext">
                        Rether tab titles will be prefixed with the workspace name in squere brackets
                    </span>
                </span>
            </FormField>
            <FormField class="settings-field">
                <Switch bind:checked={isHomogenicWorkspaces} on:change={homogenicWorkspacesSettingChanged} />
                <span slot="label" class="tooltip">
                    Homogenic workspaces
                    <span class="tooltiptext">Rether non-workspace tabs will be moved from workspace windows</span>
                </span>
            </FormField>
            <FormField class="settings-field">
                <Switch bind:checked={isMaxWindow} on:change={maxWindowSettingChanged} />
                <span slot="label" class="tooltip">
                    Maximized window state
                    <span class="tooltiptext">Rether new workspace windows will open in maximized window size</span>
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
        height: 320px;
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
        MAX_WINDOW_SETTING_STORAGE_KEY,
    } from '../settings-service';

    export let dialog = null;

    let isChangeTabTitles = false;
    let isHomogenicWorkspaces = false;
    let isMaxWindow = false;

    init();

    async function init() {
        isChangeTabTitles = await storageService.get(CHANGE_TAB_TITLE_SETTING_STORAGE_KEY);
        isHomogenicWorkspaces = await storageService.get(HOMOGENIC_WORKSPACES_SETTING_STORAGE_KEY);
        isMaxWindow = await storageService.get(MAX_WINDOW_SETTING_STORAGE_KEY);
    }

    function tabTitleSettingChanged() {
        storageService.set(CHANGE_TAB_TITLE_SETTING_STORAGE_KEY, isChangeTabTitles);
    }

    function homogenicWorkspacesSettingChanged() {
        storageService.set(HOMOGENIC_WORKSPACES_SETTING_STORAGE_KEY, isHomogenicWorkspaces);
    }

    function maxWindowSettingChanged() {
        storageService.set(MAX_WINDOW_SETTING_STORAGE_KEY, isMaxWindow);
    }
</script>
