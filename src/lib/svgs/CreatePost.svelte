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
        d="M22.9 33.4h2.2v-8.3h8.3v-2.2h-8.3v-8.3h-2.2v8.3h-8.3v2.2h8.3ZM9.95 40.85q-1.15 0-1.975-.825-.825-.825-.825-1.975V9.95q0-1.15.825-1.975Q8.8 7.15 9.95 7.15h28.1q1.15 0 1.975.825.825.825.825 1.975v28.1q0 1.15-.825 1.975-.825.825-1.975.825Z"
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
