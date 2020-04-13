<script>
  import WorkspacesManager from "./components/workspaces-manager.svelte";
  import Drawer, { AppContent } from "@smui/drawer";
  import { getWorkspacesFromStorage } from "./workspaces-service.js";

  let workspaces = [];
  let isLoaded = false;

  initialize();

  async function initialize() {
    workspaces = await getWorkspacesFromStorage();
    isLoaded = true;
  }
</script>

<style>
  .root {
    padding: 20px;
    height: 96%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  :global(.app-content) {
    height: 100%;
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

  h1 {
    padding: 0 10px 10px 10px;
    margin: 0;
  }
</style>

<svelte:head>
  <title>URL Workspaces</title>
</svelte:head>

<div class="root">
  <h1>URL Workspaces</h1>

  <AppContent class="app-content">
    {#if isLoaded}
      <WorkspacesManager {workspaces} />
    {/if}
  </AppContent>
</div>