<script>
  import AddItem from "./add-item.svelte";
  import WorkspacesDrawer from "./workspaces-drawer.svelte";
  import HostnamesDrawer from "./hostnames-drawer.svelte";
  import {
    saveWorkspacesToStorage,
    createWorkspace
  } from "../workspaces-service.js";

  export let workspaces = [];
  let [selectedWorkspace] = workspaces;

  function addWorkspace(event) {
    const createdWorkspace = createWorkspace(event.detail);
    workspaces = [...workspaces, createdWorkspace];
    saveWorkspacesToStorage(workspaces);
    selectedWorkspace = createdWorkspace;
  }

  function selectWorkspace(event) {
    selectedWorkspace = event.detail;
  }

  function addUrl(event) {
    saveWorkspacesToStorage(workspaces);
  }
</script>

<style>
  .drawer-container {
    position: relative;
    display: flex;
    height: 350px;
    max-width: 600px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    overflow: hidden;
    z-index: 0;
  }
  .main-content {
    padding: 16px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>

<div class="drawer-container">
  <WorkspacesDrawer
    {workspaces}
    on:addWorkspace={addWorkspace}
    on:selectWorkspace={selectWorkspace} />

  <main class="main-content">
    <HostnamesDrawer {selectedWorkspace} on:addUrl={addUrl} />
  </main>
</div>
