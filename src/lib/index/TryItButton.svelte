<script lang="ts">
    import Saos from 'saos';
    import { redirectApp } from 'src/utilities';
</script>

<Saos
    animation={'fade-in-scale .5s cubic-bezier(0.230, 1.000, 0.320, 1.000) both'}
>
    <div class="try-container">
        <button id="try" on:click={redirectApp}>Try Fronvo NOW</button>
    </div>
</Saos>

<style>
    .try-container {
        text-align: center;
    }

    .try-container #try {
        font-size: 3rem;
    }

    @media screen and (max-width: 700px) {
        .try-container #try {
            font-size: 2.3rem;
        }
    }

    @media screen and (max-width: 520px) {
        .try-container #try {
            font-size: 2rem;
        }
    }

    @keyframes -global-fade-in-scale {
        0% {
            transform: scale(0, 0);
            opacity: 0;
        }

        100% {
            transform: scale(1, 1);
            opacity: 1;
        }
    }
</style>
