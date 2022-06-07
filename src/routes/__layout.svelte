<script>
    import 'src/app.css';
    import themes from 'src/themes';
    import { onMount } from 'svelte';
    import { setGlobalOptions } from 'svelte-scrolling';
    import { ThemeWrapper } from 'svelte-themer';
    import { sineInOut } from 'svelte/easing';

    let mountReady = false;

    onMount(() => {
        mountReady = true;
    });

    // svelte-scrolling globals
    setGlobalOptions({
        duration: 750,
        easing: sineInOut,
        offset: 0,
    });
</script>

<ThemeWrapper mode="dark" {themes}>
    {#if mountReady}
        <slot />
    {/if}
</ThemeWrapper>
