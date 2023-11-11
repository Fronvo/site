<script lang="ts">
    import { ourData } from 'stores/profile';

    export let profileId: string;
    export let username: string;
    export let editable = false;
    export let mini = false;
    export let preview = false;
</script>

<div
    class={`identifier-container ${mini ? 'mini' : ''} ${
        preview ? 'preview' : ''
    } ${editable ? 'editable' : ''} ${$ourData.appliedTheme ? 'themed' : ''}`}
>
    <div class="info-container">
        <div class="lock-container">
            {#if !editable}
                <h1 id="username">
                    {username ? username : 'Deleted user'}
                </h1>
            {:else}
                <input
                    class={`${$ourData.isPRO ? 'pro' : ''}`}
                    maxlength={30}
                    bind:value={username}
                />
            {/if}
        </div>

        <div class="secondary-container">
            <h1 id="identifier">
                @{profileId ? profileId : 'deleted user'}
            </h1>
        </div>
    </div>
</div>

<style>
    .identifier-container {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-bottom: 10px;
        margin-left: 20px;
    }

    .editable {
        transform: translateY(20px);
    }

    .mini {
        margin-left: 10px;
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
        margin-right: 10px;
        margin-left: 10px;
        color: var(--text);
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .mini #username {
        font-size: 1.2rem;
    }

    .secondary-container {
        display: flex;
        align-items: center;
    }

    #identifier {
        font-size: 1.05rem;
        margin: 0;
        margin-right: 10px;
        margin-left: 10px;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .mini #identifier {
        font-size: 0.9rem;
    }

    input {
        background: var(--primary);
        border: 2px solid var(--primary);
        transition: 150ms border;
        font-size: 1.3rem;
        margin: 0;
        margin-right: 10px;
        margin-left: 10px;
        margin-top: 5px;
        margin-bottom: 10px;
        color: var(--text);
        height: 40px;
    }

    input:focus {
        border: 2px solid var(--branding);
    }

    .pro:focus {
        border: 2px solid var(--pro);
    }

    .themed input:focus {
        border: 2px solid var(--branding);
    }
</style>
