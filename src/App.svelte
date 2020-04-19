<svelte:head>
    <title>Workspaces</title>
</svelte:head>

<SettingsDialog bind:dialog={settingsDialog} />
<div class="root">
    <div class="header">
        <img src="./images/workspaces-logo-purple.png" alt="Workspaces" class="logo" />
        <IconButton class="large material-icons settings-button" on:click={() => settingsDialog.open()}>
            settings
        </IconButton>
    </div>

    <AppContent class="app-content">
        {#if isLoaded}
            <WorkspacesManager {workspaces} />
        {/if}
    </AppContent>
</div>

<style>
    .root {
        padding: 28px;
        height: 100%;
        max-height: 100%;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }
    :global(.app-content) {
        height: calc(100% - 65px);
        background-color: white;
    }
    :global(.mdc-drawer) {
        height: auto;
    }
    :global(.hover-icon-button) {
        min-width: 10px;
        min-height: 38px;
        margin: 0;
        padding: 2px;
    }
    .header {
        display: flex;
        justify-content: space-between;
    }
    .logo {
        max-width: 100%;
        height: 50px;
        padding: 0 10px 10px 0;
        margin: 0;
    }
    :global(.root .header .settings-button) {
        color: gray;
    }
</style>

<script>
    import IconButton from '@smui/icon-button';
    import WorkspacesManager from './components/workspaces-manager.svelte';
    import SettingsDialog from './components/settings.svelte';
    import Drawer, { AppContent } from '@smui/drawer';
    import { getWorkspacesFromStorage } from './workspaces-service.js';

    let workspaces = [];
    let isLoaded = false;
    let settingsDialog;

    initialize();

    async function initialize() {
        workspaces = await getWorkspacesFromStorage();
        isLoaded = true;
    }
</script>
