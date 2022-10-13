<script lang="ts">
    import { PanelTypes } from 'types/main';
    import { quadIn } from 'svelte/easing';
    import { draw } from 'svelte/transition';
    import { switchPanel } from 'utilities/main';
</script>

<svg
    version="1.2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="48"
    height="48"
    on:click={() => switchPanel(PanelTypes.Home)}
    ><defs
        ><linearGradient
            id="SVG"
            gradientUnits="userSpaceOnUse"
        /><linearGradient
            id="svg"
            x1="47"
            y1="9.6"
            x2="1"
            y2="38.4"
            href="#SVG"
        >
            <!-- TODO: Change according to theming -->
            <stop stop-color="#b98bff" /><stop
                offset="1"
                stop-color="#710fff"
            /></linearGradient
        ></defs
    ><style>
        .svg {
            fill: url(#svg);
            stroke-width: 0;
        }
    </style><path
        in:draw={{ duration: 1000, easing: quadIn }}
        class="svg"
        d="M8 42V21.95l-4.2 3.2-1.8-2.4 6-4.55v-5.7h3v3.4L24 6l22 16.8-1.8 2.35-4.2-3.2V42Zm3-3h11.5v-8h3v8H37V19.65l-13-9.9-13 9.9ZM8 10q0-2.3 1.625-3.9T13.5 4.5q1.05 0 1.775-.75Q16 3 16 2h3q0 2.25-1.6 3.875T13.5 7.5q-1 0-1.75.725T11 10Zm3 29h26-26Z"
    /></svg
>

<style>
    svg {
        fill: none;
        stroke: var(--svg_stroke);
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
