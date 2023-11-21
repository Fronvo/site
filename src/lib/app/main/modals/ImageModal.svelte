<script lang="ts">
    import { targetImageModal, type ModalData } from 'stores/modals';
    import ModalTemplate from '../ModalTemplate.svelte';

    const data: ModalData = { transparent: true };
</script>

<ModalTemplate {data}>
    <img src={$targetImageModal} draggable={false} alt={'Image'} />
</ModalTemplate>

<style>
    img {
        margin: auto;
        height: 100%;
        max-height: 90vh;
        border-radius: 10px;
    }
</style>
