<script lang="ts">
    import { targetImageModal, type ModalData } from 'stores/modals';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { dismissModal } from 'utilities/main';

    const data: ModalData = {
        actions: [
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
