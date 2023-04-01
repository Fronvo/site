<script lang="ts">
    import { communityData } from 'stores/community';
    import type { DropdownActions } from 'stores/dropdowns';
    import { ModalTypes } from 'stores/modals';
    import { ourData } from 'stores/profile';
    import { showModal } from 'utilities/main';
    import DropdownTemplate from '../DropdownTemplate.svelte';

    function isOwner(): boolean {
        return $communityData.ownerId == $ourData.profileId;
    }

    function editCommmunity(): void {
        showModal(ModalTypes.EditCommunity);
    }

    function viewMembers(): void {
        showModal(ModalTypes.CommunityMembers);
    }

    function leaveCommunity(): void {
        showModal(ModalTypes.LeaveCommunity);
    }

    function showBans(): void {
        showModal(ModalTypes.ShowBans);
    }

    const actions: DropdownActions[] = [
        {
            title: 'Edit',
            callback: editCommmunity,
            condition: isOwner(),
            useHr: document.body.clientWidth > 850,
        },
        {
            title: 'Members',
            callback: viewMembers,
            useHr: true,
            condition: document.body.clientWidth < 850,
        },
        {
            title: 'Bans',
            callback: showBans,
            condition: isOwner(),
        },
        {
            title: isOwner() ? 'Delete' : 'Leave',
            callback: leaveCommunity,
        },
    ];
</script>

<DropdownTemplate {actions} />
