
{#if selectedWorkspace}
  {#if selectedWorkspace.hostnames.length}
    <div class="url-list">
        <List>
          {#each selectedWorkspace.hostnames as hostname}
            <Item>
              <div class="item">
                <Text>{hostname}</Text>
                <span class="hover-icon-button-wrapper">
                  <Button class="hover-icon-button" 
                          on:click={() =>  { activeHostname = hostname; deleteHostnameDialog.open()} }>
                    <i class="material-icons">clear</i>
                  </Button>
                </span>
              </div>
            </Item>
          {/each}
        </List>
    </div>
  {:else}
    <div class="empty-state">Nothing here yet... Add URL addresses</div>
  {/if}
{/if}
<div>
  <Separator nav />
  <div class="add-item-container">
    <AddItem type="url" label="New URL" on:newItem={addUrl} />
  </div>
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
  import List, { Item, Text, Separator } from "@smui/list";
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
    dispatch("addUrl", event.detail);
  }
  
  function deleteHostnameHandler(e) {
    switch (e.detail.action) {
      case 'delete':
        dispatch("deleteUrl", activeHostname);
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
    /* height: 350px; */
  }
  .add-item-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .empty-state {
    color: lightgray;
    font-size: 30px;
    margin: auto 0;
    text-align: center;
  }
  .item {
    width: 100%;
    display: flex;
    line-height: 41px;
  }
	.hover-icon-button-wrapper {
		opacity: 0;
    margin-left: 10px;
	}
	.item:hover .hover-icon-button-wrapper {
		opacity: 1;
    margin-right: -7px;
	}
</style>