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
        ><linearGradient
            id="HOME"
            gradientUnits="userSpaceOnUse"
        /><linearGradient
            id="home"
            x1="47"
            y1="9.6"
            x2="1"
            y2="38.4"
            href="#HOME"
            ><stop stop-color="#b98bff" /><stop
                offset="1"
                stop-color="#710fff"
            /></linearGradient
        ></defs
    ><style>
        .home {
            fill: url(#home);
            stroke-width: 0;
        }
    </style><path
        in:draw={{ duration: 1000, easing: quadIn }}
        class={$currentPanelId == 0 ? 'home' : ''}
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
    }

    svg:active {
        transform: scale(0.95);
    }

    @media screen and (max-width: 720px) {
        svg {
            margin-bottom: 0;
            margin-top: 0;
            margin-right: 20px;
            cursor: default;
        }

        svg:hover {
            opacity: 1;
        }
    }

    @media screen and (max-width: 520px) {
        svg {
            width: 40px;
            height: 40px;
            margin-right: 10px;
        }
    }
</style>
