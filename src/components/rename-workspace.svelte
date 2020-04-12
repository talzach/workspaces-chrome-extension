
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