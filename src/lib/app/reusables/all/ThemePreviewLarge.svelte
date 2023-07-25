<script lang="ts">
    import ThemeIcon from '../themes/ThemeIcon.svelte';
    import ThemeTitle from '../themes/ThemeTitle.svelte';
    import ThemeColors from '../themes/ThemeColors.svelte';
    import type { Theme } from 'interfaces/all';
    import { darkTheme } from 'stores/main';

    export let creating = false;

    export let themeData: Theme;

    let color = `#${
        $darkTheme ? themeData.brandingDark : themeData.brandingWhite
    }`;
</script>

<div class="theme-container">
    <ThemeIcon bind:color />

    <ThemeTitle {creating} bind:title={themeData.title} />

    {#if creating}
        <ThemeColors
            bind:brandingWhite={themeData.brandingWhite}
            bind:brandingDarkenWhite={themeData.brandingDarkenWhite}
            bind:brandingDark={themeData.brandingDark}
            bind:brandingDarkenDark={themeData.brandingDarkenDark}
        />
    {/if}
</div>

<style>
    .theme-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: start;
    }
</style>
