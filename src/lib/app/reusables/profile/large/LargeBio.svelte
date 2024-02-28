<script lang="ts">
    import linkifyHtml from 'linkify-html';
    import { isMobile } from 'stores/main';

    export let bio: string;
</script>

{#if bio}
    <div class={`since-container ${$isMobile ? 'mobile' : ''}`}>
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
        margin-left: 20px;
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

    @media screen and (max-width: 850px) {
        .mobile #top {
            font-size: 0.7rem;
        }

        .mobile #bio {
            font-size: 0.75rem;
        }
    }
</style>
