<script lang="ts">
    export let absolute = false;
</script>

{#if absolute}
    <div class="center-container-absolute">
        <slot>
            <h1>No content</h1>
        </slot>
    </div>
{:else}
    <div class="center-container">
        <slot>
            <h1>No content</h1>
        </slot>
    </div>
{/if}

<style>
    .center-container-absolute {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: max-content;
        height: fit-content;
        margin: auto;
    }

    .center-container {
        display: flex;
        height: 100vh;
        justify-content: center;
        align-items: center;
    }
</style>
