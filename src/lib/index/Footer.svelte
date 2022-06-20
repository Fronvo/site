<script lang="ts">
    import Github from '$lib/svgs/Github.svelte';
    import Wave from '$lib/svgs/Wave.svelte';
    import { fade } from 'svelte/transition';
</script>

<div class="footer" in:fade={{ duration: 500 }}>
    <Wave inverse />

    <div class="content">
        <h1>Fronvo</h1>

        <Github
            on:click={() => (location.href = 'https://github.com/fronvo/site')}
        />
    </div>
</div>

<style>
    .footer {
        display: flex;
        flex-direction: column;
    }

    .footer .content {
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgb(100, 0, 255);
    }

    .footer .content h1 {
        color: white;
        font-size: 3.5rem;
        padding-right: 10px;
        margin: 0;
        font-weight: 900;
    }

    @media screen and (max-width: 700px) {
        .footer .content h1 {
            font-size: 2.5rem;
        }
    }
</style>
