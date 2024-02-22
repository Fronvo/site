<script lang="ts">
    import {
        ModalTypes,
        targetImageModal,
        targetMessageModal,
        targetMessageModalProfile,
    } from 'stores/modals';
    import DropdownTemplateDarken from '../DropdownTemplateDarken.svelte';
    import { showModal } from 'utilities/main';
    import { ourData } from 'stores/profile';
    import { replyingTo, replyingToId } from 'stores/rooms';

    function playSpotify(): void {
        window.open(
            $targetMessageModal.spotifyEmbed.replace('/embed/', '/'),
            '_blank'
        );
    }

    function viewImage(): void {
        $targetImageModal = $targetMessageModal.attachment;

        showModal(ModalTypes.Image);
    }

    function saveImage(): void {
        window.open(`${$targetMessageModal.attachment}?ik-attachment=true`);
    }

    function copyContent(): void {
        window.navigator.clipboard.writeText($targetMessageModal.content);
    }

    function replyMessage(): void {
        $replyingTo = $targetMessageModalProfile.profileId;
        $replyingToId = $targetMessageModal.messageId;
    }

    function deleteMessage(): void {
        showModal(ModalTypes.DeleteMessage);
    }
</script>

<DropdownTemplateDarken>
    {#if $targetMessageModal.isSpotify}
        <button on:click={playSpotify}
            ><h1>Play on Spotify</h1>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 14 14"
                stroke="currentColor"
                ><g fill="none" stroke-linecap="round" stroke-linejoin="round"
                    ><path d="M1 7a6 6 0 1 0 12 0A6 6 0 1 0 1 7" /><path
                        d="M4.055 4.837c2.382-.455 4.248-.202 6.51 1.002M4.98 8.875c1.152-.142 1.935.012 3.005.5M4.54 6.8c1.784-.355 3.031 0 4.914.909"
                    /></g
                ></svg
            ></button
        >
    {/if}

    {#if $targetMessageModal.content}
        <button on:click={replyMessage}
            ><h1>Reply</h1>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                ><path
                    fill-rule="evenodd"
                    d="M20.54 16.807a.75.75 0 0 0 .13-.86l-.731-1.441a9.75 9.75 0 0 0-8.698-5.346h-.404a61.744 61.744 0 0 0-.099-1.659l-.068-.939a1.004 1.004 0 0 0-1.542-.773a19.8 19.8 0 0 0-5.42 5.133l-.46.641a.75.75 0 0 0 0 .875l.46.64a19.8 19.8 0 0 0 5.42 5.134c.64.41 1.486-.015 1.542-.773l.068-.94c.048-.659.086-1.319.113-1.98a14.131 14.131 0 0 1 6.335 1.295l2.5 1.154a.75.75 0 0 0 .854-.16m-2.21-2.118l-.515-.237a15.63 15.63 0 0 0-7.747-1.393a.75.75 0 0 0-.692.726c-.026.87-.07 1.738-.134 2.606l-.006.087a18.3 18.3 0 0 1-4.31-4.274L4.78 12l.146-.203a18.3 18.3 0 0 1 4.31-4.275l.006.087c.057.775.098 1.55.125 2.326a.75.75 0 0 0 .75.725h1.124a8.25 8.25 0 0 1 7.088 4.028"
                    clip-rule="evenodd"
                /></svg
            ></button
        >
    {/if}

    {#if $targetMessageModal.isImage}
        <button on:click={viewImage}
            ><h1>View image</h1>
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
    {:else if $targetMessageModal.content}
        <button on:click={copyContent}
            ><h1>Copy content</h1>
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
    {/if}

    {#if $targetMessageModalProfile.profileId == $ourData.profileId}
        <hr />

        <button on:click={deleteMessage}
            ><h1>Delete message</h1>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                ><path
                    fill-rule="evenodd"
                    d="M10.31 2.25h3.38c.217 0 .406 0 .584.028a2.25 2.25 0 0 1 1.64 1.183c.084.16.143.339.212.544l.111.335a1.25 1.25 0 0 0 1.263.91h3a.75.75 0 0 1 0 1.5h-17a.75.75 0 0 1 0-1.5h3.09a1.25 1.25 0 0 0 1.173-.91l.112-.335c.068-.205.127-.384.21-.544a2.25 2.25 0 0 1 1.641-1.183c.178-.028.367-.028.583-.028Zm-1.302 3a2.757 2.757 0 0 0 .175-.428l.1-.3c.091-.273.112-.328.133-.368a.75.75 0 0 1 .547-.395a3.2 3.2 0 0 1 .392-.009h3.29c.288 0 .348.002.392.01a.75.75 0 0 1 .547.394c.021.04.042.095.133.369l.1.3l.039.112c.039.11.085.214.136.315H9.008Z"
                    clip-rule="evenodd"
                /><path
                    d="M5.915 8.45a.75.75 0 1 0-1.497.1l.464 6.952c.085 1.282.154 2.318.316 3.132c.169.845.455 1.551 1.047 2.104c.591.554 1.315.793 2.17.904c.822.108 1.86.108 3.146.108h.879c1.285 0 2.324 0 3.146-.108c.854-.111 1.578-.35 2.17-.904c.591-.553.877-1.26 1.046-2.104c.162-.813.23-1.85.316-3.132l.464-6.952a.75.75 0 0 0-1.497-.1l-.46 6.9c-.09 1.347-.154 2.285-.294 2.99c-.137.685-.327 1.047-.6 1.303c-.274.256-.648.422-1.34.512c-.713.093-1.653.095-3.004.095h-.774c-1.35 0-2.29-.002-3.004-.095c-.692-.09-1.066-.256-1.34-.512c-.273-.256-.463-.618-.6-1.302c-.14-.706-.204-1.644-.294-2.992l-.46-6.899Z"
                /><path
                    d="M9.425 10.254a.75.75 0 0 1 .821.671l.5 5a.75.75 0 0 1-1.492.15l-.5-5a.75.75 0 0 1 .671-.821Zm5.15 0a.75.75 0 0 1 .671.82l-.5 5a.75.75 0 0 1-1.492-.149l.5-5a.75.75 0 0 1 .82-.671Z"
                /></svg
            ></button
        >
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
