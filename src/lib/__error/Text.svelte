<script lang="ts">
    import Typewriter from 'svelte-typewriter';

    export let text = 'Typewriter text';
    export let delay: number = 0;
</script>

<Typewriter {delay} interval={60} cursor={'#f0f0f0'}>
    <h1>{text}</h1>
</Typewriter>

<style>
    h1 {
        font-size: 2.7rem;
        margin: 0;
        transition: 500ms all;
        color: rgb(255, 109, 255);
    }

    @media screen and (max-width: 800px) {
        h1 {
            font-size: 1.5rem;
        }
    }
</style>
