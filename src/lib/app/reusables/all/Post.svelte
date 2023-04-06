<script lang="ts">
    import OptionsMenu from '$lib/svgs/OptionsMenu.svelte';
    import type { AccountPost, FronvoAccount } from 'interfaces/all';
    import Time from 'svelte-time/src/Time.svelte';
    import { fly } from 'svelte/transition';
    import { dismissDropdown, showDropdown } from 'utilities/main';
    import { loadTargetProfile } from 'utilities/profile';
    import linkifyHtml from 'linkify-html';
    import {
        dropdownImage,
        DropdownTypes,
        dropdownVisible,
    } from 'stores/dropdowns';
    import { postModalInfo } from 'stores/modals';
    import { cachedAccountData, dataSaver, guestMode } from 'stores/main';
    import { currentPanelId, PanelTypes } from 'stores/panels';

    export let profileData: FronvoAccount;
    export let postData: AccountPost;
    export let hideOptions = false;
    export let isPreview = false;
    export let isShare = false;

    function showImageDropdown(targetImage: string): void {
        if ($dropdownVisible) {
            dismissDropdown();
            return;
        }

        $dropdownImage = targetImage;

        showDropdown(DropdownTypes.Image);
    }

    function showPostDropdown(): void {
        if ($dropdownVisible) {
            dismissDropdown();
            return;
        }

        $postModalInfo = postData;

        showDropdown(DropdownTypes.PostOptions);
    }

    function addLinks(): void {
        setTimeout(() => {
            const targetElement = document.getElementsByClassName(
                postData.postId
            )[0];

            if (!targetElement) return;

            targetElement.innerHTML = linkifyHtml(postData.content, {
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

    $: addLinks();
</script>

<div
    in:fly={{ y: -15, duration: !isPreview ? 250 : 0 }}
    class={`post-container ${isPreview ? 'preview' : ''}`}
>
    <img
        id="avatar"
        src={profileData.avatar && !$dataSaver
            ? profileData.avatar
            : '/svgs/profile/avatar.svg'}
        draggable={false}
        alt={`${profileData.username}'s avatar`}
        on:contextmenu={() => showImageDropdown(profileData.avatar)}
    />

    <div class="info-container">
        <div class="top-container">
            <h1
                id="username"
                on:click={() =>
                    $currentPanelId != PanelTypes.Profile &&
                    !isPreview &&
                    loadTargetProfile(
                        profileData.profileId,
                        $cachedAccountData
                    )}
            >
                {profileData.username}
            </h1>

            <h1 id="creation-date">
                <Time
                    relative
                    format={'dddd HH:mm · MMMM D YYYY'}
                    live={60000}
                    timestamp={postData.creationDate}
                />
            </h1>

            {#if !$guestMode && !hideOptions}
                <OptionsMenu callback={showPostDropdown} />
            {/if}
        </div>

        {#if !isShare}
            <h1 id="content" class={postData.postId}>
                {postData.content}
            </h1>
        {:else}
            <!-- svelte-ignore a11y-autofocus -->

            <textarea
                autofocus
                placeholder="Content"
                id="content"
                class="modal-input"
                bind:value={postData.content}
                maxlength={256}
            />
        {/if}

        {#if postData.attachment && !$dataSaver}
            <img
                id="attachment"
                src={postData.attachment}
                alt={'Post attachment'}
                draggable={false}
                on:contextmenu={() => showImageDropdown(postData.attachment)}
            />
        {/if}
    </div>
</div>

<style>
    .post-container {
        display: flex;
        flex-direction: row;
        align-items: start;
        background: transparent;
        width: 650px;
        border-top: 1px solid var(--seperator_background);
        transition: 150ms;
        padding: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .preview {
        border-top: none;
        padding-top: 0;
    }

    .post-container #avatar {
        width: 54px;
        height: 54px;
        border-radius: 30px;
        margin-right: 5px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .top-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .top-container #username {
        color: var(--profile_info_color);
        font-size: 1.4rem;
        margin: 0;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .top-container #username:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    .top-container #creation-date {
        font-size: 0.9rem;
        margin: 0;
        margin-left: 9px;
        margin-top: 6px;
        flex: 1;
        text-align: start;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .info-container {
        text-align: start;
        width: 100%;
    }

    .info-container #content {
        display: -webkit-box;
        overflow: hidden;
        max-width: 100%;
        -webkit-line-clamp: 10;
        -webkit-box-orient: vertical;
        margin: 0;
        margin-right: 5px;
        font-size: 1.4rem;
        color: var(--profile_info_color);
        white-space: pre-wrap;
        text-align: start;
    }

    .info-container #attachment {
        width: min-content;
        max-width: 100%;
        max-height: 364px;
        border-radius: 10px;
        margin-top: 5px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    @media screen and (max-width: 850px) {
        .post-container {
            width: 100%;
            overflow: hidden;
            padding-left: 0;
            padding-right: 0;
            margin-left: 0;
            margin-right: 0;
            margin: auto;
        }

        .post-container #avatar {
            width: 48px;
            height: 48px;
            margin-top: 5px;
        }

        .preview {
            min-width: 95%;
            max-width: 95%;
            width: 95%;
        }

        .info-container #username {
            font-size: 1.3rem;
        }

        .info-container #username:hover {
            cursor: default;
        }

        .post-container #content {
            font-size: 1.1rem;
            -webkit-line-clamp: 7;
            overflow: hidden;
        }

        .post-container #attachment {
            max-height: 250px;
            max-width: 100%;
        }

        .post-container #creation-date {
            font-size: 0.8rem;
        }
    }

    /* For SAOS, animation on scroll */
    @keyframes -global-slide-top {
        0% {
            opacity: 0;
            transform: translateY(15px);
        }

        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
