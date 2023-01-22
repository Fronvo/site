<script lang="ts">
    import type { AccountPost } from 'interfaces/all';
    import { postModalInfo } from 'stores/main';
    import { ourProfileData } from 'stores/profile';
    import { ModalTypes, type DropdownActions } from 'types/main';
    import { showModal } from 'utilities/main';
    import DropdownTemplate from '../DropdownTemplate.svelte';

    function isOwner(): boolean {
        return (
            ($postModalInfo as AccountPost).author == $ourProfileData.profileId
        );
    }

    function deletePost(): void {
        showModal(ModalTypes.DeletePost);
    }

    const actions: DropdownActions[] = [
        {
            title: 'Delete',
            callback: deletePost,
            condition: isOwner(),
        },
    ];
</script>

<DropdownTemplate {actions} />
