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

<h1>URL Workspaces</h1>

<svelte:head>
  <title>URL Workspaces</title>
</svelte:head>

<AppContent class="app-content">
  {#if isLoaded}
    <WorkspacesManager {workspaces} />
  {/if}
</AppContent>
