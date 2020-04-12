<Drawer>
  <Header>
    <Title>Workspaces</Title>
    <Subtitle>Select or add your workspace</Subtitle>
  </Header>
  <Content>
    <div class="drawer-content">
      <List>
        {#each workspaces as workspace}
          <Item on:click={selectWorkspace(workspace)} 
                activated={workspace.name == selectedWorkspaceName}>
            <div class="item">
              <Text>{workspace.name}</Text>
              <span class="hover-icon-button-wrapper">
                <Button class="hover-icon-button" on:click={
                  () => {
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
        {/each}
      </List>
      <div>
        <Separator nav />
        <div class="add-item-container">
          <AddItem label="New Workspace" type="text" on:newItem={addWorkspace} />
        </div>
      </div>
    </div>
  </Content>
</Drawer>

<Dialog bind:this={deleteWorkspaceDialog} 
        aria-labelledby="event-title" 
        aria-describedby="event-content">
  <DialogTitle id="event-title">Delete {selectedWorkspaceName} Workspace</DialogTitle>
  <DialogContent id="event-content">
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

<Dialog bind:this={renameWorkspaceDialog} 
        aria-labelledby="event-title" 
        aria-describedby="event-content">
  <DialogTitle id="event-title">Rename Workspace</DialogTitle>
  <DialogContent id="event-content">
    Enter a new workspace name
    <input type="text" bind:value={renamedWorkspaceName}/>
  </DialogContent>
  <Actions>
    <Button on:click={() => renameWorkspace()}>
      <Label>Rename</Label>
    </Button>
    <Button autofocus>
      <Label>Cancel</Label>
    </Button>
  </Actions>
</Dialog>

<script>
  import Drawer, { Content, Header, Title, Subtitle } from "@smui/drawer";
  import List, { Item, Text, Separator } from "@smui/list";
  import { createEventDispatcher } from "svelte";
  import AddItem from "./add-item.svelte";
  import IconButton from "@smui/icon-button";
  import Button, {Label} from '@smui/button';
  import Dialog, {
    Actions, 
    InitialFocus, 
    Content as DialogContent, 
    Title as DialogTitle
  } from '@smui/dialog';
  
  const dispatch = createEventDispatcher();
  export let workspaces;
  export let selectedWorkspaceName;
  let deleteWorkspaceDialog;
  let renameWorkspaceDialog;
  let renamedWorkspaceName;

  function addWorkspace(event) {
    dispatch("addWorkspace", event.detail);
  }

  function deleteWorkspace() {
    dispatch("deleteWorkspace", selectedWorkspaceName);
  }

  function renameWorkspace() {
    dispatch("renameWorkspace", { 
      oldName: selectedWorkspaceName, 
      newName: renamedWorkspaceName
    });
  }

  function selectWorkspace(workspace) {
    selectedWorkspaceName = workspace.name;
    dispatch("selectWorkspace", workspace);
  }
</script>

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