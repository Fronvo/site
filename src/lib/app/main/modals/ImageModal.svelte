<script lang="ts">
    import {
        targetImageModal,
        type ModalData,
        ModalTypes,
    } from 'stores/modals';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { dismissModal, showModal } from 'utilities/main';
    import { ourData } from 'stores/profile';

    const data: ModalData = {
        actions: [
            {
                title: 'Improve quality',
                callback: () => showModal(ModalTypes.GoPRO),
                pro: true,
                condition: !$ourData.isPRO,
            },
            {
                title: 'Open in new tab',
                callback: () => window.open($targetImageModal, '_blank'),
                primary: true,
            },
            {
                title: 'Dismiss',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    <img src={$targetImageModal} draggable={false} alt={'Image'} />
</ModalTemplate>

<style>
    img {
        max-height: 85vh;
    }
</style>
