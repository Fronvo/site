<script lang="ts">
    import type { Theme } from 'interfaces/all';

    let themes: Theme[] = [];
</script>

<div class="marketplace-container">
    {#if themes.length == 0}
        <div class="empty">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                ><g fill="none"
                    ><circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="var(--branding)"
                        stroke-width="1.5"
                        opacity=".5"
                    /><path
                        stroke="var(--branding)"
                        stroke-linecap="round"
                        stroke-width="1.5"
                        d="M10.125 8.875a1.875 1.875 0 1 1 2.828 1.615c-.475.281-.953.708-.953 1.26V13"
                    /><circle cx="12" cy="16" r="1" fill="var(--branding)" /></g
                ></svg
            >
            <h1>No themes available</h1>
        </div>
    {:else}{/if}
</div>

<style>
    .marketplace-container {
        width: 100%;
        position: fixed;
    }

    .empty {
        height: calc(100vh - 160px);
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 275px;
        justify-content: center;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .empty h1 {
        margin: 0;
        font-size: 1.3rem;
    }
    .empty svg {
        width: 128px;
        height: 128px;
        cursor: default;
    }
</style>
