<div class="drawer-container">
  <WorkspacesDrawer
    {workspaces}
    on:addWorkspace={addWorkspace}
    on:deleteWorkspace={deleteWorkspace}
    on:selectWorkspace={selectWorkspace} />

  <main class="main-content">
    <HostnamesDrawer {selectedWorkspace} 
        on:addUrl={addUrl}
        on:deleteUrl={deleteUrl} />
  </main>
</div>

<script>
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

  function deleteWorkspace(event) {
    workspaces = workspaces.filter(x => x.name != event.detail);
    saveWorkspacesToStorage(workspaces);
  }
  
  function addUrl(event) {
    const newUrl = event.detail;
    if (!selectedWorkspace.hostnames.includes(newUrl)) {
      selectedWorkspace.hostnames = [
        ...selectedWorkspace.hostnames,
        newUrl
      ];
      saveWorkspacesToStorage(workspaces);
    }
  }

  function deleteUrl(event) {
    const urlToDelete = event.detail;
    selectedWorkspace.hostnames = [
      ...selectedWorkspace.hostnames.filter(x => x != urlToDelete),
    ];
    saveWorkspacesToStorage(workspaces);
  }

  function selectWorkspace(event) {
    selectedWorkspace = event.detail;
  }

  function saveWorkpaces(event) {
    saveWorkspacesToStorage(workspaces);
  }
</script>

<style>
  .drawer-container {
    position: relative;
    display: flex;
    border: 1px solid rgba(0, 0, 0, 0.1);
    overflow: hidden;
    z-index: 0;
  }
  .main-content {
    padding: 16px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>