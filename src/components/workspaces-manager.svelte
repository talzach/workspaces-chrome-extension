<script>
  import AddItem from "./add-item.svelte";
  import Drawer, {
    Content,
    Header,
    Title,
    Subtitle,
    Scrim
  } from "@smui/drawer";
  import List, { Item, Text } from "@smui/list";
  import Button, { Label } from "@smui/button";
  import FloatingLabel from "@smui/floating-label";
  import LineRipple from "@smui/line-ripple";
  import { saveWorkspacesToStorage, createWorkspace } from "../workspaces-service.js";

  export let workspaces = [];
  let [selectedWorkspace] = workspaces;

  function addWorkspace(event) {
    const createdWorkspace = createWorkspace(event.detail);
    workspaces = [...workspaces, createdWorkspace];
    saveWorkspacesToStorage(workspaces);
    selectedWorkspace = createdWorkspace;
  }

  function addUrl(event) {
    selectedWorkspace.hostnames = [
      ...selectedWorkspace.hostnames,
      event.detail
    ];
    saveWorkspacesToStorage(workspaces);
  }
</script>

<style>
  .drawer-container {
    position: relative;
    display: flex;
    height: 350px;
    max-width: 600px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    overflow: hidden;
    z-index: 0;
  }
  .drawer-content {
    padding: 16px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .main-content {
    padding: 16px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
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

<div class="drawer-container">
  <Drawer>
    <Content>
      <div class="drawer-content">
        <List>
          {#each workspaces as workspace}
            <Item on:click={() => (selectedWorkspace = workspace)}>
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

  <main class="main-content">
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
  </main>
</div>
