<script>
  import Drawer, {
    AppContent
  } from "@smui/drawer";
  import WorkspacesManager from './WorkspacesManager.svelte';

  let workspaces = [];
  let isLoaded = false;

  chrome.storage.sync.get(["workspaces"], result => {
    workspaces = result.workspaces;
    isLoaded = true;
  });
</script>

<h1>URL Workspaces</h1>

<svelte:head>
  <title>URL Workspaces</title>
</svelte:head>
<AppContent class="app-content">
  {#if isLoaded === true}
    <WorkspacesManager workspaces={workspaces}></WorkspacesManager>
  {/if}
</AppContent>
