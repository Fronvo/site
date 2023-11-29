<script lang="ts">
    import PropImage from './PropImage.svelte';
    import PropText from './PropText.svelte';
</script>

<div class="prop-container">
    {#each { length: 1 } as _, i}
        <PropText />
    {/each}

    {#each { length: 1 } as _, i}
        <PropImage />
    {/each}

    {#each { length: 2 } as _, i}
        <PropText />
    {/each}

    {#each { length: 2 } as _, i}
        <PropImage />
    {/each}
</div>

<style>
    .prop-container {
        display: flex;
        flex-direction: column-reverse;
        height: 100%;
        margin-left: 3%;
    }
</style>
