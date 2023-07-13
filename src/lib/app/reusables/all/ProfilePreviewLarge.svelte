<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';
    import ProfileBanner from '../profile/ProfileBanner.svelte';
    import ProfileAvatar from '../profile/ProfileAvatar.svelte';
    import ProfileIdentifier from '../profile/ProfileIdentifier.svelte';
    import ProfileBio from '../profile/ProfileBio.svelte';
    import ProfilePosts from '../profile/ProfilePosts.svelte';
    import { ourData } from 'stores/profile';

    export let profileData: FronvoAccount;

    let accessible =
        profileData.isSelf || $ourData.friends.includes(profileData.profileId);

    export let editable = false;
    export let preview = false;
</script>

<div class={`profile-container ${preview ? 'preview' : ''}`}>
    <ProfileBanner {preview} {editable} banner={profileData.banner} />
    <ProfileAvatar {preview} {editable} avatar={profileData.avatar} />

    <div class={`secondary-container ${preview ? 'preview' : ''}`}>
        <ProfileIdentifier
            {editable}
            profileId={profileData.profileId}
            username={profileData.username}
            status={profileData.status}
        />
        <ProfileBio {editable} bio={profileData.bio} />

        {#if !preview && accessible}
            <ProfilePosts data={profileData} small />
        {/if}
    </div>
</div>

<style>
    .profile-container {
        width: 100%;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        align-items: start;
    }

    .preview {
        height: 88vh;
    }

    .secondary-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        transform: translateY(-45px);
    }
</style>
