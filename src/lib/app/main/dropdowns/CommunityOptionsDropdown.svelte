<script lang="ts">
    import { joinedCommunity } from 'stores/communities';
    import { ourProfileData } from 'stores/profile';
    import { ModalTypes, type DropdownActions } from 'types/main';
    import { showModal } from 'utilities/main';
    import DropdownTemplate from '../DropdownTemplate.svelte';

    let pendingRequests: number;

    if (isOwner() && $joinedCommunity.chatRequestsEnabled) {
        pendingRequests =
            $joinedCommunity.members.length -
            $joinedCommunity.acceptedChatRequests.length;
    }

    function isOwner(): boolean {
        return $joinedCommunity.ownerId == $ourProfileData.profileId;
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
        },
        {
            title: `Members ${
                isOwner() && pendingRequests > 0 ? `(${pendingRequests})` : ''
            }`,
            callback: viewMembers,
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
