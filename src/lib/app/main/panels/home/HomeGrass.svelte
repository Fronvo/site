<script lang="ts">
</script>

<div class="grass-container">
    <h1>That's all for now</h1>
    <h1>Time to touch some <span>grass</span>!</h1>

    <img
        id="grass"
        src="/images/fronvo-touch-grass.svg"
        draggable={false}
        alt="Touch grass icon"
    />
</div>

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

    .grass-container #grass {
        width: 560px;
        height: 64px;
    }

    @media screen and (max-width: 720px) {
        .grass-container h1 {
            font-size: 1.9rem;
        }

        .grass-container #grass {
            width: 450px;
            height: 48px;
        }
    }

    @media screen and (max-width: 520px) {
        .grass-container h1 {
            font-size: 1.6rem;
        }
    }
</style>
