<script lang="ts">
    import type { HomePost } from 'interfaces/all';
    import type { AccountPost, FronvoAccount } from 'interfaces/all';
    import {
        dismissDropdown,
        dismissModal,
        showDropdown,
    } from 'utilities/main';
    import Time from 'svelte-time';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { ourData } from 'stores/profile';
    import { loadTargetProfile } from 'utilities/profile';
    import {
        postModalForHome,
        postModalInfo,
        type ModalData,
    } from 'stores/modals';
    import {
        dropdownImage,
        DropdownTypes,
        dropdownVisible,
    } from 'stores/dropdowns';
    import { cachedAccountData, dataSaver } from 'stores/main';
    import { currentPanelId, PanelTypes } from 'stores/panels';

    function getPostData(): AccountPost {
        if ($postModalForHome) {
            return ($postModalInfo as HomePost).post;
        }
        return $postModalInfo as AccountPost;
    }

    function getPostProfile(): FronvoAccount {
        if ($postModalForHome) {
            return ($postModalInfo as HomePost).profileData;
        }

        return $ourData;
    }

    function showImageDropdown(targetImage: string): void {
        if ($dropdownVisible) {
            dismissDropdown();
            return;
        }

        $dropdownImage = targetImage;

        showDropdown(DropdownTypes.Image);
    }

    const data: ModalData = {
        titlePreSpan: getPostProfile().username,
        titleIcon: getPostProfile().avatar || '/svgs/profile/avatar.svg',
        titleListener: () =>
            loadTargetProfile(getPostProfile().profileId, $cachedAccountData),
        titleListenerCondition: () => {
            // Only visit if not in profile panel, profile posts ARE IN THE SAME PROFILE
            return $currentPanelId != PanelTypes.Profile;
        },
        title: '',
        titleDropdown: DropdownTypes.PostOptions,
        titleDropdownCondition: () => {
            // Only show post options if in the Profile Panel
            return (
                $currentPanelId == PanelTypes.Profile &&
                $currentPanelId == PanelTypes.Profile
            );
        },

        actions: [
            {
                title: 'Close',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    <h1 id="content" class={getPostData().postId}>
        {getPostData().content}
    </h1>

    {#if getPostData().attachment && !$dataSaver}
        <img
            id="attachment"
            src={getPostData().attachment}
            alt={'Post attachment'}
            draggable={false}
            on:contextmenu={() => showImageDropdown(getPostData().attachment)}
        />
    {/if}

    <h1 id="creation-date">
        <!-- Updates every 15 seconds -->
        <Time
            format={'dddd HH:mm · MMMM D YYYY'}
            live={15000}
            timestamp={getPostData().creationDate}
        />
    </h1>
</ModalTemplate>

<style>
    #content {
        margin: 0;
        font-size: 1.7rem;
        color: var(--profile_info_color);
        white-space: pre-wrap;
        text-align: center;
        margin-left: 20px;
        margin-right: 20px;
    }

    #attachment {
        max-width: 1024px;
        max-height: 1024px;
        border-radius: 10px;
        margin-top: 10px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    #creation-date {
        font-size: 1.2rem;
        margin: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    @media screen and (max-width: 850px) {
        #content {
            font-size: 1.3rem;
        }

        #attachment {
            max-width: 100%;
        }

        #creation-date {
            font-size: 1rem;
        }
    }
</style>
