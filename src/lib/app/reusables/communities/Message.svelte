<script lang="ts">
    import DeleteChatOption from '$lib/svgs/DeleteChatOption.svelte';
    import Reply from '$lib/svgs/Reply.svelte';
    import type { CommunityMessage, FronvoAccount } from 'interfaces/all';
    import Time from 'svelte-time/src/Time.svelte';
    import { fade } from 'svelte/transition';
    import { dismissDropdown, showDropdown } from 'utilities/main';
    import linkifyHtml from 'linkify-html';
    import { loadTargetProfile } from 'utilities/profile';
    import {
        dropdownImage,
        DropdownTypes,
        dropdownVisible,
    } from 'stores/dropdowns';
    import { cachedAccountData, dataSaver } from 'stores/main';

    export let profileData: FronvoAccount;
    export let messageData: CommunityMessage;
    export let hideOptions = false;
    export let replyCondition = true;
    export let deleteCondition = true;
    export let replyCallback = () => {};
    export let deleteCallback = () => {};
    export let isPreview = false;
    export let animate = true;
    export let highlight = false;

    function showImageDropdown(targetImage: string): void {
        if ($dropdownVisible) {
            dismissDropdown();
            return;
        }

        $dropdownImage = targetImage;

        showDropdown(DropdownTypes.Image);
    }

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

            replyElement.innerHTML =
                '> ' +
                linkifyHtml(messageData.replyContent, {
                    className: 'link',
                    truncate: 40,
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
        highlight ? 'highlight' : ''
    }`}
>
    <div class="message-info-container">
        <img
            id="avatar"
            draggable={false}
            src={profileData.avatar && !$dataSaver
                ? profileData.avatar
                : '/svgs/profile/avatar.svg'}
            alt={`${profileData.username}'s avatar`}
            on:contextmenu={() => showImageDropdown(profileData.avatar)}
        />

        <h1
            id="username"
            on:click={() =>
                !isPreview &&
                loadTargetProfile(profileData.profileId, $cachedAccountData)}
        >
            {profileData.username}
        </h1>

        <h1 id="creation-date">
            •
            <!-- Updates every 15 seconds -->
            <Time
                relative
                format={'dddd HH:mm · MMMM D YYYY'}
                live={15000}
                timestamp={messageData.creationDate}
            />
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

    {#if messageData.isReply}
        <div class="reply-container">
            {#if messageData.replyContent}
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

    <h1 id="content" class={messageData.messageId}>
        {messageData.content}
    </h1>
</div>

<style>
    .message-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 10px;
        padding-bottom: 5px;
    }

    .preview {
        min-width: 550px;
        width: 100%;
        max-width: 850px;
        padding-top: 0;
    }

    .highlight {
        background: var(--accent_bg_color);
        border-left: 5px solid var(--accent_shadow_color);
    }

    .message-container:hover {
        background: var(--accent_bg_color);
    }

    .message-info-container {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
    }

    .message-info-container #avatar {
        width: 44px;
        height: 44px;
        border-radius: 5px;
        margin-right: 5px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        justify-self: start;
    }

    .message-info-container #username {
        color: var(--profile_info_color);
        margin: 0;
        font-size: 1.45rem;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .message-info-container #username:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    .message-info-container #creation-date {
        font-size: 1rem;
        margin: 0;
        margin-left: 5px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        flex: 1;
        text-align: start;
    }

    .message-info-container .menu-container {
        opacity: 0;
    }

    .menu-container {
        cursor: default;
        border: 3px solid var(--button_background);
        border-radius: 10px;
        background: var(--button_background);
        transform: translateY(-25px);
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

    .message-container #content {
        color: var(--profile_info_color);
        margin: 0;
        margin-left: 2px;
        font-size: 1.3rem;
        white-space: pre-wrap;
        overflow: hidden;
        text-align: start;
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
            width: 36px;
            height: 36px;
        }

        .message-info-container #username {
            font-size: 1.2rem;
        }

        .message-info-container #username:hover {
            cursor: default;
        }

        .reply-container #reply-message {
            font-size: 0.95rem;
        }

        .message-container #content {
            font-size: 1.15rem;
        }

        .message-container #creation-date {
            font-size: 0.85rem;
        }
    }
</style>
