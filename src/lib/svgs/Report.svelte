<script lang="ts">
    import { ModalTypes } from 'types/main';
    import { showModal } from 'utilities/main';
</script>

<svg
    version="1.2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="48"
    height="48"
    on:click={() => showModal(ModalTypes.CreatePost)}
    ><path
        class="svg"
        d="M11.1 41.4V9.15h15.4l.95 4.2H38.9v16.7H27.75l-.95-4.2H13.3V41.4Z"
    /></svg
>

<style>
    @media screen and (max-width: 520px) {
        svg {
            width: 36px;
            height: 36px;
        }
    }
</style>
