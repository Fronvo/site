<script lang="ts">
    export let callback: () => void;
</script>

<button on:click={callback}>
    <slot />
</button>

<style>
    button {
        font-size: 2.5rem;
        margin-top: 25px;
        width: 90%;
        background: transparent;
        border: 2px solid var(--profile_info_color);
        padding: 7px;
        transition: 0.25s;
        color: var(--profile_info_color);
    }

    button:hover {
        color: var(--profile_info_color);
    }

    button:active {
        transition: 0.25s;
        transform: none;
        background: var(--profile_info_color);
        color: var(--bg_color);
    }

    @media screen and (max-width: 700px) {
        button {
            font-size: 1.7rem;
        }
    }
</style>
