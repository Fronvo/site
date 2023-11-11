<script lang="ts">
    import ModalTemplate from '../ModalTemplate.svelte';
    import {
        targetProfileModal,
        type ModalData,
        ModalTypes,
    } from 'stores/modals';
    import { dismissModal, setProgressBar, showModal } from 'utilities/main';
    import { ourData } from 'stores/profile';
    import ProfilePreviewLarge from '$lib/app/reusables/all/ProfilePreviewLarge.svelte';
    import { socket } from 'stores/main';
    import ModalTemplatePro from '../ModalTemplatePRO.svelte';

    const profileData = $targetProfileModal;
    const isSelf = profileData.profileId == $ourData.profileId;

    function openEdit(): void {
        showModal(ModalTypes.EditProfile);
    }

    function addFriend(): void {
        setProgressBar(true);

        if ($ourData.friends.includes($targetProfileModal.profileId)) {
            removeFriend();
            return;
        }

        socket.emit(
            'addFriend',
            { profileId: $targetProfileModal.profileId },
            ({ err }) => {
                setProgressBar(false);
            }
        );
    }

    function removeFriend(): void {
        $targetProfileModal = profileData;

        showModal(ModalTypes.RemoveFriend);
    }

    const data: ModalData = {
        title: '',
        actions: [
            {
                title: isSelf
                    ? 'Edit profile'
                    : `${
                          $ourData.friends.includes(profileData.profileId)
                              ? 'Remove'
                              : 'Add'
                      } friend`,
                callback: isSelf ? openEdit : addFriend,
                primary: !$ourData.friends.includes(profileData.profileId),
                danger:
                    !isSelf && $ourData.friends.includes(profileData.profileId),
                pro: isSelf && $ourData.isPRO,
            },
            {
                title: 'Close',
                callback: dismissModal,
            },
        ],
    };
</script>

{#if $targetProfileModal.isPRO}
    <ModalTemplatePro {data}>
        <ProfilePreviewLarge {profileData} />
    </ModalTemplatePro>
{:else}
    <ModalTemplate {data}>
        <ProfilePreviewLarge {profileData} />
    </ModalTemplate>
{/if}
