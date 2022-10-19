<script lang="ts">
    import { darkTheme } from 'stores/all';
    import { Shadow } from 'svelte-loading-spinners';
    import { fade } from 'svelte/transition';
    import Center from './Center.svelte';

    export let text: string;
</script>

<Center absolute>
    <div class="loading-container" transition:fade>
        <h1 id="text">{text}</h1>
        <Shadow
            color={`${
                $darkTheme ? 'rgb(180, 120, 255)' : 'rgb(150, 100, 250)'
            }`}
            size="48"
            duration="1s"
        />
    </div>
</Center>

<style>
    .loading-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #text {
        font-size: 3rem;
    }

    @media screen and (max-width: 720px) {
        #text {
            font-size: 2.5rem;
        }
    }

    @media screen and (max-width: 520px) {
        #text {
            font-size: 1.9rem;
        }
    }
</style>
