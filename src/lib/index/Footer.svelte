<script lang="ts">
    import { fade } from 'svelte/transition';
</script>

<div class="footer" in:fade={{ duration: 500 }}>
    <div class="content">
        <h1>Fronvo</h1>

        <img
            src="/svgs/other/github.svg"
            draggable={false}
            alt="Github"
            on:click={() => (location.href = 'https://github.com/fronvo/site')}
        />
    </div>
</div>

<style>
    .footer {
        background: rgba(255, 255, 255, 5%);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        margin-right: 25px;
        margin-left: 25px;
    }

    .footer .content {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .footer .content h1 {
        color: white;
        font-size: 3.5rem;
        padding-right: 10px;
        margin: 0;
        font-weight: 900;
    }

    .footer .content img {
        cursor: pointer;
    }

    @media screen and (max-width: 720px) {
        .footer .content h1 {
            font-size: 2.3rem;
        }

        .footer .content img {
            cursor: default;
        }
    }
</style>
