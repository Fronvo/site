<script lang="ts">
    import Saos from 'saos';

    import { redirectApp } from 'utilities/index';
</script>

<Saos
    once
    animation={'scale 0.75s cubic-bezier(0.230, 1.000, 0.320, 1.000) both'}
>
    <div class="waiting-container">
        <button on:click={redirectApp}>What are you waiting for?</button>
    </div>
</Saos>

<style>
    .waiting-container {
        text-align: center;
    }

    .waiting-container button {
        font-size: 2.5rem;
        margin-bottom: 150px;
    }

    @media screen and (max-width: 720px) {
        .waiting-container button {
            font-size: 2.1rem;
            margin-bottom: 100px;
        }
    }

    @media screen and (max-width: 520px) {
        .waiting-container button {
            font-size: 1.8rem;
            margin-bottom: 75px;
        }
    }

    @keyframes -global-scale {
        0% {
            transform: scale(0.5);
        }

        100% {
            transform: scale(1);
        }
    }
</style>
