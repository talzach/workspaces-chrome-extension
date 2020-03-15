<script>
  import Drawer, { Content } from "@smui/drawer";
  import List, { Item, Text } from "@smui/list";
  import { createEventDispatcher } from "svelte";
  import AddItem from "./add-item.svelte";

  const dispatch = createEventDispatcher();
  export let workspaces;

  function addWorkspace(event) {
    dispatch("addWorkspace", event.detail);
  }

  function selectWorkspace(workspace) {
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
</style>

<Drawer>
  <Content>
    <div class="drawer-content">
      <List>
        {#each workspaces as workspace}
          <Item on:click={selectWorkspace(workspace)}>
            <Text>{workspace.name}</Text>
          </Item>
        {/each}
      </List>
      <br />
      <div class="add-item-container">
        <AddItem label="New Workspace" on:newItem={addWorkspace} />
      </div>
    </div>
  </Content>
</Drawer>
