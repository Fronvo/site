<script lang="ts">
    import { showModal } from 'utilities/main';
    import { ModalTypes } from 'stores/modals';
    import DropdownTemplateDarken from '../DropdownTemplateDarken.svelte';

    function viewPost(): void {
        showModal(ModalTypes.Image);
    }

    function deletePost(): void {
        showModal(ModalTypes.DeletePost);
    }
</script>

<DropdownTemplateDarken>
    <button on:click={viewPost}
        ><h1>View post</h1>
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

    <hr />

    <button on:click={deletePost}
        ><h1>Delete post</h1>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><path
                fill="none"
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
        background: var(--primary);
    }

    h1 {
        font-size: 0.83rem;
        font-weight: 500;
        flex: 1;
        text-align: start;
    }

    hr {
        width: 100%;
        height: 1px;
        border: 1px solid var(--primary);
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
