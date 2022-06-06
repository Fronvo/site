<script>
    import 'src/app.css';
    import { onMount } from 'svelte';
    import { ThemeWrapper } from 'svelte-themer';
    import themes from '../themes';

    let mountReady = false;

    onMount(() => {
        mountReady = true;
    });
</script>

<ThemeWrapper mode="dark" {themes}>
    {#if mountReady}
        <slot />
    {/if}
</ThemeWrapper>
