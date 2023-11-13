<script lang="ts">
    import ModalTemplate from '../ModalTemplate.svelte';
    import {
        dismissModal,
        fetchUser,
        getSavedAccounts,
        updateCachedAccount,
        updateSavedAccount,
    } from 'utilities/main';
    import { ourData } from 'stores/profile';
    import { cachedAccountData, currentToken, socket } from 'stores/main';
    import { writable } from 'svelte/store';
    import PreviewEditable from '$lib/app/reusables/all/PreviewEditable.svelte';
    import type { ModalData } from 'stores/modals';

    const profileData = $ourData;

    let profileId = writable(profileData.profileId);
    let username = writable(profileData.username);
    let bio = writable(profileData.bio);
    let avatar = writable(profileData.avatar);
    let banner = writable(profileData.banner);

    function uploadData(): void {
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

            dismissModal();
        });
    }

    const data: ModalData = {
        actions: [
            {
                title: 'Save changes',
                callback: uploadData,
                primary: true,
            },
            {
                title: 'Cancel',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    <PreviewEditable {avatar} {username} {bio} />
</ModalTemplate>
