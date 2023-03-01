<script>
    import LoadingDiamonds from '$lib/svgs/LoadingDiamonds.svelte';
</script>

<div class="loading-container">
    <LoadingDiamonds />
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
