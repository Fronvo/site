<script lang="ts">
    import { showModal } from 'utilities/main';
    import { ModalTypes } from 'stores/modals';
    import DropdownTemplateDarken from '../DropdownTemplateDarken.svelte';
    import { ourData } from 'stores/profile';

    function requestData(): void {
        showModal(ModalTypes.RequestData);
    }

    function refundTurbo(): void {
        showModal(ModalTypes.RefundTurbo);
    }

    function deleteAccount(): void {
        showModal(ModalTypes.DeleteAccount);
    }
</script>

<DropdownTemplateDarken>
    <button on:click={requestData}
        ><h1>Request data</h1>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            ><path
                fill-rule="evenodd"
                d="M3.25 6c0-1.542 1.23-2.736 2.758-3.5C7.58 1.716 9.7 1.25 12 1.25s4.42.465 5.992 1.25c1.528.764 2.758 1.958 2.758 3.5v12c0 1.542-1.23 2.735-2.758 3.5c-1.572.785-3.692 1.25-5.992 1.25s-4.42-.465-5.992-1.25C4.48 20.734 3.25 19.541 3.25 18V6Zm1.5 0c0-.667.56-1.474 1.929-2.158C8.002 3.181 9.882 2.75 12 2.75s3.998.43 5.321 1.092C18.69 4.526 19.25 5.332 19.25 6c0 .667-.56 1.474-1.929 2.158C15.998 8.819 14.118 9.25 12 9.25s-3.998-.43-5.321-1.092C5.31 7.474 4.75 6.668 4.75 6Zm0 12c0 .667.56 1.474 1.929 2.158c1.323.661 3.203 1.092 5.321 1.092s3.998-.43 5.321-1.092c1.368-.684 1.929-1.49 1.929-2.158v-3.293c-.377.3-.804.565-1.258.792C16.42 16.285 14.3 16.75 12 16.75s-4.42-.465-5.992-1.25a7.146 7.146 0 0 1-1.258-.793V18Zm14.5-9.293V12c0 .667-.56 1.474-1.929 2.158c-1.323.661-3.203 1.092-5.321 1.092s-3.998-.43-5.321-1.092C5.31 13.474 4.75 12.668 4.75 12V8.707c.377.3.804.565 1.258.792C7.58 10.285 9.7 10.75 12 10.75s4.42-.465 5.992-1.25a7.144 7.144 0 0 0 1.258-.793Z"
                clip-rule="evenodd"
            /></svg
        ></button
    >

    {#if $ourData.isTurbo}
        <button on:click={refundTurbo}
            ><h1>Refund Turbo</h1>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                ><path
                    d="M15 12.75a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z"
                /><path
                    fill-rule="evenodd"
                    d="M12 1.25C6.063 1.25 1.25 6.063 1.25 12S6.063 22.75 12 22.75S22.75 17.937 22.75 12S17.937 1.25 12 1.25ZM2.75 12a9.25 9.25 0 1 1 18.5 0a9.25 9.25 0 0 1-18.5 0Z"
                    clip-rule="evenodd"
                /></svg
            ></button
        >
    {/if}

    <hr />

    <button on:click={deleteAccount}
        ><h1>Delete account</h1>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><path
                stroke-linecap="round"
                stroke-width="1.5"
                d="M9.17 4a3.001 3.001 0 0 1 5.66 0m5.67 2h-17m15.333 2.5l-.46 6.9c-.177 2.654-.265 3.981-1.13 4.79c-.865.81-2.196.81-4.856.81h-.774c-2.66 0-3.991 0-4.856-.81c-.865-.809-.954-2.136-1.13-4.79l-.46-6.9M9.5 11l.5 5m4.5-5l-.5 5"
            /></svg
        ></button
    >
</DropdownTemplateDarken>

<style>
    button {
        width: calc(200px - 10px);
        height: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        box-shadow: none;
        box-shadow: 2px solid var(--primary);
        border-radius: 0px;
        background: transparent;
        backdrop-filter: none;
    }

    button:hover {
        background: rgb(255, 255, 255, 0.15);
    }

    h1 {
        font-size: 0.83rem;
        font-weight: 500;
        flex: 1;
        text-align: start;
        color: white;
    }

    hr {
        width: 100%;
        height: 1px;
        border: 1px solid rgb(255, 255, 255, 0.1);
        padding: 0;
        margin: 0;
        margin-bottom: 2px;
        margin-top: 2px;
    }

    svg {
        width: 22px;
        height: 22px;
        margin-right: 5px;
    }
</style>
