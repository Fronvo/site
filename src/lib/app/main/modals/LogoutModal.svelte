<script lang="ts">
    import { dismissModal } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import type { ModalData } from 'stores/modals';
    import { removeKey } from 'utilities/global';
    import { socket } from 'stores/main';
    import InfoHeader from '$lib/app/reusables/all/InfoHeader.svelte';
    import ProfilePreviewLogout from '$lib/app/reusables/all/ProfilePreviewLogout.svelte';
    import { ourData } from 'stores/profile';
    import { resetLocalTheme } from 'utilities/themes';

    function logout(): void {
        removeKey('token');
        removeKey('savedAccounts');

        socket.emit('logout', () => {
            resetLocalTheme();

            location.href = '/app';
        });
    }

    const data: ModalData = {
        title: 'Logout from Fronvo',
        actions: [
            {
                title: 'Logout',
                callback: logout,
                danger: true,
            },
            {
                title: 'Cancel',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    <ProfilePreviewLogout profileData={$ourData} />

    <InfoHeader
        text={'This will also remove all other accounts added in this browser'}
    />
</ModalTemplate>
