<script lang="ts">
    export let callback: () => void;
</script>

<button on:click={callback}>
    <slot />
</button>

<style>
    button {
        font-size: 1.4rem;
        margin-right: 10px;
        margin-left: 10px;
        background: transparent;
        border-radius: 0;
        box-shadow: 0 0 1px var(--profile_info_color);
        margin-top: 10px;
    }

    button:hover {
        color: var(--profile_info_color);
    }

    @media screen and (max-width: 850px) {
        button {
            font-size: 1.1rem;
        }
    }
</style>
