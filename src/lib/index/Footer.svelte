<script lang="ts">
    import Github from '$lib/svgs/Github.svelte';
</script>

<div class="footer">
    <h1>Fronvo</h1>

    <Github />
</div>

<style>
    .footer {
        min-width: 800px;
        max-width: 50%;
        margin: auto;
        position: fixed;
        bottom: 0;
        padding: 15px;
        background: var(--i_primary);
        box-shadow: 0 0 10px var(--i_shadow);
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        right: 0;
        left: 0;
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
        .footer {
            min-width: initial;
            max-width: initial;
            width: 100%;
            border-radius: 0;
        }

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
