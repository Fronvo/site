<script lang="ts">
    import Abort from '$lib/svgs/Abort.svelte';
    import {
        replyingTo,
        replyingToId,
        sendContent,
        targetSendHeight,
    } from 'stores/community';
    import { onDestroy, onMount } from 'svelte';
    import type { Unsubscriber } from 'svelte/store';
    import { fade } from 'svelte/transition';

    let unsubscribe: Unsubscriber;

    function abortReply(): void {
        $replyingTo = undefined;
        $replyingToId = undefined;
    }

    onMount(() => {
        unsubscribe = sendContent.subscribe((newContent) => {
            // Multiline textarea should have adjustable height
            const contentInput = document.getElementById('textarea-content');

            let targetHeight: number;

            // For empty text
            if (
                !newContent ||
                (newContent.length < 40 && newContent.indexOf('\n') == -1)
            ) {
                targetHeight = 50;
            } else {
                targetHeight = Math.min(
                    contentInput.scrollHeight,
                    $replyingTo ? 350 : 300
                );
            }

            // Also add margin for the messages to be visible
            contentInput.style.height = `${targetHeight}px`;

            // Share the value
            $targetSendHeight = targetHeight;
        });
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

<div id="blur" class="send-container" in:fade={{ duration: 200 }}>
    {#if $replyingTo}
        <div class="reply-container" in:fade={{ duration: 300 }}>
            <Abort callback={abortReply} />
            <h1 id="reply-name">Replying to <span>{$replyingTo}</span></h1>
        </div>
    {/if}

    <textarea id="textarea-content" bind:value={$sendContent} maxlength={500} />
</div>

<style>
    .send-container {
        width: 45%;
        min-width: 400px;
        background: var(--accent_bg_color);
        box-shadow: 0 0 10px var(--accent_shadow_color);
        position: fixed;
        bottom: 10px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .send-container textarea {
        background: var(--accent_bg_color);
        font-size: 1.5rem;
        color: var(--profile_info_color);
        overflow: auto;
    }

    .reply-container {
        background: var(--accent_bg_color);
        display: flex;
        align-items: center;
        transition: 300ms background;
    }

    .reply-container #reply-name {
        font-size: 1.5rem;
        margin: 0;
        padding: 5px;
    }

    .reply-container #reply-name span {
        color: var(--profile_info_color);
    }

    @media screen and (max-width: 700px) {
        .send-container {
            bottom: 85px;
            width: 70%;
            min-width: initial;
            min-height: 55px;
            backdrop-filter: none;
        }

        .send-container textarea {
            font-size: 1.1rem;
            min-height: 45px;
        }

        .reply-container #reply-name {
            font-size: 1.1rem;
        }
    }
</style>
