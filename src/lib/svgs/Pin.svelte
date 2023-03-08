<script lang="ts">
    import { ModalTypes } from 'stores/modals';
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
        d="m30.7 25.6 3.75 3.45v2.2H25.1v10.9l-1.1 1.1-1.1-1.1v-10.9h-9.35v-2.2l3.55-3.45V9.3h-2.35V7.1h18.3v2.2H30.7Z"
    /></svg
>

<style>
    svg {
        width: 34px;
        height: 34px;
        margin-right: 5px;
        margin-left: 5px;
    }

    @media screen and (max-width: 700px) {
        svg {
            width: 30px;
            height: 30px;
        }
    }
</style>
