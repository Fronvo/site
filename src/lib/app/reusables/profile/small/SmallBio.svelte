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
        margin-top: 10px;
    }

    .since-container #top {
        margin: 0;
        font-size: 0.75rem;
        font-weight: 800;
        text-transform: uppercase;
        margin-bottom: 3px;
    }

    .since-container #bio {
        margin: 0;
        font-size: 0.85rem;
        margin-bottom: 10px;
        white-space: pre-wrap;
        max-lines: 5;
    }
</style>
