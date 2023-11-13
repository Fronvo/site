<script lang="ts">
    import { ModalTypes } from 'stores/modals';
    import { showModal } from 'utilities/main';

    function editProfile(): void {
        showModal(ModalTypes.EditProfile);
    }
</script>

<span>
    <svg
        on:click={editProfile}
        on:keydown={editProfile}
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
        ><path
            d="m11.4 18.161l7.396-7.396a10.289 10.289 0 0 1-3.326-2.234a10.29 10.29 0 0 1-2.235-3.327L5.839 12.6c-.577.577-.866.866-1.114 1.184a6.556 6.556 0 0 0-.749 1.211c-.173.364-.302.752-.56 1.526l-1.362 4.083a1.06 1.06 0 0 0 1.342 1.342l4.083-1.362c.775-.258 1.162-.387 1.526-.56c.43-.205.836-.456 1.211-.749c.318-.248.607-.537 1.184-1.114Zm9.448-9.448a3.932 3.932 0 0 0-5.561-5.561l-.887.887l.038.111a8.754 8.754 0 0 0 2.092 3.32a8.754 8.754 0 0 0 3.431 2.13l.887-.887Z"
        /></svg
    >
</span>

<style>
    span {
        display: flex;
        align-items: start;
        justify-content: end;
        width: 100%;
        height: 100px;
        transition: 150ms;
        background: rgb(0, 0, 0);
    }

    svg {
        fill: white;
        background: var(--pro);
        border-top-right-radius: 10px;
        border-bottom-left-radius: 10px;
        padding: 5px;
    }
</style>
