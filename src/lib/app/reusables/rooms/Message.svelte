<script lang="ts">
    import type { RoomMessage, FronvoAccount } from 'interfaces/all';
    import { ourData } from 'stores/profile';
    import {
        replyingToId,
        currentRoomMessages as roomMessages,
        showScrollBottom,
    } from 'stores/rooms';
    import Time from 'svelte-time/src/Time.svelte';
    import { differenceInMinutes, getDayOfYear } from 'date-fns';
    import { showDropdown, showModal } from 'utilities/main';
    import {
        ModalTypes,
        targetImageModal,
        targetProfileModal,
    } from 'stores/modals';
    import { DropdownTypes } from 'stores/dropdowns';
    import { toast } from 'svelte-sonner';
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
            differenceInMinutes(
                new Date(messageData.creationDate),
                new Date($roomMessages[i - 1]?.message.creationDate)
            ) >= 15 ||
            (typeof $roomMessages[i - 1] == 'undefined' && !isPreview);

        // Skip context if same account
        skipContext =
            $roomMessages[i - 1]?.profileData.profileId ==
                profileData.profileId &&
            !showTime &&
            !isPreview;

        // Sanitise first
        showLinks =
            messageData.content.includes('https') &&
            !messageData.content.includes('<img') &&
            !messageData.content.includes('<svg');

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

        toast('Copied message to clipboard');
    }
</script>

{#if showTime}
    <div class="time-container">
        <hr />

        <h1 id="time">
            <!-- Same day -->
            {#if getDayOfYear(new Date(messageData.creationDate)) == getDayOfYear(new Date())}
                Today at <Time
                    timestamp={messageData.creationDate}
                    format={'HH:mm'}
                />
            {:else if getDayOfYear(new Date(messageData.creationDate)) == getDayOfYear(new Date()) - 1}
                <!-- Previous day -->
                Yesterday at <Time
                    timestamp={messageData.creationDate}
                    format={'HH:mm'}
                />
            {:else}
                <!-- Any other day -->
                <Time
                    timestamp={messageData.creationDate}
                    format={'DD/MM/YY HH:mm'}
                />
            {/if}
        </h1>

        <hr />
    </div>
{/if}

<div
    class={`message-container ${isPreview ? 'preview' : ''} ${
        $replyingToId == messageData.messageId && !isPreview ? 'highlight' : ''
    }`}
>
    {#if !skipContext && !(messageData.ownerId == 'fronvo' && messageData.isNotification)}
        <h1 id="name">{profileData.username}</h1>
    {/if}

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
                <svg
                    bind:this={avatar}
                    id="avatar"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 256 256"
                    on:click={showProfileModal}
                    on:keydown={showProfileModal}
                    ><path
                        fill="var(--branding)"
                        d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24ZM74.08 197.5a64 64 0 0 1 107.84 0a87.83 87.83 0 0 1-107.84 0ZM96 120a32 32 0 1 1 32 32a32 32 0 0 1-32-32Zm97.76 66.41a79.66 79.66 0 0 0-36.06-28.75a48 48 0 1 0-59.4 0a79.66 79.66 0 0 0-36.06 28.75a88 88 0 1 1 131.52 0Z"
                    /></svg
                >{/if}
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
                src={messageData.attachment}
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

        {#if !hideOptions && !messageData.isNotification}
            <div class="menu-container">
                {#if !messageData.isImage && !messageData.isSpotify && !messageData.isTenor}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        on:click={replyCallback}
                        on:keydown={replyCallback}
                        ><path
                            fill="var(--text)"
                            fill-rule="evenodd"
                            d="M10.03 6.47a.75.75 0 0 1 0 1.06l-3.72 3.72h8.19c.953 0 2.367.28 3.563 1.141c1.235.89 2.187 2.365 2.187 4.609a.75.75 0 0 1-1.5 0c0-1.756-.715-2.78-1.563-3.391c-.887-.639-1.974-.859-2.687-.859H6.31l3.72 3.72a.75.75 0 1 1-1.06 1.06l-5-5a.75.75 0 0 1 0-1.06l5-5a.75.75 0 0 1 1.06 0Z"
                            clip-rule="evenodd"
                        /></svg
                    >
                {/if}

                {#if messageData.content}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        on:click={copyContent}
                        on:keydown={copyContent}
                        ><g fill="var(--text)"
                            ><path
                                d="M6.6 11.397c0-2.726 0-4.089.843-4.936c.844-.847 2.201-.847 4.917-.847h2.88c2.715 0 4.072 0 4.916.847c.844.847.844 2.21.844 4.936v4.82c0 2.726 0 4.089-.844 4.936c-.843.847-2.201.847-4.916.847h-2.88c-2.716 0-4.073 0-4.917-.847c-.843-.847-.843-2.21-.843-4.936v-4.82Z"
                            /><path
                                d="M4.172 3.172C3 4.343 3 6.229 3 10v2c0 3.771 0 5.657 1.172 6.828c.617.618 1.433.91 2.62 1.048c-.192-.84-.192-1.996-.192-3.66v-4.819c0-2.726 0-4.089.843-4.936c.844-.847 2.201-.847 4.917-.847h2.88c1.652 0 2.8 0 3.638.19c-.138-1.193-.43-2.012-1.05-2.632C16.657 2 14.771 2 11 2C7.229 2 5.343 2 4.172 3.172Z"
                                opacity=".5"
                            /></g
                        ></svg
                    >
                {/if}

                <!-- Only the message author / room owner can delete messages -->
                {#if deleteCondition}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        on:click={deleteCallback}
                        on:keydown={deleteCallback}
                        ><path
                            fill="var(--text)"
                            d="M2.75 6.167c0-.46.345-.834.771-.834h2.665c.529-.015.996-.378 1.176-.916l.03-.095l.115-.372c.07-.228.131-.427.217-.605c.338-.702.964-1.189 1.687-1.314c.184-.031.377-.031.6-.031h3.478c.223 0 .417 0 .6.031c.723.125 1.35.612 1.687 1.314c.086.178.147.377.217.605l.115.372l.03.095c.18.538.74.902 1.27.916h2.57c.427 0 .772.373.772.834c0 .46-.345.833-.771.833H3.52c-.426 0-.771-.373-.771-.833ZM11.607 22h.787c2.707 0 4.06 0 4.941-.863c.88-.864.97-2.28 1.15-5.111l.26-4.081c.098-1.537.147-2.305-.295-2.792c-.442-.487-1.187-.487-2.679-.487H8.23c-1.491 0-2.237 0-2.679.487c-.441.487-.392 1.255-.295 2.792l.26 4.08c.18 2.833.27 4.248 1.15 5.112C7.545 22 8.9 22 11.607 22Z"
                        /></svg
                    >
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
        margin-top: 0px;
        margin-left: 3.5%;
        margin-bottom: 6px;
        cursor: default;
    }

    .preview {
        margin: 0;
        width: 95%;
        align-items: start;
        margin-bottom: 20px;
    }

    #name {
        margin: 0;
        font-size: 0.9rem;
        margin-left: calc(36px + 5px + 5px + 5px);
        margin-bottom: 2px;
        margin-top: 5px;
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
        margin-top: 5px;
        font-size: 0.8rem;
        white-space: pre-wrap;
        overflow: hidden;
        text-align: start;
        background: var(--message);
        padding: 5px;
        padding-right: 10px;
        border-radius: 5px;
        box-shadow: 0 0 10px var(--message_shadow);
    }

    #reply {
        color: var(--text);
        margin: 0;
        font-size: 0.825rem;
    }

    .time-container {
        display: flex;
        margin-top: 15px;
        margin-bottom: 15px;
    }

    hr {
        border-color: var(--primary);
        width: 38%;
        overflow: hidden;
    }

    #time {
        margin: 0;
        font-size: 0.8rem;
        margin: auto;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .message-info-container {
        display: flex;
        align-items: center;
    }

    .preview .message-info-container {
        flex-direction: row;
    }

    #avatar {
        width: 36px;
        min-width: 36px;
        height: 36px;
        min-height: 36px;
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
        transition: 150ms;
    }

    #avatar:hover {
        opacity: 0.75;
    }

    #avatar:active {
        transform: scale(0.975);
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
        font-size: 0.8rem;
        width: 36px;
        min-width: 36px;
        margin-right: 5px;
        text-align: center;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .message-info-container:hover #small-time {
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
        white-space: pre-wrap;
        overflow: hidden;
        text-align: start;
        background: var(--message);
        padding: 8px;
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 5px;
        box-shadow: 0 0 20px var(--message_shadow);
        border: 2px solid var(--message);
    }

    .highlight #content {
        box-shadow: none;
        border: 2px solid var(--branding);
    }

    #attachment {
        max-width: 600px;
        max-height: 300px;
        border-radius: 10px;
        cursor: pointer;
        margin-left: 5px;
        transition: 150ms;
    }

    #attachment:active {
        transform: scale(0.975);
        opacity: 0.5;
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
