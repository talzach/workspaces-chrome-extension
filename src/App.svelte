<svelte:head>
  <title>Workspaces</title>
</svelte:head>

<div class="root">
  <div>
    <img src="./images/workspaces-logo-purple.png" alt="Workspaces" class="logo">
  </div>

  <AppContent class="app-content">
    {#if isLoaded}
      <WorkspacesManager {workspaces} />
    {/if}
  </AppContent>
</div>


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
    height: 94%;
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
  .logo {
    max-width: 100%; 
    height: 50px;
    padding: 0 10px 10px 0;
    margin: 0;
  }
</style>