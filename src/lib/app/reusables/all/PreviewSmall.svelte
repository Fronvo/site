<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';
    import SmallSince from '../profile/small/SmallSince.svelte';
    import SmallAvatar from '../profile/small/SmallAvatar.svelte';
    import SmallBanner from '../profile/small/SmallBanner.svelte';
    import SmallIdentifier from '../profile/small/SmallIdentifier.svelte';
    import SmallBio from '../profile/small/SmallBio.svelte';

    export let profileData: FronvoAccount;
</script>

<div class="profile-container">
    <SmallBanner />
    <SmallAvatar
        profileId={profileData.profileId}
        avatar={profileData?.avatar}
    />

    <div class="secondary-container">
        <SmallIdentifier
            profileId={profileData?.profileId}
            username={profileData?.username}
            status={profileData?.status}
        />

        {#if profileData?.bio}
            <span class="seperator" />

            <SmallBio bio={profileData?.bio} />
        {/if}

        <span class="seperator" />

        <SmallSince since={profileData?.creationDate} />
    </div>
</div>

<style>
    .profile-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .secondary-container {
        width: 95%;
        display: flex;
        flex-direction: column;
        transform: translateY(-30px);
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius: 10px;
        background: var(--primary);
    }

    .seperator {
        margin: auto;
        width: 100%;
        height: 2px;
        margin-top: 20px;
        margin-bottom: 20px;
        background: var(--primary);
    }
</style>
