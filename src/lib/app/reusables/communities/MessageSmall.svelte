<script lang="ts">
    import DeleteChatOption from '$lib/svgs/DeleteChatOption.svelte';
    import Reply from '$lib/svgs/Reply.svelte';
    import type { CommunityMessage } from 'interfaces/all';
    import { ourData } from 'stores/profile';
    import Time from 'svelte-time/src/Time.svelte';
    import { fade } from 'svelte/transition';

    export let messageData: CommunityMessage;
    export let replyCondition = true;
    export let deleteCondition = true;
    export let replyCallback = () => {};
    export let deleteCallback = () => {};
    export let animate = true;
</script>

<div
    in:fade={{ duration: animate ? 250 : 0 }}
    class={`message-container ${
        messageData.ownerId == $ourData?.profileId ? 'own' : ''
    }`}
>
    {#if messageData.isReply}
        <div class="reply-container">
            {#if messageData.replyContent}
                <h1 id="reply-message" class={`${messageData.messageId}-reply`}>
                    <span>{messageData.replyContent}</span>
                </h1>
            {:else}
                <h1 id="reply-name">
                    Replying to <span>an unknown message</span>
                </h1>
            {/if}
        </div>
    {/if}

    <div class="message-info-container">
        <h1 id="time">
            <Time timestamp={messageData.creationDate} format={'HH:mm'} />
        </h1>

        <h1 id="content" class={messageData.messageId}>
            {messageData.content}
        </h1>

        <div class="menu-container">
            <!-- Anyone can reply, if the chat request is accepted / not enabled -->
            {#if replyCondition}
                <Reply callback={replyCallback} />
            {/if}

            <!-- Only the message author / community owner can delete messages -->
            {#if deleteCondition}
                <DeleteChatOption callback={deleteCallback} />
            {/if}
        </div>
    </div>
</div>

<style>
    .message-container {
        display: flex;
        flex-direction: column;
        width: 90%;
        margin-bottom: 5px;
    }

    .own {
        align-items: end;
        width: 100%;
        margin-left: 0;
    }

    .message-info-container {
        display: flex;
        flex-direction: row;
    }

    .own .message-info-container {
        flex-direction: row-reverse;
    }

    #time {
        width: 45px;
        margin-left: 5px;
        margin-right: 5px;
        font-size: 0.9rem;
        opacity: 0;
        transition: 150ms;
    }

    .own #time {
        margin-left: 5px;
        margin-right: 0;
        text-align: center;
        align-self: center;
    }

    .message-container:hover #time {
        opacity: 1;
    }

    .menu-container {
        display: flex;
        align-items: center;
        cursor: default;
        border-radius: 10px;
        opacity: 0;
    }

    .message-container:hover .menu-container {
        opacity: 1;
    }

    .reply-container {
        background: var(--side_svg_bg_color);
        padding: 5px;
        border-radius: 10px;
        margin-bottom: 5px;
        min-width: min-content;
        max-width: max-content;
        margin-left: 55px;
    }

    .reply-container #reply-message {
        color: var(--text_color);
        margin: 0;
        font-size: 1rem;
        overflow: hidden;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        text-align: start;
        max-width: 1000px;
    }

    .own .reply-container #reply-message {
        text-align: end;
    }

    .reply-container #reply-message span {
        color: var(--profile_info_color);
    }

    .message-container:hover .menu-container {
        opacity: 1;
    }

    .menu-container {
        display: flex;
        align-items: center;
        cursor: default;
        border-radius: 10px;
    }

    .own .menu-container {
        flex-direction: row-reverse;
        margin-right: 5px;
    }

    .message-container #content {
        color: var(--profile_info_color);
        margin: 0;
        font-size: 1.1rem;
        white-space: pre-wrap;
        overflow: hidden;
        text-align: start;
        background: var(--side_svg_bg_color);
        padding: 10px;
        border-radius: 10px;
        border-top-left-radius: 0;
    }

    .own #content {
        background: var(--branding_color);
        color: white;
        border-top-left-radius: 10px;
        border-top-right-radius: 0;
    }

    @media screen and (max-width: 850px) {
        .chat-container {
            margin-top: 60px;
        }

        #time {
            font-size: 0.7rem;
        }

        .reply-container #reply-message {
            font-size: 0.85rem;
        }

        .message-container #content {
            font-size: 0.9rem;
        }
    }
</style>
