<Item>
    <div class="item">
        <img src="https://www.google.com/s2/favicons?domain={getUrlOrigin(url)}" alt="Google" width="16" height="16" class="icon"/>
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

    function getUrlOrigin(url) {
        return (new URL(url)).origin;
    }
  
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
        line-height: 41px;
    }
    .icon {
        align-self: center;
        margin-right: 10px; 
    }
	.hover-icon-button-wrapper {
		opacity: 0;
        margin-left: auto;
	}
	.item:hover .hover-icon-button-wrapper {
		opacity: 1;
        margin-right: -7px;
    }

    :global(.item .mdc-list-item__text) {
        cursor: text;
    }
</style>