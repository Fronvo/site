<script lang="ts">
    import { socket } from 'stores/all';
    import { targetCommunityMember } from 'stores/main';
    import type { DropdownActions } from 'types/main';
    import { dismissModal, setProgressBar } from 'utilities/main';
    import DropdownTemplate from '../DropdownTemplate.svelte';

    function unbanMember(): void {
        setProgressBar(true);

        socket.emit(
            'unbanMember',
            { profileId: $targetCommunityMember.profileId },
            () => {
                dismissModal();
                setProgressBar(false);
            }
        );
    }

    const actions: DropdownActions[] = [
        {
            title: 'Unban',
            callback: unbanMember,
        },
    ];
</script>

<DropdownTemplate {actions} />
