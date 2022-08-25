<script lang="ts">
    import { goto } from '$app/navigation';
    import ProfileInfo from '$lib/app/main/panels/profile/ProfileInfo.svelte';
    import ProfilePosts from '$lib/app/main/panels/profile/ProfilePosts.svelte';
    import {
        profileLoadingFinished,
        targetProfile,
        userData,
        userPosts,
    } from 'stores/app/profile';
    import { onDestroy, onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { fetchUser } from 'utilities/app/main';
    import { loadProfilePosts } from 'utilities/app/profile';

    goto(`/profile/${$targetProfile ? $targetProfile : ''}`, {
        replaceState: true,
    });

    onMount(async () => {
        fetchUser($targetProfile)
            .then(async (profileData) => {
                if (!$targetProfile) {
                    goto(`/profile/${profileData.profileId}`, {
                        replaceState: true,
                    });
                }

                $userData = profileData;

                const isAccessible =
                    profileData.isFollower ||
                    profileData.isSelf ||
                    !profileData.isPrivate;

                if (isAccessible) {
                    await loadProfilePosts(profileData.profileId);
                } else {
                    $userPosts = [];
                }
            })
            .catch(() => {
                $targetProfile = undefined;

                goto('/home', {
                    replaceState: true,
                });
            });
    });

    // Reset active profile
    onDestroy(() => {
        $targetProfile = undefined;
        $userData = undefined;
        $userPosts = undefined;
        $profileLoadingFinished = false;
    });
</script>

<div class="profile-container" in:fade={{ duration: 300, delay: 200 }}>
    <!-- Hot updates in dev -->
    {#if $userData && $userPosts}
        <ProfileInfo />

        <hr in:fade={{ duration: 250, delay: 600 }} />

        <ProfilePosts />
    {/if}
</div>

<style>
    .profile-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: 100px;
        margin-right: 100px;
        margin-top: 10px;
    }

    hr {
        width: 300px;
        margin-top: 20px;
    }

    @media screen and (max-width: 720px) {
        .profile-container {
            margin-left: 0;
            margin-right: 0;
            margin-bottom: 90px;
        }

        hr {
            width: 250px;
            margin-top: 15px;
        }
    }

    @media screen and (max-width: 520px) {
        .profile-container {
            margin-bottom: 70px;
        }

        hr {
            width: 200px;
        }
    }
</style>
