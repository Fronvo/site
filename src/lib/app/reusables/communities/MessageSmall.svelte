<script lang="ts">
    import DeleteChatOption from '$lib/svgs/DeleteChatOption.svelte';
    import Reply from '$lib/svgs/Reply.svelte';
    import type { CommunityMessage, FronvoAccount } from 'interfaces/all';
    import { fade } from 'svelte/transition';

    export let profileData: FronvoAccount;
    export let messageData: CommunityMessage;
    export let replyCondition = true;
    export let deleteCondition = true;
    export let replyCallback = () => {};
    export let deleteCallback = () => {};
    export let animate = true;
</script>

<div in:fade={{ duration: animate ? 250 : 0 }} class={'message-container'}>
    {#if messageData.isReply}
        <div class="reply-container">
            {#if messageData.replyContent}
                <h1 id="reply-name">
                    Replying to <span>{profileData.username}</span>
                </h1>
                <h1 id="reply-message" class={`${messageData.messageId}-reply`}>
                    > <span>{messageData.replyContent}</span>
                </h1>
            {:else}
                <h1 id="reply-name">
                    Replying to <span>an unknown message</span>
                </h1>
            {/if}
        </div>
    {/if}

    <div class="message-info-container">
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
        width: 100%;
        padding-left: 10px;
        padding-right: 10px;
    }

    .message-container:hover {
        background: var(--accent_bg_color);
    }

    .message-info-container {
        display: flex;
        align-items: center;
    }

    .message-info-container .menu-container {
        opacity: 0;
        transition: 100ms;
    }

    .reply-container #reply-name {
        font-size: 1.3rem;
        margin: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        text-align: start;
    }

    .reply-container #reply-name span {
        color: var(--profile_info_color);
    }

    .reply-container #reply-message {
        color: var(--text_color);
        margin: 0;
        font-size: 1.2rem;
        overflow: hidden;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        text-align: start;
    }

    .reply-container #reply-message span {
        color: var(--profile_info_color);
    }

    .message-container:hover .message-info-container .menu-container {
        opacity: 1;
    }

    .menu-container {
        cursor: default;
        border: 3px solid var(--button_background);
        border-radius: 10px;
        background: var(--button_background);
        transform: translateY(-25px);
    }

    .message-container #content {
        color: var(--profile_info_color);
        margin: 0;
        margin-left: 2px;
        font-size: 1.3rem;
        white-space: pre-wrap;
        overflow: hidden;
        text-align: start;
        flex: 1;
    }

    @media screen and (max-width: 700px) {
        .chat-container {
            margin-top: 60px;
        }

        .reply-container #reply-name {
            font-size: 1.1rem;
        }

        .reply-container #reply-message {
            font-size: 0.95rem;
        }

        .message-container #content {
            font-size: 1.15rem;
        }
    }
</style>
