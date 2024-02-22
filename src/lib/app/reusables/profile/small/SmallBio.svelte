<script lang="ts">
    import linkifyHtml from 'linkify-html';

    export let bio: string;
</script>

{#if bio}
    <div class="since-container">
        <h1 id="top">About me</h1>

        <h1 id="bio">
            {@html linkifyHtml(bio, {
                attributes: {
                    class: 'link',
                    target: '_blank',
                },
            })}
        </h1>
    </div>
{/if}

<style>
    .since-container {
        display: flex;
        flex-direction: column;
        align-items: start;
        margin-left: 15px;
    }

    .since-container #top {
        margin: 0;
        font-size: 0.9rem;
        font-weight: 800;
        text-transform: uppercase;
        margin-bottom: 3px;
        color: var(--text);
    }

    .since-container #bio {
        margin: 0;
        font-size: 0.85rem;
        white-space: pre-wrap;
        color: var(--text);
        font-weight: 500;
    }
</style>
