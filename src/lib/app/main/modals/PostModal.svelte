<script lang="ts">
    import type { HomePost } from 'interfaces/all';
    import type { AccountPost, FronvoAccount } from 'interfaces/all';
    import { dismissModal } from 'utilities/main';
    import {
        currentPanelId,
        postModalForHome,
        postModalInfo,
    } from 'stores/main';
    import { userData } from 'stores/profile';
    import Time from 'svelte-time';
    import { onMount } from 'svelte';
    import linkifyHtml from 'linkify-html';
    import { PanelTypes, type ModalData } from 'types/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { dataSaver } from 'stores/all';
    import { loadProfilePanel } from 'utilities/profile';

    function getPostData(): AccountPost {
        if ($postModalForHome) {
            return ($postModalInfo as HomePost).post;
        }
        return $postModalInfo as AccountPost;
    }

    function getUserData(): FronvoAccount {
        if ($postModalForHome) {
            return ($postModalInfo as HomePost).profileData;
        }
        return $userData;
    }

    function generateContentLinks(postId: string, content: string): void {
        setTimeout(() => {
            const targetElement = document.getElementsByClassName(postId)[0];

            if (!targetElement) return;

            targetElement.innerHTML = linkifyHtml(content, {
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

    onMount(() => {
        generateContentLinks(getPostData().postId, getPostData().content);
    });

    const data: ModalData = {
        titlePreSpan: getUserData().username,
        titleIcon: getUserData().avatar || '/svgs/profile/avatar.svg',
        titleListener: () =>
            $currentPanelId != PanelTypes.Profile &&
            loadProfilePanel(getUserData().profileId),
        title: '',

        actions: [
            {
                title: 'Close',
                callback: dismissModal,
            },
        ],

        removeTransparency: true,
        noSeperator: true,
    };
</script>

<ModalTemplate {data}>
    <h1 id="title">{getPostData().title}</h1>

    <h1 id="content" class={getPostData().postId}>
        {getPostData().content}
    </h1>

    {#if getPostData().attachment && !$dataSaver}
        <img
            id="attachment"
            src={getPostData().attachment}
            alt={`'${getPostData().title}' attachment`}
            draggable={false}
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
    #title {
        margin: 0;
        text-align: center;
        font-size: 2.4rem;
    }

    #content {
        margin: 0;
        font-size: 1.9rem;
        color: var(--profile_info_color);
        white-space: pre-wrap;
        text-align: center;
        margin-left: 20px;
        margin-right: 20px;
    }

    :global(#content .link) {
        text-decoration: none;
        color: var(--text_color);
    }

    :global(#content .link:hover::after) {
        background: var(--profile_info_color);
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
        font-size: 1.3rem;
        margin: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    @media screen and (max-width: 720px) {
        #title {
            font-size: 2.2rem;
        }

        #content {
            font-size: 1.7rem;
        }

        #attachment {
            max-width: 100%;
        }

        #creation-date {
            font-size: 1.2rem;
        }
    }

    @media screen and (max-width: 520px) {
        #title {
            font-size: 1.8rem;
        }

        #content {
            font-size: 1.4rem;
        }

        #creation-date {
            font-size: 1rem;
        }
    }
</style>
