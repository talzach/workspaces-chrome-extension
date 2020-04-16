<Drawer>
    <Header>
        <Title>Your Workspaces</Title>
        <Subtitle>Select or add workspaces</Subtitle>
    </Header>
    <Content>
        <div class="drawer-content">
            <List>
                {#each workspaces as workspace}
                    <WorkspaceItem
                        {workspace}
                        isSelected={workspace.name == selectedWorkspaceName}
                        on:selectWorkspace={selectWorkspace}
                        on:deleteWorkspace={deleteWorkspace}
                        on:renameWorkspace={renameWorkspace} />
                {/each}
            </List>
            <div>
                <Separator nav />
                <div class="add-item-container">
                    <AddItem label="New Workspace" type="text" on:newItem={addWorkspace} bind:addItemRef />
                </div>
            </div>
        </div>
    </Content>
</Drawer>

<style>
    .drawer-content {
        padding: 16px;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .add-item-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
</style>

<script>
    import Drawer, { Content, Header, Title, Subtitle } from '@smui/drawer';
    import List, { Item, Text, Separator } from '@smui/list';
    import { createEventDispatcher, onMount } from 'svelte';
    import AddItem from '../add-item.svelte';
    import WorkspaceItem from './workspace-item.svelte';
    import IconButton from '@smui/icon-button';
    import Button, { Label } from '@smui/button';

    export let workspaces;
    export let selectedWorkspaceName;

    const dispatch = createEventDispatcher();
    let addItemRef;

    onMount(() => {
        addItemRef.focus();
    });

    function addWorkspace({ detail: workspace }) {
        dispatch('addWorkspace', workspace);
    }

    function deleteWorkspace({ detail: deletedWorkspace }) {
        dispatch('deleteWorkspace', deletedWorkspace.name);
    }

    function renameWorkspace({ detail: renamedWorkspace }) {
        dispatch('renameWorkspace', renamedWorkspace);
    }

    function selectWorkspace({ detail: selected }) {
        selectedWorkspaceName = selected.name;
        dispatch('selectWorkspace', selected);
    }
</script>
