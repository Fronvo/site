<script lang="ts">
    import { communityData } from 'stores/community';
    import {
        targetMemberDropdown,
        type DropdownActions,
    } from 'stores/dropdowns';
    import { cachedAccountData, socket } from 'stores/main';
    import { ourData } from 'stores/profile';
    import { fetchCommunity } from 'utilities/communities';
    import { dismissModal, setProgressBar } from 'utilities/main';
    import { loadTargetProfile } from 'utilities/profile';
    import DropdownTemplate from '../DropdownTemplate.svelte';

    function viewProfile(): void {
        loadTargetProfile($targetMemberDropdown.profileId, $cachedAccountData);

        dismissModal();
    }

    function hasChatPerms(): boolean {
        return $communityData.acceptedChatRequests.includes(
            $targetMemberDropdown.profileId
        );
    }

    function updateChatPerms(): void {
        setProgressBar(true);

        const newChatPermState = !hasChatPerms();

        socket.emit(
            'updateChatRequest',
            {
                profileId: $targetMemberDropdown.profileId,
                accepted: newChatPermState,
            },
            async ({ err }) => {
                if (!err) {
                    $communityData = await fetchCommunity(
                        $communityData.communityId
                    );
                }

                dismissModal();
                setProgressBar(false);
            }
        );
    }

    function kickMember(): void {
        setProgressBar(true);

        socket.emit(
            'kickMember',
            { profileId: $targetMemberDropdown.profileId },
            () => {
                dismissModal();
                setProgressBar(false);
            }
        );
    }

    function banMember(): void {
        setProgressBar(true);

        socket.emit(
            'banMember',
            { profileId: $targetMemberDropdown.profileId },
            () => {
                dismissModal();
                setProgressBar(false);
            }
        );
    }

    function isOwner(): boolean {
        return $communityData.ownerId == $ourData.profileId;
    }

    function isSelf(): boolean {
        return $targetMemberDropdown.profileId == $ourData.profileId;
    }

    function isMember(): boolean {
        return $communityData.members.includes($targetMemberDropdown.profileId);
    }

    const actions: DropdownActions[] = [
        {
            title: 'View profile',
            callback: viewProfile,
            useHr: !isSelf() && isOwner() && isMember(),
        },
        {
            title: `${hasChatPerms() ? 'Revoke' : 'Give'} chat permission`,
            callback: updateChatPerms,
            condition:
                isMember() &&
                isOwner() &&
                !isSelf() &&
                $communityData.chatRequestsEnabled,
        },
        {
            title: 'Kick member',
            callback: kickMember,
            condition: isMember() && isOwner() && !isSelf(),
        },
        {
            title: 'Ban member',
            callback: banMember,
            condition: isMember() && isOwner() && !isSelf(),
        },
    ];
</script>

<DropdownTemplate {actions} />
