<script>
    import 'src/app.css';
    import { setGlobalOptions } from 'svelte-scrolling';
    import { sineInOut } from 'svelte/easing';

    // svelte-scrolling globals
    setGlobalOptions({
        duration: 750,
        easing: sineInOut,
        offset: 0,
    });
</script>

<!-- TODO: Theme wrapper -->
<slot />
