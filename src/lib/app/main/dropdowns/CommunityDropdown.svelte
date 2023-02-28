<script lang="ts">
    import type { DropdownActions } from 'stores/dropdowns';
    import { ModalTypes } from 'stores/modals';
    import { showModal } from 'utilities/main';
    import DropdownTemplate from '../DropdownTemplate.svelte';

    const actions: DropdownActions[] = [
        {
            title: 'Create community',
            callback: () => showModal(ModalTypes.CreateCommunity),
            useHr: true,
        },

        {
            title: 'Join community',
            callback: () => showModal(ModalTypes.JoinCommunity),
        },
    ];
</script>

<DropdownTemplate {actions} />
