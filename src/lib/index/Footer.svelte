<script lang="ts">
    import Github from '$lib/svgs/Github.svelte';
</script>

<div class="footer">
    <h1>Fronvo</h1>

    <Github />
</div>

<style>
    .footer {
        width: 100%;
        margin: auto;
        padding: 15px;
        background: var(--i_primary);
        box-shadow: 0 0 10px var(--i_shadow);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    h1 {
        color: var(--text);
        font-size: 1.7rem;
        padding-right: 10px;
        margin: 0;
    }

    @media screen and (max-width: 850px) {
        h1 {
            font-size: 1.3rem;
        }
    }

    @media screen and (max-width: 600px) {
        h1 {
            font-size: 1.2rem;
        }
    }
</style>
