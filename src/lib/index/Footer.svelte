<script lang="ts">
    import Github from '../svgs/Github.svelte';
    import Wave from '../svgs/Wave.svelte';
</script>

<div class="footer">
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
        background: #861bff;
    }

    .footer .content h1 {
        color: white;
        font-size: 3.5rem;
        padding-right: 10px;
        margin: 0;
    }

    @media screen and (max-width: 700px) {
        .footer .content h1 {
            font-size: 2.5rem;
        }
    }
</style>
