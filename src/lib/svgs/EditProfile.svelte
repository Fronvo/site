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
    on:click={() => showModal(ModalTypes.EditProfile)}
    ><path
        class="svg"
        d="M4.1 47.85v-4.4h39.8v4.4Zm5-10.3V32.2l18.25-18.15 5.3 5.35-18.1 18.15Zm25.5-20.2-5.35-5.3L32.6 8.7q.5-.6 1.225-.625.725-.025 1.375.625l2.6 2.6q.6.6.6 1.35 0 .75-.5 1.35Z"
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
