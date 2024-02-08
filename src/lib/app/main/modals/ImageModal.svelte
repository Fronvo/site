<script lang="ts">
    import { targetImageModal, type ModalData } from 'stores/modals';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { showDropdownMouse } from 'utilities/main';
    import { DropdownTypes } from 'stores/dropdowns';
    import { mousePos } from 'stores/main';

    function showOptions(): void {
        showDropdownMouse(DropdownTypes.Image, $mousePos);
    }

    const data: ModalData = { transparent: true, noDecoration: true };
</script>

<ModalTemplate {data}>
    <img
        on:contextmenu={(ev) => {
            showOptions();

            ev.preventDefault();
        }}
        src={$targetImageModal}
        draggable={false}
        alt={'Image'}
    />
</ModalTemplate>

<style>
    img {
        max-width: calc(100vw);
        max-height: calc(80vh);
        overflow: hidden;
        border-radius: 10px;
    }
</style>
