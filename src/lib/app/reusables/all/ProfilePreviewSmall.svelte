<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';
    import ProfileBanner from '../profile/ProfileBanner.svelte';
    import ProfileAvatar from '../profile/ProfileAvatar.svelte';
    import ProfileIdentifier from '../profile/ProfileIdentifier.svelte';
    import ProfileBio from '../profile/ProfileBio.svelte';

    export let profileData: FronvoAccount;
    export let editable = false;
</script>

<div class="profile-container">
    <ProfileBanner mini {editable} banner={profileData.banner} />
    <ProfileAvatar
        mini
        {editable}
        avatar={profileData.avatar}
        isPRO={profileData.isPRO}
    />

    <div class="secondary-container">
        <ProfileIdentifier
            mini
            {editable}
            profileId={profileData.profileId}
            username={profileData.username}
        />
        <ProfileBio mini {editable} bio={profileData.bio} />
    </div>
</div>

<style>
    .profile-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: start;
    }

    .secondary-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        transform: translateY(-45px);
    }
</style>
