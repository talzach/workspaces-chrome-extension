<div class="content">
    {#if selectedWorkspace}
        {#if selectedWorkspace.urls.length}
            <div class="url-list">
                <List>
                    {#each selectedWorkspace.urls as url}
                        <UrlItem {url} on:deleteUrl={deleteUrl} />
                    {/each}
                </List>
            </div>
        {:else}
            <div class="empty-state">Nothing here yet... Add URL addresses</div>
        {/if}
        <div>
            <Separator nav />
            <div class="add-item-container">
                <AddItem type="url" label="New URL" on:newItem={addUrl} bind:addItemRef={addUrlItemRef} />
            </div>
        </div>
    {:else}
        <div class="empty-state">No workspaces</div>
    {/if}
</div>

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
        color: lightgray;
        font-size: 40px;
        margin: auto 0;
        text-align: center;
    }
</style>

<script>
    import List, { Separator } from '@smui/list';
    import { createEventDispatcher } from 'svelte';
    import AddItem from '../add-item.svelte';
    import UrlItem from './url-item.svelte';
    import Button, { Label } from '@smui/button';

    export let selectedWorkspace;
    export let addUrlItemRef = null;

    const dispatch = createEventDispatcher();

    function addUrl(event) {
        dispatch('addUrl', event.detail);
    }

    function deleteUrl(event) {
        dispatch('deleteUrl', event.detail);
    }
</script>
