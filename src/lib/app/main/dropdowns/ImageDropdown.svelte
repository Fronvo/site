<script lang="ts">
    import { showModal } from 'utilities/main';
    import {
        ModalTypes,
        currentModalId,
        modalVisible,
        targetImageModal,
    } from 'stores/modals';
    import DropdownTemplateDarken from '../DropdownTemplateDarken.svelte';

    function newTab(): void {
        window.open($targetImageModal, '_blank');
    }

    function viewImage(): void {
        showModal(ModalTypes.Image);
    }

    function copyURL(): void {
        window.navigator.clipboard.writeText($targetImageModal);
    }

    function saveImage(): void {
        window.open(`${$targetImageModal}?ik-attachment=true`);
    }
</script>

<DropdownTemplateDarken>
    <button on:click={newTab}
        ><h1>Open in new tab</h1>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><g fill="none" stroke-linecap="round" stroke-width="1.5"
                ><path
                    d="M13 22c4.055-.008 6.178-.107 7.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536C19.071 2 16.714 2 12 2S4.929 2 3.464 3.464C2.107 4.822 2.008 6.944 2 11"
                /><path stroke-linejoin="round" d="m3 21l8-8m0 0H5m6 0v6" /></g
            ></svg
        ></button
    >

    {#if !$modalVisible}
        <button on:click={viewImage}
            ><h1>
                View {$targetImageModal.includes('tenor') ? 'GIF' : 'image'}
            </h1>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                stroke="currentColor"
                ><g fill="none" stroke-width="1.5"
                    ><path
                        d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z"
                    /><circle cx="16" cy="8" r="2" /><path
                        stroke-linecap="round"
                        d="m2 10.154l.98-.141C9.96 9.01 15.925 15.03 14.858 22"
                    /><path
                        stroke-linecap="round"
                        d="m22 13.385l-.973-.135c-2.844-.394-5.417 1.022-6.742 3.25"
                    /></g
                ></svg
            ></button
        >
    {/if}

    <button on:click={copyURL}
        ><h1>Copy URL</h1>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            ><path
                fill-rule="evenodd"
                d="M15 1.25h-4.056c-1.838 0-3.294 0-4.433.153c-1.172.158-2.121.49-2.87 1.238c-.748.749-1.08 1.698-1.238 2.87c-.153 1.14-.153 2.595-.153 4.433V16a3.751 3.751 0 0 0 3.166 3.705c.137.764.402 1.416.932 1.947c.602.602 1.36.86 2.26.982c.867.116 1.97.116 3.337.116h3.11c1.367 0 2.47 0 3.337-.116c.9-.122 1.658-.38 2.26-.982c.602-.602.86-1.36.982-2.26c.116-.867.116-1.97.116-3.337v-5.11c0-1.367 0-2.47-.116-3.337c-.122-.9-.38-1.658-.982-2.26c-.531-.53-1.183-.795-1.947-.932A3.751 3.751 0 0 0 15 1.25Zm2.13 3.021A2.25 2.25 0 0 0 15 2.75h-4c-1.907 0-3.261.002-4.29.14c-1.005.135-1.585.389-2.008.812c-.423.423-.677 1.003-.812 2.009c-.138 1.028-.14 2.382-.14 4.289v6a2.25 2.25 0 0 0 1.521 2.13c-.021-.61-.021-1.3-.021-2.075v-5.11c0-1.367 0-2.47.117-3.337c.12-.9.38-1.658.981-2.26c.602-.602 1.36-.86 2.26-.981c.867-.117 1.97-.117 3.337-.117h3.11c.775 0 1.464 0 2.074.021ZM7.408 6.41c.277-.277.665-.457 1.4-.556c.754-.101 1.756-.103 3.191-.103h3c1.435 0 2.436.002 3.192.103c.734.099 1.122.28 1.399.556c.277.277.457.665.556 1.4c.101.754.103 1.756.103 3.191v5c0 1.435-.002 2.436-.103 3.192c-.099.734-.28 1.122-.556 1.399c-.277.277-.665.457-1.4.556c-.755.101-1.756.103-3.191.103h-3c-1.435 0-2.437-.002-3.192-.103c-.734-.099-1.122-.28-1.399-.556c-.277-.277-.457-.665-.556-1.4c-.101-.755-.103-1.756-.103-3.191v-5c0-1.435.002-2.437.103-3.192c.099-.734.28-1.122.556-1.399Z"
                clip-rule="evenodd"
            /></svg
        ></button
    >

    {#if !$targetImageModal.includes('tenor')}
        <hr />

        <button on:click={saveImage}
            ><h1>Save image</h1>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                ><path
                    d="M12.553 16.506a.75.75 0 0 1-1.107 0l-4-4.375a.75.75 0 0 1 1.108-1.012l2.696 2.95V3a.75.75 0 0 1 1.5 0v11.068l2.697-2.95a.75.75 0 1 1 1.107 1.013l-4 4.375Z"
                /><path
                    d="M3.75 15a.75.75 0 0 0-1.5 0v.055c0 1.367 0 2.47.117 3.337c.12.9.38 1.658.981 2.26c.602.602 1.36.86 2.26.982c.867.116 1.97.116 3.337.116h6.11c1.367 0 2.47 0 3.337-.116c.9-.122 1.658-.38 2.26-.982c.602-.602.86-1.36.982-2.26c.116-.867.116-1.97.116-3.337V15a.75.75 0 0 0-1.5 0c0 1.435-.002 2.436-.103 3.192c-.099.734-.28 1.122-.556 1.399c-.277.277-.665.457-1.4.556c-.755.101-1.756.103-3.191.103H9c-1.435 0-2.437-.002-3.192-.103c-.734-.099-1.122-.28-1.399-.556c-.277-.277-.457-.665-.556-1.4c-.101-.755-.103-1.756-.103-3.191Z"
                /></svg
            >
        </button>
    {/if}
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
