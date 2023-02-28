<script lang="ts">
    import {
        targetMemberDropdown,
        type DropdownActions,
    } from 'stores/dropdowns';
    import { cachedAccountData, socket } from 'stores/main';
    import { dismissModal, setProgressBar } from 'utilities/main';
    import { loadTargetProfile } from 'utilities/profile';
    import DropdownTemplate from '../DropdownTemplate.svelte';

    function viewProfile(): void {
        loadTargetProfile($targetMemberDropdown.profileId, $cachedAccountData);

        dismissModal();
    }

    function unbanMember(): void {
        setProgressBar(true);

        socket.emit(
            'unbanMember',
            { profileId: $targetMemberDropdown.profileId },
            () => {
                dismissModal();
                setProgressBar(false);
            }
        );
    }

    const actions: DropdownActions[] = [
        {
            title: 'View profile',
            callback: viewProfile,
            useHr: true,
        },
        {
            title: 'Unban',
            callback: unbanMember,
        },
    ];
</script>

<DropdownTemplate {actions} />
