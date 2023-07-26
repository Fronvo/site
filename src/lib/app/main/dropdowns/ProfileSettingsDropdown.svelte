<script lang="ts">
    import { showModal } from 'utilities/main';
    import { ModalTypes } from 'stores/modals';
    import DropdownTemplateEmpty from '../DropdownTemplateEmpty.svelte';
    import { ourData } from 'stores/profile';

    function requestData(): void {
        showModal(ModalTypes.RequestData);
    }

    function refundPRO(): void {
        showModal(ModalTypes.RefundPRO);
    }

    function deleteAccount(): void {
        showModal(ModalTypes.DeleteAccount);
    }
</script>

<DropdownTemplateEmpty>
    {#if $ourData.isPRO}
        <button on:click={refundPRO}
            ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                ><g fill="var(--pro)"
                    ><path
                        d="M6.26 21.388H6c-.943 0-1.414 0-1.707-.293C4 20.803 4 20.332 4 19.389v-1.112c0-.518 0-.777.133-1.009c.133-.231.334-.348.736-.582c2.646-1.539 6.402-2.405 8.91-.91c.168.101.32.223.45.368a1.492 1.492 0 0 1-.126 2.134a.998.998 0 0 1-.427.24c.12-.014.235-.03.345-.047c.911-.145 1.676-.633 2.376-1.162l1.808-1.365a1.887 1.887 0 0 1 2.22 0c.573.433.749 1.146.386 1.728c-.423.678-1.019 1.545-1.591 2.075c-.573.53-1.426 1.004-2.122 1.34c-.772.373-1.624.587-2.491.728c-1.758.284-3.59.24-5.33-.118a15.031 15.031 0 0 0-3.017-.308Zm.326-18.802c-.367.367-.504.873-.555 1.664A2.25 2.25 0 0 0 8.25 2.03c-.79.052-1.297.189-1.664.556Zm10.828 0c-.367-.367-.873-.504-1.664-.555a2.25 2.25 0 0 0 2.22 2.219c-.052-.79-.189-1.297-.556-1.664Zm0 6.828c-.367.367-.873.504-1.664.555a2.25 2.25 0 0 1 2.22-2.219c-.052.79-.189 1.297-.556 1.664Zm-10.828 0c.367.367.873.504 1.664.555A2.25 2.25 0 0 0 6.03 7.75c.052.79.189 1.297.556 1.664Z"
                    /><path
                        fill-rule="evenodd"
                        d="M6 5.75A3.75 3.75 0 0 0 9.75 2h4.5A3.75 3.75 0 0 0 18 5.75v.5A3.75 3.75 0 0 0 14.25 10h-4.5A3.75 3.75 0 0 0 6 6.25v-.5ZM12 7a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
                        clip-rule="evenodd"
                    /></g
                ></svg
            >Refund PRO</button
        >
    {/if}

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
