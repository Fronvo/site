<script lang="ts">
    import type { DropdownActions } from 'stores/dropdowns';
    import { socket } from 'stores/main';
    import { targetRequestModal } from 'stores/modals';
    import { dismissModal, setProgressBar } from 'utilities/main';
    import DropdownTemplate from '../DropdownTemplate.svelte';

    function acceptJoinRequest(): void {
        setProgressBar(true);

        socket.emit(
            'acceptJoinRequest',
            {
                email: $targetRequestModal,
            },
            () => {
                dismissModal();
                setProgressBar(false);
            }
        );
    }

    function rejectJoinRequest(): void {
        setProgressBar(true);

        socket.emit(
            'rejectJoinRequest',
            {
                email: $targetRequestModal,
            },
            () => {
                dismissModal();
                setProgressBar(false);
            }
        );
    }
    const actions: DropdownActions[] = [
        {
            title: 'Accept request',
            callback: acceptJoinRequest,
            useHr: true,
        },
        {
            title: 'Reject request',
            callback: rejectJoinRequest,
        },
    ];
</script>

<DropdownTemplate {actions} />
