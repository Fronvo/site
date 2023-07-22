<script lang="ts">
    import { showModal } from 'utilities/main';
    import { ModalTypes } from 'stores/modals';
    import DropdownTemplateEmpty from '../DropdownTemplateEmpty.svelte';

    function requestData(): void {
        showModal(ModalTypes.RequestData);
    }

    function deleteAccount(): void {
        showModal(ModalTypes.DeleteAccount);
    }
</script>

<DropdownTemplateEmpty>
    <button on:click={requestData}
        ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            ><g fill="var(--branding)"
                ><path
                    d="M12 10c4.418 0 8-1.79 8-4s-3.582-4-8-4s-8 1.79-8 4s3.582 4 8 4Z"
                /><path
                    d="M4 12v6c0 2.21 3.582 4 8 4s8-1.79 8-4v-6c0 2.21-3.582 4-8 4s-8-1.79-8-4Z"
                    opacity=".5"
                /><path
                    d="M4 6v6c0 2.21 3.582 4 8 4s8-1.79 8-4V6c0 2.21-3.582 4-8 4S4 8.21 4 6Z"
                    opacity=".7"
                /></g
            ></svg
        >Request data</button
    >

    <button on:click={deleteAccount}
        ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            ><g fill="red"
                ><path
                    d="M12 3c-2.31 0-3.77 2.587-6.688 7.761l-.364.645c-2.425 4.3-3.638 6.45-2.542 8.022S6.214 21 11.636 21h.728c5.422 0 8.134 0 9.23-1.572s-.117-3.722-2.542-8.022l-.364-.645C15.77 5.587 14.311 3 12 3Z"
                    opacity=".5"
                /><path
                    d="M12 7.25a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75ZM12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
                /></g
            ></svg
        >Delete account</button
    >
</DropdownTemplateEmpty>

<style>
    button {
        display: flex;
        align-items: center;
        font-size: 0.9rem;
        box-shadow: none;
        box-shadow: 2px solid var(--primary);
    }

    button:hover {
        background: var(--secondary);
    }

    svg {
        width: 24px;
        height: 24px;
        margin-right: 10px;
    }
</style>
