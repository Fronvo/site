<script lang="ts">
    import ModalTemplate from '../ModalTemplate.svelte';
    import ProfileAvatar from '$lib/app/reusables/profile/ProfileAvatar.svelte';
    import ProfileBanner from '$lib/app/reusables/profile/ProfileBanner.svelte';
    import ProfileIdentifier from '$lib/app/reusables/profile/ProfileIdentifier.svelte';
    import ProfileBio from '$lib/app/reusables/profile/ProfileBio.svelte';
    import {
        dismissModal,
        fetchUser,
        getSavedAccounts,
        setProgressBar,
        updateCachedAccount,
        updateSavedAccount,
    } from 'utilities/main';
    import { ourData } from 'stores/profile';
    import { cachedAccountData, currentToken, socket } from 'stores/main';
    import { writable } from 'svelte/store';
    import type { ModalData } from 'stores/modals';
    import ModalTemplatePro from '../ModalTemplatePRO.svelte';

    const profileData = $ourData;

    let profileId = writable(profileData.profileId);
    let username = writable(profileData.username);
    let bio = writable(profileData.bio);
    let avatar = writable(profileData.avatar);
    let banner = writable(profileData.banner);

    function uploadData(): void {
        setProgressBar(true);

        const updatedData = {};

        if ($ourData.profileId != $profileId) {
            updatedData['profileId'] = $profileId;
        }

        if ($ourData.username != $username) {
            updatedData['username'] = $username;
        }

        if ($ourData.bio != $bio) {
            updatedData['bio'] = $bio;
        }

        if ($ourData.avatar != $avatar) {
            updatedData['avatar'] = $avatar;
        }

        if ($ourData.banner != $banner) {
            updatedData['banner'] = banner;
        }

        socket.emit('updateProfileData', updatedData, async ({ err }) => {
            if (err) {
                setProgressBar(false);

                return;
            }

            $ourData = await fetchUser();
            await updateCachedAccount(
                $ourData.profileId,
                $cachedAccountData,
                $ourData
            );

            // Update saved account, if any
            if (getSavedAccounts().length > 0) {
                updateSavedAccount($avatar, $username, $currentToken);
            }

            setProgressBar(false);

            dismissModal();
        });
    }

    const data: ModalData = {
        title: '',
        actions: [
            {
                title: 'Update',
                callback: uploadData,
                primary: !$ourData.isPRO,
                pro: $ourData.isPRO,
            },
            {
                title: 'Close',
                callback: dismissModal,
            },
        ],
    };
</script>

{#if $ourData.isPRO}
    <ModalTemplatePro {data}>
        <div class="profile-container">
            <ProfileBanner editable={true} bind:banner={$banner} />
            <ProfileAvatar editable={true} bind:avatar={$avatar} />

            <div class="secondary-container">
                <ProfileIdentifier
                    editable={true}
                    bind:profileId={$profileId}
                    bind:username={$username}
                />
                <ProfileBio bind:bio={$bio} />
            </div>
        </div>
    </ModalTemplatePro>
{:else}
    <ModalTemplate {data}>
        <div class="profile-container">
            <ProfileBanner editable={true} bind:banner={$banner} />
            <ProfileAvatar editable={true} bind:avatar={$avatar} />

            <div class="secondary-container">
                <ProfileIdentifier
                    editable={true}
                    bind:profileId={$profileId}
                    bind:username={$username}
                />
                <ProfileBio bind:bio={$bio} />
            </div>
        </div>
    </ModalTemplate>
{/if}

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
        transform: translateY(-65px);
    }
</style>
