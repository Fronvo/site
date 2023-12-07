<script lang="ts">
    import type { RoomMessage, FronvoAccount } from 'interfaces/all';
    import { ourData } from 'stores/profile';
    import {
        replyingToId,
        currentRoomMessages as roomMessages,
        showScrollBottom,
    } from 'stores/rooms';
    import Time from 'svelte-time/src/Time.svelte';
    import { differenceInDays, differenceInMinutes } from 'date-fns';
    import { showDropdown, showModal } from 'utilities/main';
    import {
        ModalTypes,
        targetImageModal,
        targetProfileModal,
    } from 'stores/modals';
    import { DropdownTypes } from 'stores/dropdowns';
    import linkifyHtml from 'linkify-html';

    export let i = -1;
    export let profileData: FronvoAccount;
    export let messageData: RoomMessage;
    export let hideOptions = false;
    export let deleteCondition = true;
    export let deleteCallback = () => {};
    export let replyCallback = () => {};
    export let isPreview = false;

    // Skip context if same account
    let skipContext: boolean;
    // Skip time if messages are sent less than 15 minutes ago
    let showTime: boolean;
    let showLinks = false;

    let content: HTMLHeadingElement;
    let avatar: Element;
    let image: HTMLImageElement;

    // Only in preview
    $: {
        // Skip time if messages are sent less than 15 minutes ago
        showTime =
            differenceInDays(
                new Date(messageData.creationDate),
                new Date($roomMessages[i - 1]?.message.creationDate)
            ) >= 1 ||
            (typeof $roomMessages[i - 1] == 'undefined' && !isPreview);

        // Skip context if same account, less than 15 minutes ago
        skipContext =
            $roomMessages[i - 1]?.profileData.profileId ==
                profileData.profileId &&
            !showTime &&
            differenceInMinutes(
                new Date(messageData.creationDate),
                new Date($roomMessages[i - 1]?.message.creationDate)
            ) < 15 &&
            !isPreview;

        // Sanitise first
        showLinks =
            messageData.content?.includes('https') &&
            !messageData.content?.includes('<img') &&
            !messageData.content?.includes('<svg');

        // Add missing margins if previous message is from the same user
        // (not ours)
        if (content) {
            if (!isPreview && skipContext) {
                content.style.marginLeft = '5px';
            }
        }

        if (image && !isPreview) {
            image.onload = () => {
                if ($showScrollBottom) return;

                const container =
                    document.getElementsByClassName('chat-container')[0];

                container.scrollTop = container.scrollHeight;
            };
        }
    }

    function showProfileModal(): void {
        if (isPreview) return;

        if (profileData.profileId == $ourData.profileId) {
            $targetProfileModal = $ourData;
        } else {
            $targetProfileModal = profileData;
        }

        showDropdown(DropdownTypes.Profile, avatar, 'right', 0, -175);
    }

    function showImage(): void {
        if (isPreview) return;

        $targetImageModal = messageData.attachment || messageData.tenorUrl;

        showModal(ModalTypes.Image);
    }

    function copyContent(): void {
        navigator.clipboard.writeText(messageData.content);
    }
</script>

{#if showTime}
    <div class="time-container">
        <h1 id="time">
            <!-- Any other day -->
            <Time
                timestamp={messageData.creationDate}
                format={'MMMM DD, YYYY'}
            />
        </h1>
    </div>
{/if}

<!-- TODO: Remake entire message layout, need to have extra options inline as content -->
<!-- Also need to remove extra padding below avatar, keep spotify etc as is just content -->
<div
    class={`message-container ${isPreview ? 'preview' : ''} ${
        $replyingToId == messageData.messageId && !isPreview ? 'highlight' : ''
    }`}
>
    {#if messageData.isReply}
        <div class="reply-container">
            <div class="wrapper">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    ><g
                        fill="none"
                        stroke="var(--text)"
                        stroke-linecap="round"
                        stroke-width="1.5"
                        ><path
                            stroke-linejoin="round"
                            d="m9.5 7l-5 5l5 5"
                        /><path
                            d="M4.5 12h10c1.667 0 5 1 5 5"
                            opacity=".5"
                        /></g
                    ></svg
                >

                <h1 id="reply" class={`reply-${messageData.messageId}`}>
                    {messageData.replyContent}
                </h1>
            </div>
        </div>
    {/if}

    <div class="top-container">
        {#if !skipContext && !(messageData.ownerId == 'fronvo' && messageData.isNotification)}
            <h1 id="name">{profileData.username}</h1>

            <h1 id="small-time-2">
                {#if differenceInDays(new Date(), new Date(messageData.creationDate)) == 0}
                    Today at <Time
                        timestamp={messageData.creationDate}
                        format={'HH:mm'}
                    />
                {:else if differenceInDays(new Date(), new Date(messageData.creationDate)) == 1}
                    Yesterday at <Time
                        timestamp={messageData.creationDate}
                        format={'HH:mm'}
                    />
                {:else}
                    <Time
                        timestamp={messageData.creationDate}
                        format={'DD/MM/YYYY HH:mm'}
                    />
                {/if}
            </h1>
        {/if}
    </div>

    <div class="message-info-container">
        {#if !skipContext && !(messageData.ownerId == 'fronvo' && messageData.isNotification)}
            {#if profileData.avatar}
                <img
                    bind:this={avatar}
                    id="avatar"
                    draggable={false}
                    src={profileData.avatar}
                    alt={`${profileData.username}'s avatar`}
                    on:click={showProfileModal}
                    on:keydown={showProfileModal}
                />
            {:else}
                <img
                    bind:this={avatar}
                    id="avatar"
                    draggable={false}
                    src={'/images/avatar.svg'}
                    alt={`${profileData.username}'s avatar`}
                    on:click={showProfileModal}
                    on:keydown={showProfileModal}
                />
            {/if}
        {:else}
            <h1 id="small-time">
                <Time timestamp={messageData.creationDate} format={'HH:mm'} />
            </h1>
        {/if}

        {#if messageData.isNotification}
            <h1 id="notification">
                {messageData.notificationText.replace(
                    $ourData.profileId,
                    'You'
                )}
            </h1>
        {:else if messageData.isTenor}
            <img
                bind:this={image}
                id="attachment"
                src={messageData.tenorUrl}
                draggable={false}
                alt={'Tenor GIF'}
                on:click={showImage}
                on:keydown={showImage}
            />
        {:else if messageData.isSpotify}
            <div id="spotify">
                {@html `<iframe style="border-radius: 5px" src="${messageData.spotifyEmbed}" width="400" height="80" frameBorder="0" loading="lazy"></iframe>`}
            </div>
        {:else if messageData.isImage}
            <img
                bind:this={image}
                id="attachment"
                src={`${messageData.attachment}/tr:w-max:h-max:pr-true`}
                draggable={false}
                alt={'Message attachment'}
                on:click={showImage}
                on:keydown={showImage}
            />
        {:else}
            <h1 bind:this={content} id="content">
                {#if showLinks}
                    {@html linkifyHtml(messageData.content, {
                        attributes: {
                            class: 'link',
                            target: '_blank',
                        },
                    })}
                {:else}
                    {messageData.content}
                {/if}
            </h1>
        {/if}
    </div>
</div>

<style>
    .message-container {
        display: flex;
        align-items: start;
        justify-content: start;
        flex-direction: column;
        width: 97.5%;
        margin-left: 2%;
        margin-top: 0px;
        cursor: default;
        border-left: 2px solid transparent;
        padding-left: 10px;
        padding-bottom: 5px;
        padding-top: 2px;
        border-radius: 10px;
    }

    .message-container:hover {
        background: rgb(15, 15, 15, 0.1);
    }

    .highlight {
        border-left: 2px solid var(--branding);
        background: var(--hover_darken);
    }

    .preview {
        margin: 0;
        width: 95%;
        align-items: start;
        margin-bottom: 20px;
    }

    .top-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 5px;
    }

    #name {
        margin: 0;
        font-size: 1rem;
        margin-left: calc(36px + 5px + 5px + 5px);
        font-weight: 500;
        letter-spacing: 0.2px;
    }

    #small-time-2 {
        margin: 0;
        font-size: 0.8rem;
        color: var(--gray);
        margin-left: 10px;
    }

    .reply-container {
        display: flex;
        align-items: center;
        margin-left: calc(36px + 5px);
    }

    .reply-container svg {
        width: 20px;
        height: 20px;
        margin-right: 5px;
        cursor: default;
        rotate: 180deg;
    }

    .reply-container .wrapper {
        display: flex;
        align-items: start;
        justify-content: center;
        color: var(--text);
        margin: 0;
        margin-left: 5px;
        font-size: 0.95rem;
        overflow: hidden;
        text-align: start;
        background: transparent;
        padding: 5px;
        padding-left: 10px;
        padding-right: 10px;
        margin-bottom: 2px;
        border-radius: 15px;
        border: 2px solid var(--secondary);
    }

    #reply {
        color: var(--text);
        margin: 0;
        font-size: 0.825rem;
    }

    .time-container {
        display: flex;
        align-items: start;
        margin-top: 20px;
        margin-bottom: 20px;
        margin-left: 3%;
        overflow: hidden;
        border-bottom: 1px solid var(--tertiary);
    }

    #time {
        position: relative;
        display: inline-block;
        margin: 0;
        font-size: 0.8rem;
        font-weight: 600;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        bottom: 5px;
        margin-left: 5px;
    }

    .message-info-container {
        display: flex;
        align-items: start;
        justify-content: start;
    }

    .preview .message-info-container {
        flex-direction: row;
    }

    #avatar {
        width: 42px;
        min-width: 42px;
        height: 42px;
        min-height: 42px;
        border-radius: 30px;
        margin-right: 5px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        justify-self: start;
        cursor: pointer;
        transform: translateY(-16px);
    }

    #avatar:active {
        transform: translateY(-15px);
    }

    .preview #avatar {
        cursor: default;
    }

    .skip #avatar {
        display: none;
    }

    #small-time {
        opacity: 0;
        margin: 0;
        font-size: 0.75rem;
        width: 42px;
        min-width: 42px;
        margin-right: 5px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .message-container:hover #small-time {
        opacity: 1;
    }

    .menu-container {
        display: flex;
        align-items: center;
        cursor: default;
        border-radius: 10px;
        opacity: 0;
        padding-left: 5px;
    }

    .menu-container svg {
        width: 32px;
        height: 32px;
        border-radius: 20px;
        padding: 5px;
    }

    .menu-container svg:hover {
        background: var(--primary);
    }

    .message-container:hover .menu-container {
        opacity: 1;
    }

    .message-container:hover .message-info-container .menu-container {
        opacity: 1;
    }

    #content {
        color: var(--text);
        margin: 0;
        margin-left: 5px;
        font-size: 0.95rem;
        font-weight: 400;
        white-space: pre-wrap;
        overflow: hidden;
        text-align: start;
        padding-top: 5px;
        z-index: 1;
    }

    #attachment {
        max-width: 100%;
        max-height: 300px;
        border-radius: 10px;
        cursor: pointer;
        margin-left: 5px;
        transition: 150ms;
    }

    .preview #attachment {
        max-width: 100%;
        overflow: hidden;
    }

    #spotify {
        margin-left: 5px;
    }

    #notification {
        margin: 0;
        font-size: 0.9rem;
        text-align: center;
        width: 100%;
        margin-top: 10px;
        margin-bottom: 10px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        font-weight: 500;
    }

    :global(.link) {
        color: var(--branding);
    }
</style>
