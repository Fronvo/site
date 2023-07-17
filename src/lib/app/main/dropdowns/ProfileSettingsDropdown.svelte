<script lang="ts">
    import { dismissModal, showModal } from 'utilities/main';
    import { ModalTypes } from 'stores/modals';
    import DropdownTemplateEmpty from '../DropdownTemplateEmpty.svelte';
    import { toast } from 'svelte-sonner';

    function getAPIKey(): void {
        dismissModal();

        toast('BETA feature not complete');
    }

    function requestData(): void {
        showModal(ModalTypes.RequestData);
    }

    function deleteAccount(): void {
        showModal(ModalTypes.DeleteAccount);
    }
</script>

<DropdownTemplateEmpty>
    <button on:click={getAPIKey}
        ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            ><g fill="var(--branding)"
                ><path
                    d="M19.83 10.441L18.296 12l-.11.11l-.09-.088c-.49-.87-1.446-1.827-2.869-3.25c-1.408-1.407-2.359-2.359-3.221-2.853l1.687-1.714C15.139 2.735 15.863 2 16.76 2c.9 0 1.623.735 3.069 2.205C21.277 5.675 22 6.41 22 7.323c0 .913-.724 1.648-2.17 3.118Z"
                    opacity=".5"
                /><path
                    fill-rule="evenodd"
                    d="M2 14.142c0 1.348 1.085 2.433 3.255 4.603S8.509 22 9.857 22c1.349 0 2.434-1.085 4.603-3.255l.767-.767c2.17-2.17 3.255-3.255 3.255-4.603c0-1.348-1.085-2.433-3.255-4.603s-3.254-3.254-4.602-3.254c-1.349 0-2.433 1.084-4.603 3.254l-.767.767C3.085 11.71 2 12.794 2 14.142Zm3.785-.53a.75.75 0 0 0-1.06 1.06l4.602 4.604a.75.75 0 1 0 1.061-1.06l-4.603-4.604Zm13.462-6.739a.75.75 0 0 1 0 1.06l-.707.708a.75.75 0 1 1-1.06-1.06l.706-.708a.75.75 0 0 1 1.061 0Zm-2.121-2.121a.75.75 0 0 1 0 1.06l-.707.708a.75.75 0 1 1-1.06-1.06l.706-.708a.75.75 0 0 1 1.061 0Z"
                    clip-rule="evenodd"
                /></g
            ></svg
        >Get API key</button
    >

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
