<div class="drawers-container">
    <WorkspacesDrawer
        {workspaces}
        selectedWorkspaceName={selectedWorkspace ? selectedWorkspace.name : null}
        on:addWorkspace={addWorkspace}
        on:deleteWorkspace={deleteWorkspace}
        on:renameWorkspace={renameWorkspace}
        on:selectWorkspace={selectWorkspace} />

    <main class="url-drawer-container">
        <UrlsDrawer {selectedWorkspace} on:addUrl={addUrl} on:deleteUrl={deleteUrl} bind:addUrlItemRef />
    </main>
</div>

<style>
    .drawers-container {
        position: relative;
        display: flex;
        border: 1px solid rgba(0, 0, 0, 0.1);
        overflow: hidden;
        z-index: 0;
        height: 100%;
    }
    .url-drawer-container {
        padding: 16px;
        width: calc(100% - 288px);
    }
</style>

<script>
    import WorkspacesDrawer from './workspace/workspaces-drawer.svelte';
    import UrlsDrawer from './url/urls-drawer.svelte';
    import { saveWorkspacesToStorage, createWorkspace } from '../workspaces-service.js';

    export let workspaces = [];

    let selectedWorkspace = getFirstWorkspace(workspaces);
    let addUrlItemRef;

    function getFirstWorkspace(workspaces) {
        const [first] = workspaces;
        return first;
    }

    function selectWorkspace({ detail: selected }) {
        selectedWorkspace = selected;
        addUrlItemRef.focus();
    }

    function addWorkspace({ detail: workspaceNameToAdd }) {
        if (isWorkspaceAlreadyExists(workspaceNameToAdd)) {
            const createdWorkspace = createWorkspace(workspaceNameToAdd);
            workspaces = [...workspaces, createdWorkspace];
            saveWorkspacesToStorage(workspaces);
            selectedWorkspace = createdWorkspace;
        }
    }

    function isWorkspaceAlreadyExists(workspaceName) {
        return workspaces && !workspaces.find(x => x.name == workspaceName);
    }

    function deleteWorkspace({ detail: workspaceNameToDelete }) {
        workspaces = workspaces.filter(x => x.name != workspaceNameToDelete);

        if (selectedWorkspace.name == workspaceNameToDelete) {
            selectedWorkspace = getFirstWorkspace(workspaces);
        }

        saveWorkspacesToStorage(workspaces);
    }

    function renameWorkspace({ detail: { oldName, newName } }) {
        workspaces = workspaces.map(workspace => {
            if (workspace.name == oldName) {
                return {
                    ...workspace,
                    name: newName,
                };
            } else return workspace;
        });
        saveWorkspacesToStorage(workspaces);
    }

    function addUrl(event) {
        const newUrl = event.detail;
        if (!selectedWorkspace.urls.includes(newUrl)) {
            selectedWorkspace.urls = [...selectedWorkspace.urls, newUrl];
            saveWorkspacesToStorage(workspaces);
        }
    }

    function deleteUrl(event) {
        const urlToDelete = event.detail;
        selectedWorkspace.urls = [...selectedWorkspace.urls.filter(x => x != urlToDelete)];
        saveWorkspacesToStorage(workspaces);
    }
</script>
