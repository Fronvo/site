<script lang="ts">
    import { dismissModal, showModal } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { ModalTypes, type ModalData } from 'stores/modals';
    import InfoHeader from '$lib/app/reusables/all/InfoHeader.svelte';
    import { ourData } from 'stores/profile';

    const data: ModalData = {
        title: 'Max rooms reached',
        actions: [
            {
                title: 'Unlock more',
                callback: () => showModal(ModalTypes.GoPRO),
                condition: !$ourData.isPRO,
            },
            {
                title: 'Dismiss',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    <h1 class="modal-header">
        You have already created {$ourData.isPRO ? 20 : 5} rooms.
    </h1>

    <InfoHeader
        marginLeft={'50px'}
        text={'Try deleting some of your existing ones.'}
    />
</ModalTemplate>

<style>
    h1 {
        width: 78%;
        text-align: start;
    }
</style>
