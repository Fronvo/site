<script lang="ts">
    import { fade } from 'svelte/transition';
</script>

<div class="footer" in:fade={{ duration: 500 }}>
    <img
        src="https://fronvo.herokuapp.com/svgs/other/wave.svg"
        draggable={false}
        alt="Wave"
    />

    <div class="content">
        <h1>Fronvo</h1>

        <img
            src="https://fronvo.herokuapp.com/svgs/other/github.svg"
            draggable={false}
            alt="Github"
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

    .footer .content img {
        cursor: pointer;
    }

    @media screen and (max-width: 720px) {
        .footer .content h1 {
            font-size: 2.5rem;
        }

        .footer .content img {
            cursor: default;
        }
    }
</style>
