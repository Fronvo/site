<script lang="ts">
    import { currentPanelId } from 'stores/app/main';
    import { quadIn } from 'svelte/easing';
    import { draw } from 'svelte/transition';
    import { switchPanel } from 'utilities/app/main';
</script>

<svg
    version="1.2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="48"
    height="48"
    on:click={() => switchPanel('Home')}
    ><defs
        ><linearGradient id="P" gradientUnits="userSpaceOnUse" /><linearGradient
            id="g1"
            x1="1"
            y1="24"
            x2="47"
            y2="24"
            href="#P"
            ><stop stop-color="#7319fa" /><stop
                offset="1"
                stop-color="#a200ff"
            /></linearGradient
        ></defs
    ><style>
        .a {
            fill: url(#g1);
        }
    </style><path
        in:draw={{ duration: 1000, easing: quadIn }}
        class={$currentPanelId == 0 ? 'a' : ''}
        d="m45.4 1q0.5 0 0.9 0.3 0.8 0.6 0.7 1.6l-6.6 39.5q-0.1 0.7-0.8 1.1-0.4 0.2-0.8 0.2-0.3 0-0.6-0.1l-11.7-4.8-6.2 7.6q-0.4 0.6-1.2 0.6-0.4 0-0.6-0.1-0.5-0.2-0.8-0.6-0.3-0.4-0.3-0.9v-9l22.2-27.2-27.4 23.8-10.2-4.2q-0.9-0.4-1-1.4 0-1 0.8-1.5l42.7-24.7q0.4-0.2 0.9-0.2z"
    /></svg
>

<style>
    svg {
        fill: none;
        stroke: var(--theme-svg_stroke);
        stroke-width: 2px;
        cursor: pointer;
        transition: 100ms all;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        margin-bottom: 15px;
    }

    svg:hover {
        opacity: 0.8;
        animation-name: rgb-stroke;
        animation-duration: 2000ms;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }

    svg:active {
        transform: scale(0.9);
    }

    @media screen and (max-width: 700px) {
        svg {
            margin-bottom: 0;
            margin-top: 0;
            margin-right: 20px;
            cursor: default;
        }
    }

    @media screen and (max-width: 520px) {
        svg {
            width: 40px;
            height: 40px;
            margin-right: 10px;
        }
    }

    @keyframes rgb-stroke {
        0% {
            stroke: rgb(130, 64, 255);
        }

        100% {
            stroke: rgb(156, 36, 255);
        }
    }
</style>
