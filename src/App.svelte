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
  :global(.root) {
    margin: 20px;
    height: 90%;
  }

  :global(.app-content) {
    flex: auto;
    overflow: auto;
    position: relative;
    flex-grow: 1;
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