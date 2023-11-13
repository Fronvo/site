<script lang="ts">
    import { ourData } from 'stores/profile';

    export let profileId: string;
    export let username: string;
</script>

<div class="identifier-container">
    <div class="info-container">
        <div class="lock-container">
            <h1 id="username">
                {username ? username : 'Deleted user'}
            </h1>
        </div>

        <div class="secondary-container">
            <h1 id="identifier">
                {profileId ? profileId : 'deleted user'}
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

    #username {
        font-size: 1.5rem;
        margin: 0;
        margin-left: 5px;
        margin-right: 5px;
        color: var(--text);
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-weight: 600;
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
