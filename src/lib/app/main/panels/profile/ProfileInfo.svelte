<script lang="ts">
    import { dataSaver, guestMode } from 'stores/main';
    import {
        ourData,
        searchData,
        searchPosts,
        pendingSearchId,
    } from 'stores/profile';
    import { onDestroy, onMount } from 'svelte';
    import { sineInOut } from 'svelte/easing';
    import type { Unsubscriber } from 'svelte/store';
    import { fade } from 'svelte/transition';
    import ProfileBio from '$lib/app/reusables/profile/ProfileBio.svelte';
    import ProfileTop from '$lib/app/reusables/profile/ProfileTop.svelte';
    import ProfileFollowInfo from '$lib/app/reusables/profile/ProfileFollowInfo.svelte';
    import { setTitle } from 'utilities/main';
    import ProfilePosts from '$lib/app/reusables/profile/ProfilePosts.svelte';
    import ProfileIdentifier from '$lib/app/reusables/profile/ProfileIdentifier.svelte';

    let unsubscribe: Unsubscriber;
    let unsubscribe2: Unsubscriber;

    function setBanner(): void {
        function setIcon(
            target: HTMLDivElement,
            preventDefault?: boolean
        ): void {
            if (!target || (preventDefault && !$searchData.banner)) return;

            target.style.background = `url(${
                $searchData.banner && !$dataSaver
                    ? $searchData.banner
                    : '/svgs/profile/banner.svg'
            })`;

            target.style.backgroundPositionX = 'center';
            target.style.backgroundPositionY = 'center';
            target.style.backgroundSize = 'cover';
            target.style.backgroundRepeat = 'no-repeat';
            target.style.backgroundClip = 'padding-box';
        }

        setTimeout(() => {
            setIcon(
                document.getElementsByClassName(
                    'top-container'
                )[0] as HTMLDivElement
            );

            setIcon(
                document.getElementsByClassName(
                    'ambient-bg'
                )[0] as HTMLDivElement,
                true
            );
        }, 0);
    }

    onMount(() => {
        unsubscribe = searchPosts.subscribe((val) => {
            if (!val) return;

            setBanner();

            // Shadofer 🎯 (shadofer) - Fronvo
            setTitle(
                `${$searchData.username} (${$searchData.profileId}) - Fronvo`
            );
        });

        unsubscribe2 = dataSaver.subscribe((state) => {
            if (typeof state != 'boolean') return;

            setBanner();
        });
    });

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
        if (unsubscribe2) unsubscribe2();

        $pendingSearchId = undefined;
    });
</script>

{#if !$dataSaver && $searchData?.banner}
    <div class="ambient-bg" in:fade={{ duration: 200, easing: sineInOut }} />
{/if}

<div class="info-container" in:fade={{ duration: 500 }}>
    {#if ($ourData || $guestMode) && $searchData && $searchPosts}
        <ProfileTop avatar={$searchData.avatar} />

        <ProfileIdentifier data={$searchData} ourData={$ourData} />

        <ProfileBio bio={$searchData.bio} />

        <ProfileFollowInfo
            accessible={$searchData.isSelf ||
                !$searchData.isPrivate ||
                (!$guestMode ? $searchData.isFollower : false)}
            followers={$searchData.followers}
            following={$searchData.following}
        />
    {/if}
</div>

{#if $searchData}
    <ProfilePosts data={$searchData} posts={$searchPosts} />
{/if}

<style>
    .ambient-bg {
        position: fixed;
        top: 0;
        width: 100vw;
        height: 100vh;
        z-index: -100;
        filter: blur(30px) opacity(20%);
        overflow: hidden;
    }

    .info-container {
        display: flex;
        flex-direction: column;
        width: 35vw;
        min-width: 600px;
        justify-content: start;
    }

    @media screen and (max-width: 850px) {
        .info-container {
            min-width: 100%;
            width: 100%;
        }
    }
</style>
