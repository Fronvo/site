<script lang="ts">
    export let bio: string;
    export let editable = false;
    export let mini = false;
</script>

{#if bio || editable}
    <div
        class={`bio-container ${mini ? 'mini' : ''} ${
            editable ? 'editable' : ''
        }`}
    >
        <h1 id="descriptor">Bio</h1>

        {#if !editable}
            <h1 id="bio">
                {bio}
            </h1>
        {:else}
            <textarea maxlength={128} bind:value={bio} />
        {/if}
    </div>
{/if}

<style>
    .bio-container {
        display: flex;
        flex-direction: column;
        align-items: start;
        margin-left: 32px;
        padding-bottom: 10px;
        margin-right: 10px;
        padding-top: 5px;
        border-top: 1px solid var(--primary);
    }

    .editable {
        transform: translateY(20px);
    }

    .mini {
        margin-left: 22px;
        max-width: 315px;
    }

    #descriptor {
        margin: 0;
        margin-top: 5px;
        font-size: 0.75rem;
        font-weight: 900;
        text-align: start;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .mini #descriptor {
        font-size: 0.75rem;
    }

    #bio {
        font-size: 0.95rem;
        margin: 0;
        color: var(--text);
        white-space: pre-wrap;
        display: -webkit-box;
        overflow: auto;
        text-align: start;
        max-width: 500px;
        max-height: 200px;
        width: 100%;
    }

    .mini #bio {
        font-size: 0.9rem;
    }

    textarea {
        width: 100%;
        background: var(--primary);
        border: 2px solid var(--primary);
        transition: 150ms border;
        font-size: 1rem;
        margin: 0;
        color: var(--text);
        white-space: pre-wrap;
        display: -webkit-box;
        overflow: auto;
        text-align: start;
        max-width: 500px;
        height: 75px;
        width: 100%;
    }

    textarea:focus {
        border: 2px solid var(--branding);
    }
</style>
