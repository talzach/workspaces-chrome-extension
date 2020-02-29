<script>
  import Drawer, {
    Content,
    Header,
    Title,
    Subtitle,
    Scrim
  } from "@smui/drawer";
  import List, { Item, Text } from "@smui/list";
  import Button, { Label } from "@smui/button";
  import IconButton from "@smui/icon-button";
  import Textfield, { Input } from "@smui/textfield";
  import FloatingLabel from "@smui/floating-label";
  import LineRipple from "@smui/line-ripple";

  export let workspaces = [];
  let [selectedWorkspace] = workspaces;
  let newHostName = "";

  function addHostname() {
    selectedWorkspace.hostnames = [...selectedWorkspace.hostnames, newHostName];
    saveWorkspacesToStorage();
  }

  function saveWorkspacesToStorage() {
    chrome.storage.sync.set({ workspaces }, () => {
      console.log("workspaces saved");
    });
  }
</script>

<Textfield
  withLeadingIcon
  variant="filled"
  fullwidth
  lineRipple={true}
  bind:value={newHostName}
  label="URL"
  type="url"
  class="add-url-field"
  input$aria-controls="helper-text-standard-a"
  input$aria-describedby="helper-text-standard-a" />
<IconButton class="material-icons" on:click={addHostname}>
  add_to_photos
</IconButton>
