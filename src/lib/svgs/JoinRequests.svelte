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
    on:click={() => showModal(ModalTypes.JoinRequests)}
    ><path
        class="svg"
        d="M6.6 42q-1.2 0-2.1-.9-.9-.9-.9-2.1V9q0-1.2.9-2.1.9-.9 2.1-.9h34.8q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm3.4-8h10v-4H10Zm19.1-4 9.9-9.9-2.85-2.85-7.05 7.1-2.85-2.85-2.8 2.85ZM10 26h10v-4H10Zm0-8h10v-4H10Z"
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
