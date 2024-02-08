<script lang="ts">
    import ModalTemplate from '../ModalTemplate.svelte';
    import { dismissModal, setTitle } from 'utilities/main';
    import { ourData } from 'stores/profile';
    import { socket } from 'stores/main';
    import { writable } from 'svelte/store';
    import PreviewEditable from '$lib/app/reusables/all/PreviewEditable.svelte';
    import type { ModalData } from 'stores/modals';
    import { activeDashboardTab } from 'stores/dashboard';
    import { DashboardOptions } from 'types/all';

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

        if ($ourData.username != $username && $username.trim().length > 0) {
            updatedData['username'] = $username.trim();
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

            $ourData = {
                ...$ourData,
                ...updatedData,
            };

            if ($activeDashboardTab == DashboardOptions.Profile) {
                setTitle($ourData.username);
            }

            dismissModal();
        });
    }

    const data: ModalData = {
        noDecoration: true,
        transparent: false,
    };
</script>

<ModalTemplate {data}>
    <PreviewEditable updateCallback={uploadData} {avatar} {username} {bio} />
</ModalTemplate>
