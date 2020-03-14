<script>
  import IconButton from "@smui/icon-button";
  import Textfield, { Input } from "@smui/textfield";
  import { createEventDispatcher } from "svelte";

  export let type;
  export let label;
  const dispatch = createEventDispatcher();
  let newItem = '';

  function addItem() {
    dispatch("newItem", newItem);
    newItem = '';
  }
</script>

<Textfield
  withLeadingIcon
  variant="filled"
  fullwidth
  lineRipple={true}
  bind:value={newItem}
  label={label}
  type={type}
  input$aria-controls="helper-text-standard-a"
  input$aria-describedby="helper-text-standard-a" />
<IconButton class="material-icons" on:click={addItem}>add_to_photos</IconButton>
