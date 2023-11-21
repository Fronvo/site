<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';
    import LargeBanner from '../profile/large/LargeBanner.svelte';
    import LargeAvatar from '../profile/large/LargeAvatar.svelte';
    import LargeIdentifier from '../profile/large/LargeIdentifier.svelte';
    import LargeBio from '../profile/large/LargeBio.svelte';
    import LargeSince from '../profile/large/LargeSince.svelte';

    export let profileData: FronvoAccount;
</script>

<div class="profile-container">
    <LargeBanner />
    <LargeAvatar avatar={profileData?.avatar} />

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
        transform: translateY(-60px);
        background: var(--bg);
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
        background: var(--primary);
    }
</style>
