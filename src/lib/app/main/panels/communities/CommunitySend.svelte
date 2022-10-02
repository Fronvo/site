<script lang="ts">
    import {
        maxChatAnimDelay,
        sendContent,
        targetSendHeight,
    } from 'stores/app/communities';
    import { onDestroy, onMount } from 'svelte';
    import type { Unsubscriber } from 'svelte/store';
    import { fly } from 'svelte/transition';

    let unsubscribe: Unsubscriber;

    onMount(() => {
        unsubscribe = sendContent.subscribe((newContent) => {
            // Multiline textarea should have adjustable height
            const contentInput = document.getElementById('textarea-content');

            let targetHeight: string;

            // For empty text
            if (
                !newContent ||
                (newContent.length < 40 && newContent.indexOf('\n') == -1)
            ) {
                targetHeight = '55px';
            } else {
                targetHeight = Math.min(contentInput.scrollHeight, 300) + 'px';
            }

            // Also add margin for the messages to be visible
            contentInput.style.height = targetHeight;

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
    <textarea id="textarea-content" bind:value={$sendContent} maxlength={512} />
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

    @media screen and (max-width: 720px) {
        .send-container {
            bottom: 110px;
            width: 80%;
            min-width: initial;
            min-height: 55px;
        }

        .send-container textarea {
            font-size: 1.9rem;
        }
    }

    @media screen and (max-width: 720px) {
        .send-container {
            bottom: 85px;
            width: 70%;
        }

        .send-container textarea {
            font-size: 1.4rem;
            min-height: 45px;
        }
    }
</style>
