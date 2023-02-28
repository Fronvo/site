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
        d="M17.65 28.55h18.2l-5.75-7.7-5.15 6.6-3.35-4.1Zm-3.8 7.9q-1.15 0-1.975-.825-.825-.825-.825-1.975V7.95q0-1.1.825-1.95.825-.85 1.975-.85h25.7q1.1 0 1.95.85.85.85.85 1.95v25.7q0 1.15-.85 1.975-.85.825-1.95.825Zm-5.4 5.4q-1.1 0-1.95-.85-.85-.85-.85-1.95v-27.9h2.2v27.9q0 .2.2.4t.4.2h27.9v2.2Z"
    /></svg
>
