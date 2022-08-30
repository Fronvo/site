<script lang="ts">
    import { homeLoadDelay } from 'stores/app/home';

    let showGrass = false;

    setTimeout(() => {
        showGrass = true;
    }, homeLoadDelay);
</script>

{#if showGrass}
    <div class="grass-container">
        <h1>That's all for now</h1>
        <h1>
            Time to touch some <span
                ><a
                    target="_blank"
                    href="https://en.wiktionary.org/wiki/grass#/media/File:Grass-JW.jpg"
                    >grass</a
                ></span
            >!
        </h1>

        <img
            id="grass"
            src="/images/fronvo-touch-grass.svg"
            draggable={false}
            alt="Touch grass icon"
        />
    </div>
{/if}

<style>
    .grass-container {
        text-align: center;
    }

    .grass-container h1 {
        color: white;
        font-size: 2.1rem;
        margin-top: 0;
    }

    .grass-container h1 span {
        color: rgb(0, 255, 0);
    }

    .grass-container h1 span a {
        color: rgb(0, 255, 0);
    }

    .grass-container h1 span a:hover::after {
        background: rgb(0, 255, 0);
    }

    .grass-container #grass {
        width: 560px;
        height: 64px;
    }

    @media screen and (max-width: 720px) {
        .grass-container h1 {
            font-size: 1.9rem;
        }

        .grass-container #grass {
            width: 99%;
            height: 48px;
        }
    }

    @media screen and (max-width: 520px) {
        .grass-container h1 {
            font-size: 1.6rem;
        }
    }
</style>
