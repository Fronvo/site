<script lang="ts">
    import type { DropdownActions } from 'stores/dropdowns';
    import { ModalTypes } from 'stores/modals';
    import { showModal } from 'utilities/main';
    import DropdownTemplate from '../DropdownTemplate.svelte';

    const actions: DropdownActions[] = [
        {
            title: 'Join requests',
            callback: () => showModal(ModalTypes.JoinRequests),
        },
    ];
</script>

<DropdownTemplate {actions} />
