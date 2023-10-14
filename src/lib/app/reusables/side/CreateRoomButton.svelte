<script lang="ts">
    import { ModalTypes } from 'stores/modals';
    import { showModal } from 'utilities/main';

    function createRoom(): void {
        showModal(ModalTypes.CreateRoom);
    }
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    ><g fill="none" stroke="var(--branding)" stroke-width="1.5"
        ><path
            d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z"
            opacity=".5"
        /><path stroke-linecap="round" d="M15 12h-3m0 0H9m3 0V9m0 3v3" /></g
    ></svg
>

<style>
    svg {
        width: 28px;
        height: 28px;
        margin-right: 10px;
    }
</style>
