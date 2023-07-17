<script lang="ts">
    import { showModal } from 'utilities/main';
    import { ModalTypes } from 'stores/modals';
    import DropdownTemplateEmpty from '../DropdownTemplateEmpty.svelte';

    function deletePost(): void {
        showModal(ModalTypes.DeletePost);
    }
</script>

<DropdownTemplateEmpty>
    <button on:click={deletePost}
        ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            ><path
                fill="none"
                stroke="red"
                stroke-linecap="round"
                stroke-width="1.5"
                d="M20.5 6h-17m15.333 2.5l-.46 6.9c-.177 2.654-.265 3.981-1.13 4.79c-.865.81-2.196.81-4.856.81h-.774c-2.66 0-3.991 0-4.856-.81c-.865-.809-.954-2.136-1.13-4.79l-.46-6.9M9.17 4a3.001 3.001 0 0 1 5.66 0"
            /></svg
        >Delete post</button
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
