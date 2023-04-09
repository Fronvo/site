<script lang="ts">
    import DeleteChatOption from '$lib/svgs/DeleteChatOption.svelte';
    import Reply from '$lib/svgs/Reply.svelte';
    import type { CommunityMessage, FronvoAccount } from 'interfaces/all';
    import { fade } from 'svelte/transition';
    import linkifyHtml from 'linkify-html';
    import { loadTargetProfile } from 'utilities/profile';
    import { cachedAccountData, dataSaver } from 'stores/main';
    import { ourData } from 'stores/profile';

    export let profileData: FronvoAccount;
    export let messageData: CommunityMessage;
    export let hideOptions = false;
    export let replyCondition = true;
    export let deleteCondition = true;
    export let replyCallback = () => {};
    export let deleteCallback = () => {};
    export let isPreview = false;
    export let animate = true;

    function addLinksPreview(): void {
        setTimeout(() => {
            const targetElement = document.getElementsByClassName(
                messageData.messageId
            )[0];

            if (!targetElement) return;

            targetElement.innerHTML = linkifyHtml(messageData.content, {
                className: 'link',
                truncate: 40,
                validate: {
                    url: (value) =>
                        /^https?:\/\/[0-9a-zA-Z-.\/\?=]+/.test(value),
                },
                target: '_blank',
            });

            // For replies too, if the message has one
            if (!messageData.isReply) return;

            const replyElement = document.getElementsByClassName(
                messageData.messageId + '-reply'
            )[0];

            if (!replyElement) return;

            replyElement.innerHTML = linkifyHtml(messageData.replyContent, {
                className: 'link',
                truncate: 50,
                validate: {
                    url: (value) =>
                        /^https?:\/\/[0-9a-zA-Z-.\/\?=]+/.test(value),
                },
                target: '_blank',
            });
        }, 0);
    }

    // Only in preview, community chats have issues with ordering
    $: isPreview && addLinksPreview();
</script>

<div
    in:fade={{ duration: !isPreview && animate ? 250 : 0 }}
    class={`message-container ${isPreview ? 'preview' : ''} ${
        profileData.profileId == $ourData?.profileId ? 'own' : ''
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
        <img
            id="avatar"
            draggable={false}
            src={profileData.avatar && !$dataSaver
                ? profileData.avatar
                : '/svgs/profile/avatar.svg'}
            alt={`${profileData.username}'s avatar`}
            on:click={() =>
                !isPreview &&
                loadTargetProfile(profileData.profileId, $cachedAccountData)}
        />

        <h1 id="content" class={messageData.messageId}>
            {messageData.content}
        </h1>

        {#if !hideOptions}
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
        {/if}
    </div>
</div>

<style>
    .message-container {
        display: flex;
        flex-direction: column;
        width: 90%;
        margin-top: 10px;
        margin-left: 5px;
        margin-bottom: 5px;
    }

    .own {
        align-items: end;
        width: 100%;
        margin-left: 10%;
        margin-right: 5px;
        margin-left: 0;
    }

    .preview {
        width: 90%;
        align-items: start;
    }

    .message-info-container {
        display: flex;
    }

    .own .message-info-container {
        flex-direction: row-reverse;
    }

    .preview .message-info-container {
        flex-direction: row;
    }

    .message-info-container #avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        margin-right: 5px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        justify-self: start;
        cursor: pointer;
    }

    .own #avatar {
        margin-left: 5px;
    }

    .preview #avatar {
        cursor: default;
    }

    .menu-container {
        display: flex;
        align-items: center;
        cursor: default;
        border-radius: 10px;
        opacity: 0;
    }

    .own .menu-container {
        flex-direction: row-reverse;
        margin-right: 5px;
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
        margin-left: 50px;
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
    }

    .own .reply-container #reply-message {
        text-align: end;
    }

    .reply-container #reply-message span {
        color: var(--profile_info_color);
    }

    .message-container:hover .message-info-container .menu-container {
        opacity: 1;
    }

    .message-container #content {
        color: var(--profile_info_color);
        margin: 0;
        margin-left: 5px;
        font-size: 1.1rem;
        white-space: pre-wrap;
        overflow: hidden;
        text-align: start;
        background: var(--side_svg_bg_color);
        padding: 10px;
        border-radius: 10px;
    }

    .own #content {
        background: var(--branding_color);
        color: white;
        border-bottom-left-radius: 10px;
    }

    :global(.own .link) {
        color: white;
    }

    @media screen and (max-width: 850px) {
        .chat-container {
            margin-top: 60px;
        }

        .preview {
            min-width: 100%;
            max-width: 100%;
            width: 100%;
        }

        .message-container #avatar {
            width: 34px;
            height: 34px;
        }

        .reply-container #reply-message {
            font-size: 0.85rem;
        }

        .message-container #content {
            font-size: 0.9rem;
        }
    }
</style>
