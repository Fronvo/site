<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';
    import LargeBanner from '../profile/large/LargeBanner.svelte';
    import LargeAvatar from '../profile/large/LargeAvatar.svelte';
    import LargeIdentifier from '../profile/large/LargeIdentifier.svelte';
    import LargeBio from '../profile/large/LargeBio.svelte';
    import LargeSince from '../profile/large/LargeSince.svelte';
    import { ourData } from 'stores/profile';
    import { isMobile } from 'stores/main';
    import LargeConnections from '../profile/large/LargeConnections.svelte';

    export let profileData: FronvoAccount;
</script>

<div class={`profile-container ${$isMobile ? 'mobile' : ''}`}>
    <LargeBanner />
    <LargeAvatar
        avatar={profileData?.avatar}
        online={profileData.online}
        isSelf={$ourData.profileId == profileData.profileId}
        isFriend={$ourData.friends.includes(profileData.profileId)}
    />

    <div class="secondary-container">
        <LargeIdentifier
            profileId={profileData?.profileId}
            username={profileData?.username}
            status={profileData?.status}
        />

        {#if profileData?.bio}
            <span class="seperator" />

            <LargeBio bio={profileData?.bio} />
        {/if}

        <span class="seperator" />

        <LargeSince since={profileData?.creationDate} />

        {#if profileData.hasSpotify}
            <span class="seperator" />

            <LargeConnections
                spotify={{
                    hasSpotify: profileData.hasSpotify,
                    spotifyName: profileData.spotifyName,
                    spotifyUrl: profileData.spotifyURL,
                }}
            />
        {/if}
    </div>
</div>

<style>
    .profile-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--primary);
        backdrop-filter: blur(10px);
    }

    .secondary-container {
        width: 95%;
        display: flex;
        flex-direction: column;
        transform: translateY(-60px);
        background: rgb(100, 100, 100, 0.1);
        border-radius: 10px;
        padding-top: 10px;
        padding-bottom: 20px;
    }

    .seperator {
        margin: auto;
        width: 100%;
        height: 2px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    @media screen and (max-width: 850px) {
        .mobile .secondary-container {
            transform: translateY(-40px);
        }
    }
</style>
