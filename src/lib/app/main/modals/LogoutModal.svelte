<script lang="ts">
    import { dismissModal } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { modalLoading, type ModalData } from 'stores/modals';
    import { removeKey } from 'utilities/global';
    import { socket } from 'stores/main';
    import ProfilePreviewLogout from '$lib/app/reusables/all/PreviewLogout.svelte';
    import { ourData } from 'stores/profile';

    function logout(): void {
        $modalLoading = true;

        removeKey('token');
        removeKey('savedAccounts');

        socket.emit('logout', () => {
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
</ModalTemplate>
