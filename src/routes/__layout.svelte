<script>
    import 'src/app.css';
    import TopNav from 'src/lib/__layout/TopNav.svelte';
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
        <TopNav />

        <slot />
    {/if}
</ThemeWrapper>
