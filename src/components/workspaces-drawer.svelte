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
                activated={workspace == activeWorkspace}>
            <div class="item">
              <Text>{workspace.name}</Text>
              <span class="delete-button-wrapper">
                <Button class="delete-button" on:click={() => deleteWorkspaceDialog.open()}>
                  <i class="material-icons">clear</i>
                </Button>
              </span>
            </div>
          </Item>
        {/each}
      </List>
      <br />
      <div class="add-item-container">
        <AddItem label="New Workspace" type="text" on:newItem={addWorkspace} />
      </div>
    </div>
  </Content>
</Drawer>

<Dialog bind:this={deleteWorkspaceDialog} 
        aria-labelledby="event-title" 
        aria-describedby="event-content" 
        on:MDCDialog:closed={deleteWorkspaceHandler}>
  <DialogTitle id="event-title">Delete {activeWorkspace.name} Workspace</DialogTitle>
  <DialogContent id="event-content">
    Are you sure you want to delete this workspace with everything within it?
  </DialogContent>
  <Actions>
    <Button action="delete">
      <Label>Delete</Label>
    </Button>
    <Button action="cancel" default use={[InitialFocus]}>
      <Label>Cancel</Label>
    </Button>
  </Actions>
</Dialog>

<script>
  import Drawer, { Content, Header, Title, Subtitle } from "@smui/drawer";
  import List, { Item, Text } from "@smui/list";
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
  let activeWorkspace = workspaces[0];
  let deleteWorkspaceDialog;

  function addWorkspace(event) {
    dispatch("addWorkspace", event.detail);
  }

  function deleteWorkspace(workspace) {
    dispatch("deleteWorkspace", workspace.name);
  }

  function selectWorkspace(workspace) {
    activeWorkspace = workspace;
    dispatch("selectWorkspace", workspace);
  }
  
  function deleteWorkspaceHandler(e) {
    switch (e.detail.action) {
      case 'delete':
        deleteWorkspace(activeWorkspace);
        break;
      case 'cancel':
      default:
        break;
    }
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
	.delete-button-wrapper {
		opacity: 0;
	}
	.item:hover .delete-button-wrapper {
		opacity: 1;
    margin-right: -7px;
	}
</style>