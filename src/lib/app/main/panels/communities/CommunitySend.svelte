<script lang="ts">
    import Abort from '$lib/svgs/Abort.svelte';
    import {
        maxChatAnimDelay,
        replyingTo,
        replyingToId,
        sendContent,
        targetSendHeight,
    } from 'stores/communities';
    import { onDestroy, onMount } from 'svelte';
    import type { Unsubscriber } from 'svelte/store';
    import { fade, fly } from 'svelte/transition';

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
                targetHeight = $replyingTo ? 70 : 60;
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

<div
    class="send-container"
    in:fly={{ y: 150, duration: $maxChatAnimDelay + 200 }}
>
    {#if $replyingTo}
        <div class="reply-container" in:fade={{ duration: 300 }}>
            <Abort callback={abortReply} />
            <h1 id="reply-name">Replying to <span>{$replyingTo}</span></h1>
            <!-- TODO: Show message content above possibly, may be very helpful -->
        </div>
    {/if}

    <!-- TODO: Arrow to expand textarea for mobile (maybe desktop aswell, will disable keyListener too as a store) -->
    <textarea id="textarea-content" bind:value={$sendContent} maxlength={500} />
</div>

<style>
    .send-container {
        width: 50%;
        min-width: 600px;
        min-height: 65px;
        position: fixed;
        bottom: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: var(--nav_bg_color);
        box-shadow: 0 0 10px var(--nav_shadow_color);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        backdrop-filter: blur(5px);
    }

    .send-container textarea {
        background: transparent;
        font-size: 2.1rem;
        color: var(--profile_info_color);
        overflow: auto;
    }

    .reply-container {
        display: flex;
        align-items: center;
    }

    .reply-container #reply-name {
        font-size: 1.9rem;
        margin: 0;
        padding: 10px;
        padding-left: 5px;
    }

    .reply-container #reply-name span {
        color: var(--profile_info_color);
    }

    @media screen and (max-width: 720px) {
        .send-container {
            bottom: 110px;
            width: 80%;
            min-width: initial;
            min-height: 55px;
            backdrop-filter: none;
        }

        .send-container textarea {
            font-size: 1.9rem;
        }

        .reply-container #reply-name {
            font-size: 1.7rem;
        }
    }

    @media screen and (max-width: 520px) {
        .send-container {
            bottom: 85px;
            width: 70%;
        }

        .send-container textarea {
            font-size: 1.4rem;
            min-height: 45px;
        }

        .reply-container #reply-name {
            font-size: 1.3rem;
        }
    }
</style>
