<Item>
    <div class="item">
        <Text>{url}</Text>
        <span class="hover-icon-button-wrapper">
            <Button class="hover-icon-button" 
                    on:click={() =>  deleteUrlDialog.open() }>
            <i class="material-icons">clear</i>
            </Button>
        </span>
    </div>
</Item>
<Separator />

<Dialog bind:this={deleteUrlDialog} 
        aria-labelledby="event-title" 
        aria-describedby="event-content" 
        on:MDCDialog:closed={deleteUrlHandler}>
  <DialogTitle id="event-title">Delete {url} url</DialogTitle>
  <DialogContent id="event-content">
    Are you sure you want to delete this URL?
  </DialogContent>
  <Actions>
    <Button action="delete">
      <Label>Delete</Label>
    </Button>
    <Button default use={[InitialFocus]}>
      <Label>Cancel</Label>
    </Button>
  </Actions>
</Dialog>

<script>
    import { createEventDispatcher } from "svelte";
    import { Item, Text, Separator } from "@smui/list";
    import Button, {Label} from '@smui/button';
    import Dialog, {
        Actions, 
        InitialFocus, 
        Content as DialogContent, 
        Title as DialogTitle
    } from '@smui/dialog';

    export let url;
    const dispatch = createEventDispatcher();
    let deleteUrlDialog;
  
    function deleteUrlHandler(e) {
        switch (e.detail.action) {
            case 'delete':
                dispatch("deleteUrl", url);
                break;
            default:
                break;
        }
    }
</script>

<style>
    .item {
        width: 100%;
        display: flex;
        justify-content: space-between;
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