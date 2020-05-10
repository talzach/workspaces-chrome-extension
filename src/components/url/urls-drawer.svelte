<div class="content">
    {#if selectedWorkspace}
        {#if selectedWorkspace.urls.length}
            <div class="url-list">
                <List>
                    {#each selectedWorkspace.urls as url}
                        {#if url}
                            <UrlItem {url} on:deleteUrl={deleteUrl} />
                        {/if}
                    {/each}
                </List>
            </div>
        {:else}
            <div class="empty-state">
                <div class="empty-state-title">Add workspace sites</div>
                <div class="empty-state-sub-title">
                    Add the sites you want to include in this workspace using the input below
                </div>
            </div>
        {/if}
        <div>
            <Separator nav />
            <div class="add-item-container">
                <AddItem
                    type="url"
                    label="New URL (https://example.com)"
                    on:newItem={checkAndAddUrl}
                    bind:addItemRef={addUrlItemRef} />
            </div>
        </div>
    {:else}
        <div class="empty-state">
            <div class="empty-state-title">Add workspace</div>
            <div class="empty-state-sub-title">Add a new workspace using the bottom left input</div>
        </div>
    {/if}
</div>
<SpecificUrlWarningDialog bind:dialog={specificUrlWarningDialog} on:addUrl={addUrl} />

<style>
    .content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .url-list {
        overflow: auto;
    }
    .add-item-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .empty-state {
        margin: auto 0;
        text-align: center;
        color: lightgray;
    }
    .empty-state-title {
        font-size: 40px;
    }
    .empty-state-sub-title {
        margin-top: 10px;
        font-size: 25px;
    }
</style>

<script>
    import List, { Separator } from '@smui/list';
    import { createEventDispatcher } from 'svelte';
    import AddItem from '../add-item.svelte';
    import UrlItem from './url-item.svelte';
    import Button, { Label } from '@smui/button';
    import SpecificUrlWarningDialog from './specific-url-warning-dialog.svelte';

    export let selectedWorkspace;
    export let addUrlItemRef = null;

    const dispatch = createEventDispatcher();
    let specificUrlWarningDialog;
    let urlToAdd;

    function checkAndAddUrl({ detail: url }) {
        urlToAdd = url;
        getUrlSearch(urlToAdd) ? specificUrlWarningDialog.open() : addUrl();
    }

    function addUrl() {
        dispatch('addUrl', urlToAdd);
    }

    function deleteUrl(event) {
        dispatch('deleteUrl', event.detail);
    }

    function getUrlSearch(url) {
        return new URL(url).search;
    }
</script>
