<Item on:click={selectWorkspace} activated={isSelected}>
    <div class="item">
        <Text>{workspace.name}</Text>
        <span class="hover-icon-button-wrapper">
            <Button
                class="hover-icon-button"
                on:click={() => {
                    renamedWorkspaceName = workspace.name;
                    renameWorkspaceDialog.open();
                }}>
                <i class="material-icons">edit</i>
            </Button>
            <Button class="hover-icon-button" on:click={() => deleteWorkspaceDialog.open()}>
                <i class="material-icons">clear</i>
            </Button>
        </span>
    </div>
</Item>

<Dialog bind:this={deleteWorkspaceDialog} aria-labelledby="delete-title" aria-describedby="delete-content">
    <DialogTitle id="delete-title">Delete {workspace.name} Workspace</DialogTitle>
    <DialogContent id="delete-content">
        Are you sure you want to delete this workspace with everything within it?
    </DialogContent>
    <Actions>
        <Button on:click={() => deleteWorkspace()}>
            <Label>Delete</Label>
        </Button>
        <Button default use={[InitialFocus]}>
            <Label>Cancel</Label>
        </Button>
    </Actions>
</Dialog>

<Dialog bind:this={renameWorkspaceDialog} aria-labelledby="rename-title" aria-describedby="rename-content">
    <DialogTitle id="rename-title">Rename Workspace</DialogTitle>
    <DialogContent id="rename-content">
        Enter a new workspace name
        <input type="text" bind:value={renamedWorkspaceName} use={[InitialFocus]} />
    </DialogContent>
    <Actions>
        <Button on:click={() => renameWorkspace()} default>
            <Label>Rename</Label>
        </Button>
        <Button>
            <Label>Cancel</Label>
        </Button>
    </Actions>
</Dialog>

<style>
    .item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        line-height: 37px;
    }
    .hover-icon-button-wrapper {
        opacity: 0;
        display: flex;
    }
    .item:hover .hover-icon-button-wrapper {
        opacity: 1;
        margin-right: -7px;
    }
</style>

<script>
    import { Item, Text } from '@smui/list';
    import { createEventDispatcher } from 'svelte';
    import IconButton from '@smui/icon-button';
    import Button, { Label } from '@smui/button';
    import Dialog, { Actions, InitialFocus, Content as DialogContent, Title as DialogTitle } from '@smui/dialog';

    export let workspace;
    export let isSelected;
    
    const dispatch = createEventDispatcher();
    let deleteWorkspaceDialog;
    let renameWorkspaceDialog;
    let renamedWorkspaceName;

    function selectWorkspace() {
        dispatch('selectWorkspace', workspace);
    }

    function deleteWorkspace() {
        dispatch('deleteWorkspace', workspace);
    }

    function renameWorkspace() {
        dispatch('renameWorkspace', {
            oldName: workspace.name,
            newName: renamedWorkspaceName,
        });
    }
</script>
