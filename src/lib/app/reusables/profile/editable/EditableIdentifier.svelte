<script lang="ts">
    import { ourData } from 'stores/profile';
    import type { Writable } from 'svelte/store';

    export let username: Writable<string>;
</script>

<div class="identifier-container">
    <div class="info-container">
        <div class="lock-container">
            <input bind:value={$username} />
        </div>

        <div class="secondary-container">
            <h1 id="identifier">
                {$ourData.profileId}
            </h1>
        </div>

        {#if $ourData.status}
            <h1 id="status">{$ourData.status}</h1>
        {/if}
    </div>
</div>

<style>
    .identifier-container {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-left: 15px;
    }

    .info-container {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        flex: 1;
    }

    .lock-container {
        display: flex;
        align-items: center;
    }

    input {
        width: 95%;
        height: 35px;
        background: var(--primary);
        border: 2px solid var(--primary);
        transition: 150ms;
        font-size: 1.5rem;
        margin: 0;
        margin-right: 5px;
        margin-bottom: 5px;
        color: var(--text);
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-weight: 600;
    }

    input:focus {
        border: 2px solid var(--branding);
    }

    .secondary-container {
        display: flex;
        align-items: center;
    }

    #identifier {
        font-size: 1.05rem;
        margin: 0;
        font-weight: 600;
        margin-right: 5px;
        margin-left: 5px;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    #status {
        font-size: 0.9rem;
        margin: 0;
        margin-right: 5px;
        margin-left: 5px;
        margin-top: 10px;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
</style>
