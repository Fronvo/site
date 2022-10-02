<script lang="ts">
    import { joinedCommunity, ourProfileData } from 'stores/app/communities';
    import { ModalTypes } from 'types/app/main';
    import { dismissDropdown, showModal } from 'utilities/app/main';

    let pendingRequests: number;

    if (isOwner()) {
        pendingRequests =
            $joinedCommunity.members.length -
            $joinedCommunity.acceptedChatRequests.length;
    }

    function isOwner(): boolean {
        return $joinedCommunity.ownerId == $ourProfileData.profileId;
    }

    function editCommmunity(): void {
        dismissDropdown();

        showModal(ModalTypes.EditCommunity);
    }

    function viewMembers(): void {
        dismissDropdown();

        showModal(ModalTypes.CommunityMembers);
    }

    function leaveCommunity(): void {
        dismissDropdown();

        showModal(ModalTypes.LeaveCommunity);
    }
</script>

<div class="options-dropdown">
    <!-- Custom owner options -->
    {#if isOwner()}
        <button on:click={editCommmunity}>Edit</button>
    {/if}

    <button on:click={viewMembers}
        >Members {isOwner() && pendingRequests > 0
            ? `(${pendingRequests})`
            : ''}</button
    >

    <button on:click={leaveCommunity}>{isOwner() ? 'Delete' : 'Leave'}</button>
</div>

<style>
    .options-dropdown {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .options-dropdown button {
        font-size: 1.4rem;
        margin-bottom: 10px;
        width: max-content;
    }

    .options-dropdown button:nth-last-child(1) {
        margin-bottom: 0;
    }

    @media screen and (max-width: 720px) {
        .options-dropdown button {
            font-size: 1.2rem;
            cursor: default;
        }
    }

    @media screen and (max-width: 520px) {
        .options-dropdown button {
            font-size: 1rem;
        }
    }
</style>
