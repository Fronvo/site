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
        d="M23 36.6h2.2V26.55l4.35 4.35 1.55-1.55-7.05-6.95L17 29.45 18.55 31 23 26.55Zm-11.05 6.25q-1.15 0-1.975-.825-.825-.825-.825-1.975V7.95q0-1.15.825-1.975.825-.825 1.975-.825h17.3l9.6 9.6v25.3q0 1.15-.825 1.975-.825.825-1.975.825Zm16.2-27.1h8.5l-8.5-8.4Z"
    /></svg
>
