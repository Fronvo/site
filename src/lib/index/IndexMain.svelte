<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { blur, fly } from 'svelte/transition';

    let mountReady = false;

    function gotoApp(): void {
        goto('/app');
    }

    onMount(() => {
        mountReady = true;
    });
</script>

{#if mountReady}
    <div
        class="mobile:mb-[50px] w-full h-screen flex text-center items-center justify-center flex-col"
    >
        <h1
            class="smobile:text-3xl mobile:text-4xl mobile:mr-4 mobile:ml-4 text-5xl text-white font-extrabold mb-6"
            transition:fly={{ y: -50, duration: 500 }}
        >
            All of your social media, in one.
        </h1>
        <h1
            class="smobile:text-base mobile:text-lg text-2xl text-white"
            transition:fly={{ y: -40, duration: 550, delay: 600 }}
        >
            Your favorite social media, merged into one.
        </h1>
        <h1
            class="smobile:text-base mobile:text-lg text-2xl text-white"
            transition:fly={{ y: -20, duration: 550, delay: 850 }}
        >
            You're at the right place.
        </h1>

        <button
            class="smobile:w-44 smobile:text-base mobile:w-48 mobile:h-12 mobile:text-lg w-52 h-16 text-2xl text-white font-semibold mt-6"
            on:click={gotoApp}
            transition:blur={{ duration: 500, delay: 1200 }}
            >Explore Fronvo</button
        >
    </div>
{/if}
