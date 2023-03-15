<script lang="ts">
    import { shiftHeld } from 'stores/actions';

    export let callback = () => {};
</script>

<svg
    version="1.2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="48"
    height="48"
    on:click={callback}
    ><path
        class={`svg ${$shiftHeld ? 'warn' : ''}`}
        d="M13.95 40.85q-1.1 0-1.95-.85-.85-.85-.85-1.95v-27.1h-2v-2.2h8.45V7.4h12.85v1.35h8.45v2.2h-2.05v27.1q0 1.1-.825 1.95-.825.85-1.975.85Zm5.2-6.4h2.2V15.1h-2.2Zm7.55 0h2.2V15.1h-2.2Z"
    /></svg
>

<style>
    svg {
        width: 34px;
        height: 34px;
        margin-right: 5px;
    }

    @media screen and (max-width: 850px) {
        svg {
            width: 30px;
            height: 30px;
        }
    }
</style>
