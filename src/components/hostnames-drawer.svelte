<div class="url-list">
  {#if selectedWorkspace}
    {#if selectedWorkspace.hostnames.length}
      <List nonInteractive>
        {#each selectedWorkspace.hostnames as hostname}
          <Item>
            <div class="item">
              <Text>{hostname}</Text>
              <span class="delete-button-wrapper">
                <Button class="delete-button" 
                        on:click={() =>  { activeHostname = hostname; deleteHostnameDialog.open()} }>
                  <i class="material-icons">clear</i>
                </Button>
              </span>
            </div>
          </Item>
        {/each}
      </List>
    {:else}
      <div class="empty-state">Nothing here yet... Add an URL address</div>
    {/if}
  {/if}
</div>
<br />
<div class="add-item-container">
  <AddItem type="url" label="URL" on:newItem={addUrl} />
</div>

<Dialog bind:this={deleteHostnameDialog} 
        aria-labelledby="event-title" 
        aria-describedby="event-content" 
        on:MDCDialog:closed={deleteHostnameHandler}>
  <DialogTitle id="event-title">Delete {activeHostname} url</DialogTitle>
  <DialogContent id="event-content">
    Are you sure you want to delete this URL?
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
  import List, { Item, Text } from "@smui/list";
  import { createEventDispatcher } from "svelte";
  import AddItem from "./add-item.svelte";
  import Button, {Label} from '@smui/button';
  import Dialog, {
    Actions, 
    InitialFocus, 
    Content as DialogContent, 
    Title as DialogTitle
  } from '@smui/dialog';

  const dispatch = createEventDispatcher();
  export let selectedWorkspace;
  let deleteHostnameDialog;
  let activeHostname;
  
  function addUrl(event) {
    selectedWorkspace.hostnames = [
      ...selectedWorkspace.hostnames,
      event.detail
    ];
    dispatch("saveWorkpaces");
  }
  
  function deleteHostnameHandler(e) {
    switch (e.detail.action) {
      case 'delete':
        selectedWorkspace.hostnames = [
          ...selectedWorkspace.hostnames.filter(x => x != activeHostname),
        ];
        dispatch("saveWorkpaces");
        break;
      case 'cancel':
      default:
        break;
    }
  }
</script>

<style>
  .url-list {
    overflow: auto;
    height: 350px;
    text-align: center;
    margin: auto 0;
  }
  .add-item-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .empty-state {
    color: lightgray;
    font-size: 30px;
  }
  .item {
    width: 100%;
    display: flex;
    line-height: 41px;
  }
	.delete-button-wrapper {
		opacity: 0;
    margin-left: 5px;
	}
	.item:hover .delete-button-wrapper {
		opacity: 1;
    margin-right: -7px;
	}
</style>