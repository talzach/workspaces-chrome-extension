<script>
  import AddItem from "./add-item.svelte";
  import List, { Item, Text } from "@smui/list";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let selectedWorkspace;
  
  function addUrl(event) {
    selectedWorkspace.hostnames = [
      ...selectedWorkspace.hostnames,
      event.detail
    ];
    dispatch("addUrl", event.detail);
  }
</script>

<style>
  .url-list {
    overflow: auto;
    height: 350px;
  }
  .add-item-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
</style>

<div class="url-list">
  {#if selectedWorkspace}
    <h3>{selectedWorkspace.name}</h3>
    <List nonInteractive>
      {#each selectedWorkspace.hostnames as hostname}
        <Item>
          <Text>{hostname}</Text>
        </Item>
      {/each}
    </List>
  {/if}
</div>
<br />
<div class="add-item-container">
  <AddItem type="url" label="URL" on:newItem={addUrl} />
</div>
