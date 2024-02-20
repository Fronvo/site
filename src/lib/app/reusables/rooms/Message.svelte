<script lang="ts">
    import type { RoomMessage, FronvoAccount } from 'interfaces/all';
    import { ourData } from 'stores/profile';
    import {
        replyingToId,
        currentRoomMessages as roomMessages,
    } from 'stores/rooms';
    import Time from 'svelte-time/src/Time.svelte';
    import { differenceInMinutes } from 'date-fns';
    import {
        findCachedAccount,
        showDropdownMouse,
        showModal,
    } from 'utilities/main';
    import {
        ModalTypes,
        targetImageModal,
        targetMessageModal,
        targetMessageModalProfile,
        targetProfileModal,
    } from 'stores/modals';
    import { DropdownTypes } from 'stores/dropdowns';
    import linkifyHtml from 'linkify-html';
    import { cachedAccountData, mousePos } from 'stores/main';

    export let i = -1;
    export let profileData: FronvoAccount;
    export let messageData: RoomMessage;
    export let isPreview = false;
    export let hideCondition = false;
    export let isPending = false;

    // Skip context if same account
    let skipContext: boolean;
    // Skip time if messages are sent less than 15 minutes ago
    let showTime: boolean;
    let showLinks = false;

    let image: HTMLImageElement;

    $: {
        // Skip time if messages are sent less than 15 minutes ago
        showTime =
            new Date(messageData.creationDate).getDay() !=
                new Date($roomMessages[i - 1]?.message.creationDate).getDay() ||
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
            !isPreview &&
            !messageData.isReply;

        // Sanitise first
        showLinks =
            messageData.content?.includes('https') &&
            !messageData.content?.includes('<img') &&
            !messageData.content?.includes('<svg');

        if (image && !isPreview) {
            image.onload = () => {
                const container =
                    document.getElementsByClassName('chat-container')[0];

                container.scrollTop = container.scrollHeight;
            };
        }
    }

    async function showProfileModal(): Promise<void> {
        if (isPreview) return;

        if (profileData.profileId == $ourData.profileId) {
            $targetProfileModal = $ourData;
        } else {
            $targetProfileModal = await findCachedAccount(
                profileData.profileId,
                $cachedAccountData
            );
        }

        showModal(ModalTypes.Profile);
    }

    async function showReplyProfileModal(): Promise<void> {
        if (isPreview) return;

        const targetAccount = getRepliedMessage().profileData;

        if (targetAccount.profileId == $ourData.profileId) {
            $targetProfileModal = $ourData;
        } else {
            $targetProfileModal = await findCachedAccount(
                targetAccount.profileId,
                $cachedAccountData
            );
        }

        showModal(ModalTypes.Profile);
    }

    function showImage(): void {
        if (isPreview) return;

        $targetImageModal = messageData.attachment || messageData.tenorUrl;

        showModal(ModalTypes.Image);
    }

    function showOptions(): void {
        if (hideCondition || isPending || isPreview) return;

        $targetMessageModal = messageData;
        $targetMessageModalProfile = profileData;

        showDropdownMouse(DropdownTypes.Message, $mousePos);
    }

    function getRepliedMessage(): {
        message: RoomMessage;
        profileData: FronvoAccount;
    } {
        for (const messageIndex in $roomMessages) {
            const message = $roomMessages[messageIndex];

            if (message.message?.messageId == messageData.replyId) {
                return message;
            }
        }
    }
</script>

{#if showTime && !isPreview}
    <div class={`time-container ${hideCondition ? 'hide' : ''}`}>
        <h1 id="time">
            <!-- Any other day -->
            <Time
                timestamp={messageData.creationDate}
                format={'MMMM DD, YYYY'}
            />
        </h1>
    </div>
{/if}

<div
    class={`message-container ${isPreview ? 'preview' : ''} ${
        $replyingToId == messageData.messageId && !isPreview ? 'highlight' : ''
    } ${!skipContext ? 'spaced' : 'skip'} ${hideCondition ? 'hide' : ''} ${
        isPending ? 'pending' : ''
    }`}
    on:contextmenu={(ev) => {
        showOptions();

        ev.preventDefault();
    }}
>
    {#if messageData.isReply}
        <div class="reply-container">
            <span id="start" />
            <span id="mid" />

            <div class="wrapper">
                <img
                    src={getRepliedMessage().profileData.avatar
                        ? `${
                              getRepliedMessage().profileData.avatar
                          }/tr:w-40:h-40`
                        : '/images/avatar.png'}
                    draggable={false}
                    alt={`${
                        getRepliedMessage().profileData.profileId
                    }\'s avatar'`}
                />
                <h1
                    on:click={showReplyProfileModal}
                    on:keydown={showReplyProfileModal}
                    id="username"
                >
                    {getRepliedMessage().profileData.username}
                </h1>
                <h1
                    id="reply"
                    class={`reply-${getRepliedMessage().message.messageId}`}
                >
                    {getRepliedMessage().message.content
                        ? getRepliedMessage().message.content
                        : 'Unknown message'}
                </h1>
            </div>
        </div>
    {/if}

    <div class="info-container">
        {#if !skipContext}
            <img
                on:click={showProfileModal}
                on:keydown={showProfileModal}
                id="avatar"
                src={profileData.avatar
                    ? `${profileData.avatar}/tr:w-88:h-88`
                    : '/images/avatar.png'}
                draggable={false}
                alt={`${profileData.profileId}\'s avatar'`}
            />
        {/if}

        <div class="inner">
            <div class="top-container">
                {#if !skipContext}
                    <h1 id="name">{profileData.username}</h1>

                    <h1 id="small-time-2">
                        {#if new Date().getDay() == new Date(messageData.creationDate).getDay()}
                            Today at <Time
                                timestamp={messageData.creationDate}
                                format={'HH:mm'}
                            />
                        {:else if new Date().getDay() - 1 == new Date(messageData.creationDate).getDay()}
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
                {#if messageData.isTenor}
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
                        {@html `<iframe style="border-radius: 0px" src="${
                            messageData.spotifyEmbed
                        }" width="${
                            document.body.clientWidth < 1000 ? 300 : 400
                        }" height="80" frameBorder="0" loading="lazy"></iframe>`}
                    </div>
                {:else if messageData.isImage}
                    <img
                        bind:this={image}
                        id="attachment"
                        src={`${messageData.attachment}/tr:w-1000:h-1000:pr-true`}
                        draggable={false}
                        alt={'Message attachment'}
                        on:click={showImage}
                        on:keydown={showImage}
                    />
                {:else}
                    <h1 id="content">
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

                {#if !isPreview}
                    <svg
                        on:click={showOptions}
                        on:keydown={showOptions}
                        id="menu"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        ><path
                            d="M10 12a2 2 0 1 1 0-4a2 2 0 0 1 0 4m0-6a2 2 0 1 1 0-4a2 2 0 0 1 0 4m0 12a2 2 0 1 1 0-4a2 2 0 0 1 0 4"
                        /></svg
                    >
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    .message-container {
        display: flex;
        align-items: start;
        justify-content: start;
        flex-direction: column;
        width: 100%;
        max-width: 100%;
        margin-top: 0px;
        cursor: default;
        border-left: 2px solid transparent;
        padding-left: calc(max(1.25%, 0px));
        padding-bottom: 5px;
        user-select: none;
        z-index: 1;
    }

    .hide {
        visibility: hidden;
    }

    .highlight {
        border-left: 2px solid white;
    }

    .preview {
        margin: 0;
        width: 95%;
        align-items: start;
        margin-bottom: 20px;
    }

    .spaced {
        margin-top: 15px;
    }

    .info-container {
        display: flex;
    }

    .info-container .inner {
        display: flex;
        align-items: start;
        flex-direction: column;
        margin-left: 9px;
    }

    .skip .info-container .inner {
        margin-left: calc(40px + 8px);
    }

    .top-container {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 3px;
    }

    #name {
        margin: 0;
        font-size: 0.95rem;
        font-weight: 600;
        color: white;
    }

    #small-time-2 {
        margin: 0;
        font-size: 0.7rem;
        font-weight: 600;
        color: var(--gray);
        margin-left: 9px;
    }

    .reply-container {
        display: flex;
        align-items: center;
        margin-left: calc(17px);
        margin-bottom: 8px;
    }

    .reply-container #start {
        width: 2px;
        height: 14px;
        border: 1px solid var(--tertiary);
        border-radius: 20px;
        overflow: hidden;
        transform: translateY(7px);
    }

    .reply-container #mid {
        width: 30px;
        height: 2px;
        border: 1px solid var(--tertiary);
        border-radius: 20px;
        overflow: hidden;
        margin-bottom: 10px;
        transform: translateX(-2px) translateY(4px);
    }

    .reply-container .wrapper {
        display: flex;
        align-items: start;
        justify-content: center;
        color: var(--text);
        margin: 0;
        margin-left: 2px;
        font-size: 0.95rem;
        overflow: hidden;
        text-align: start;
        background: transparent;
        border-radius: 15px;
    }

    .reply-container .wrapper img {
        width: 20px;
        height: 20px;
        border-radius: 30px;
        margin-right: 3px;
        filter: brightness(75%);
    }

    .reply-container .wrapper #username {
        margin: 0;
        font-size: 0.8rem;
        margin-right: 5px;
        color: var(--gray);
        font-weight: 600;
    }

    .reply-container .wrapper #username:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    .reply-container .wrapper #reply {
        color: var(--gray);
        margin: 0;
        font-size: 0.8rem;
    }

    .time-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 1%;
        border-bottom: 2px solid var(--primary);
    }

    #time {
        position: relative;
        display: inline-block;
        margin: 0;
        font-size: 0.7rem;
        font-weight: 700;
        color: var(--gray);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        transform: translateY(8px);
        background: var(--primary);
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 5px;
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
        width: 44px;
        min-width: 44px;
        height: 44px;
        min-height: 44px;
        border-radius: 30px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        justify-self: start;
        cursor: pointer;
    }

    #avatar:active {
        transform: translateY(1px);
    }

    .preview #avatar {
        cursor: default;
    }

    .message-container:hover .menu-container {
        opacity: 1;
    }

    .message-container:hover .message-info-container .menu-container {
        opacity: 1;
    }

    #content {
        background: var(--primary);
        padding: 5px;
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 5px;
        color: var(--text);
        margin: 0;
        font-size: 0.9rem;
        font-weight: 500;
        white-space: pre-wrap;
        overflow: hidden;
        text-align: start;
        user-select: text;
        cursor: text;
    }

    .highlight #content {
        background: white;
        color: black;
    }

    .skip #content {
        margin-left: 5px;
    }

    .pending #content {
        opacity: 0.5;
    }

    #attachment {
        max-width: 100%;
        max-height: 200px;
        border-radius: 5px;
        cursor: pointer;
        transition: 150ms;
    }

    .skip #attachment {
        margin-left: 4px;
    }

    .preview #attachment {
        max-width: 100%;
        overflow: hidden;
    }

    .skip #spotify {
        margin-left: 5px;
    }

    #menu {
        width: 28px;
        height: 28px;
        min-width: 28px;
        min-height: 28px;
        margin: auto;
        margin-left: 5px;
        fill: rgb(255, 255, 255, 0.5);
        opacity: 0;
        border-radius: 30px;
        padding: 4px;
    }

    #menu:hover {
        background: var(--primary);
    }

    .message-container:hover #menu {
        opacity: 1;
    }
</style>
