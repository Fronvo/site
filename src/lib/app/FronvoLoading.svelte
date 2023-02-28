<script lang="ts">
    import { Diamonds } from 'svelte-loading-spinners';
</script>

<div class="loading-container">
    <Diamonds color={'var(--text_color)'} size="128" duration="1.5s" />
</div>

<style>
    .loading-container {
        z-index: -1;
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100vw;
        height: 100vh;
        margin: auto;
        overflow: hidden;
    }
</style>
