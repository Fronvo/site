<script lang="ts">
    import { dismissModal, showModal } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { ModalTypes, type ModalData } from 'stores/modals';
    import InfoHeader from '$lib/app/reusables/all/InfoHeader.svelte';
    import { ourData } from 'stores/profile';

    const data: ModalData = {
        title: 'Max friends reached',
        actions: [
            {
                title: 'Add more',
                callback: () => showModal(ModalTypes.GoPRO),
                pro: true,
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
        You already have over {$ourData.isPRO ? 100 : 15} friends.
    </h1>

    <InfoHeader
        marginLeft={'50px'}
        text={'Try removing some of your existing ones.'}
    />
</ModalTemplate>

<style>
    h1 {
        width: 78%;
        text-align: start;
    }
</style>
