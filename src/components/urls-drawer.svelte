
{#if selectedWorkspace}
  {#if selectedWorkspace.urls.length}
    <div class="url-list">
        <List>
          {#each selectedWorkspace.urls as url}
            <UrlItem 
              {url}
              on:deleteUrl={deleteUrl}>
            </UrlItem>
          {/each}
        </List>
    </div>
  {:else}
    <div class="empty-state">Nothing here yet... Add URL addresses</div>
  {/if}
  <div>
    <Separator nav />
    <div class="add-item-container">
      <AddItem type="url" label="New URL" on:newItem={addUrl} />
    </div>
  </div>
  {:else}
    <div class="empty-state">No workspaces</div>
{/if}

<script>
  import List, { Separator } from "@smui/list";
  import { createEventDispatcher } from "svelte";
  import AddItem from "./add-item.svelte";
  import UrlItem from "./url-item.svelte";
  import Button, {Label} from '@smui/button';

  const dispatch = createEventDispatcher();
  export let selectedWorkspace;
  
  function addUrl(event) {
    dispatch("addUrl", event.detail);
  }
  
  function deleteUrl(event) {
    dispatch("deleteUrl", event.detail);
  }

</script>

<style>
  .url-list {
    overflow: auto;
  }
  .add-item-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .empty-state {
    color: lightgray;
    font-size: 40px;
    margin: auto 0;
    text-align: center;
  }
</style>