<script lang="ts">
    import Abort from '$lib/svgs/Abort.svelte';
    import {
        communityData,
        replyingTo,
        replyingToId,
        sendContent,
    } from 'stores/community';
    import { onDestroy, onMount } from 'svelte';
    import type { Unsubscriber } from 'svelte/store';
    import { slide } from 'svelte/transition';

    let unsubscribe: Unsubscriber;

    function abortReply(): void {
        $replyingTo = undefined;
        $replyingToId = undefined;
    }

    onMount(() => {
        unsubscribe = sendContent.subscribe(() => {
            const el = document.getElementById(
                'textarea-content'
            ) as HTMLTextAreaElement;

            el.style.height = '0px';

            el.style.height = Math.min(el.scrollHeight, 400) + 'px';
        });
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

<div class="send-container">
    {#if $replyingTo}
        <div class="reply-container" in:slide={{ duration: 300 }}>
            <h1 id="reply-name">Replying to <span>{$replyingTo}</span></h1>
            <Abort callback={abortReply} />
        </div>

        <hr />
    {/if}

    <textarea
        placeholder={`Send to ${$communityData?.name}`}
        id="textarea-content"
        bind:value={$sendContent}
        maxlength={500}
    />
</div>

<style>
    hr {
        width: 100%;
        height: 1px;
        margin: 0;
        border-color: var(--seperator_background);
    }

    .send-container {
        width: 100%;
        background: var(--bg_color);
        position: sticky;
        padding-left: 15px;
        padding-right: 15px;
        padding-bottom: 25px;
        padding-top: 10px;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        right: 0;
        left: 0;
        bottom: 0;
        display: flex;
        margin: auto;
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
        font-size: 1.4rem;
        color: var(--profile_info_color);
        border-radius: 5px;
        min-height: 40px;
        max-height: 400px;
        transition: none;
    }

    .reply-container {
        background: var(--accent_bg_color);
        display: flex;
        align-items: center;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    .reply-container #reply-name {
        font-size: 1.4rem;
        margin: 0;
        padding: 5px;
        flex: 1;
    }

    .reply-container #reply-name span {
        color: var(--profile_info_color);
    }

    @media screen and (max-width: 850px) {
        .send-container {
            bottom: 0px;
            min-width: none;
            min-height: 100px;
            padding-bottom: 70px;
            padding-left: 0;
            padding-right: 0;
        }

        .send-container textarea {
            font-size: 1.1rem;
            min-height: 45px;
            border-radius: 0;
        }

        .reply-container #reply-name {
            font-size: 1.1rem;
        }
    }
</style>
