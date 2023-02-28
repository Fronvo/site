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
    <div class="author-container">
        <img
            id="avatar"
            src={profileData.avatar && !$dataSaver
                ? profileData.avatar
                : '/svgs/profile/avatar.svg'}
            draggable={false}
            alt={`${profileData.username}'s avatar`}
            on:contextmenu={() => showImageDropdown(profileData.avatar)}
        />
        <h1
            id="author"
            on:click={() =>
                $currentPanelId != PanelTypes.Profile &&
                !isPreview &&
                loadTargetProfile(profileData.profileId, $cachedAccountData)}
        >
            {profileData.username} <span>@{profileData.profileId}</span>
        </h1>

        <h1 id="creation-date">
            •
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

    <h1 id="content" class={postData.postId}>{postData.content}</h1>

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

<style>
    .post-container {
        display: flex;
        flex-direction: column;
        background: transparent;
        width: 650px;
        background: transparent;
        border-top: 1px solid var(--seperator_background);
        transition: 300ms;
        padding: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .preview {
        border-top: none;
        padding-top: 0;
    }

    .author-container {
        display: flex;
        align-items: center;
    }

    .author-container #avatar {
        width: 48px;
        height: 48px;
        border-radius: 10px;
        margin-right: 5px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .author-container #author {
        color: var(--profile_info_color);
        font-size: 1.6rem;
        margin: 0;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .author-container #author:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    .author-container #author span {
        color: var(--text_color);
        font-size: 1.4rem;
    }

    .post-container #creation-date {
        font-size: 1.1rem;
        margin: 0;
        margin-left: 5px;
        flex: 1;
        text-align: start;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .post-container #content {
        display: -webkit-box;
        overflow: hidden;
        max-width: 100%;
        -webkit-line-clamp: 10;
        -webkit-box-orient: vertical;
        margin: 0;
        margin-right: 5px;
        margin-left: 5px;
        font-size: 1.4rem;
        color: var(--profile_info_color);
        white-space: pre-wrap;
        text-align: start;
    }

    .post-container #attachment {
        width: min-content;
        max-width: 100%;
        max-height: 364px;
        border-radius: 10px;
        margin-top: 10px;
        align-self: center;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    @media screen and (max-width: 700px) {
        .post-container {
            width: 450px;
        }

        .preview {
            min-width: 100%;
            max-width: 100%;
            width: 100%;
        }

        .author-container #author {
            font-size: 1.3rem;
        }

        .author-container #author:hover {
            cursor: default;
        }

        .author-container #author span {
            font-size: 1.1rem;
        }

        .author-container #avatar {
            width: 40px;
            height: 40px;
        }

        .post-container #content {
            font-size: 1.1rem;
            -webkit-line-clamp: 3;
        }

        .post-container #attachment {
            max-height: 250px;
        }

        .post-container #creation-date {
            font-size: 0.9rem;
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
