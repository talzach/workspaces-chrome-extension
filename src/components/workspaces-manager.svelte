<div class="drawer-container">
  <WorkspacesDrawer
    {workspaces}
    selectedWorkspaceName={selectedWorkspace.name}
    on:addWorkspace={addWorkspace}
    on:deleteWorkspace={deleteWorkspace}
    on:renameWorkspace={renameWorkspace}
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

  function selectWorkspace({ detail: selected }) {
    selectedWorkspace = selected;
  }

  function addWorkspace({ detail: workspaceToAdd }) {
    const createdWorkspace = createWorkspace(workspaceToAdd);
    workspaces = [ ...workspaces, createdWorkspace ];
    saveWorkspacesToStorage(workspaces);
    selectedWorkspace = createdWorkspace;
  }

  function deleteWorkspace({ detail: workspaceToDelete }) {
    workspaces = workspaces.filter(x => x.name != workspaceToDelete);
    saveWorkspacesToStorage(workspaces);
  }
  
  function renameWorkspace({ detail: { oldName, newName } }) {
    workspaces = workspaces.map(workspace => {
      if (workspace.name == oldName) {
        return {
          ...workspace,
          name: newName
        };
      } else 
        return workspace;
    });
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
</script>

<style>
  .drawer-container {
    position: relative;
    display: flex;
    border: 1px solid rgba(0, 0, 0, 0.1);
    overflow: hidden;
    z-index: 0;
    height: 100%;
  }
  .main-content {
    padding: 16px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>