<script lang="ts">
    import { Shadow } from 'svelte-loading-spinners';
    import Center from './Center.svelte';

    export let text: string;
</script>

<Center>
    <div class="loading-container">
        <h1 id="text">{text}</h1>
        <Shadow color="rgb(169, 64, 255)" size="48" duration="1s" />
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

    @media screen and (max-width: 700px) {
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
