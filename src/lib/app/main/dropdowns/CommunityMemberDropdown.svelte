<script lang="ts">
    import { socket } from 'stores/all';
    import { joinedCommunity } from 'stores/communities';
    import { cachedAccountData, targetCommunityMember } from 'stores/main';
    import { ourProfileData } from 'stores/profile';
    import type { DropdownActions } from 'types/main';
    import { fetchCommunity } from 'utilities/communities';
    import { dismissModal, setProgressBar } from 'utilities/main';
    import { loadProfilePanel } from 'utilities/profile';
    import DropdownTemplate from '../DropdownTemplate.svelte';

    async function viewProfile(): Promise<void> {
        dismissModal();

        await loadProfilePanel(
            $cachedAccountData,
            $targetCommunityMember.profileId
        );
    }

    function hasChatPerms(): boolean {
        return $joinedCommunity.acceptedChatRequests.includes(
            $targetCommunityMember.profileId
        );
    }

    function updateChatPerms(): void {
        setProgressBar(true);

        const newChatPermState = !hasChatPerms();

        socket.emit(
            'updateChatRequest',
            {
                profileId: $targetCommunityMember.profileId,
                accepted: newChatPermState,
            },
            async ({ err }) => {
                if (!err) {
                    $joinedCommunity = await fetchCommunity(
                        $joinedCommunity.communityId
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
            { profileId: $targetCommunityMember.profileId },
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
            { profileId: $targetCommunityMember.profileId },
            () => {
                dismissModal();
                setProgressBar(false);
            }
        );
    }

    function isOwner(): boolean {
        return $joinedCommunity.ownerId == $ourProfileData.profileId;
    }

    const actions: DropdownActions[] = [
        {
            title: 'View profile',
            callback: viewProfile,
        },
        {
            title: `${hasChatPerms() ? 'Revoke' : 'Give'} chat permission`,
            callback: updateChatPerms,
        },
        {
            title: 'Kick member',
            callback: kickMember,
            condition: isOwner(),
        },
        {
            title: 'Ban member',
            callback: banMember,
            condition: isOwner(),
        },
    ];
</script>

<DropdownTemplate {actions} />
