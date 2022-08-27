<script lang="ts">
    import { currentPanelId } from 'stores/app/main';
    import { quadIn } from 'svelte/easing';
    import { draw } from 'svelte/transition';
    import { PanelTypes } from 'types/app/main';
    import { switchPanel } from 'utilities/app/main';
</script>

<svg
    version="1.2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="48"
    height="48"
    on:click={() => switchPanel(PanelTypes.Profile)}
    ><defs
        ><linearGradient
            id="PROFILE"
            gradientUnits="userSpaceOnUse"
        /><linearGradient
            id="profile"
            x1="47"
            y1="9.6"
            x2="1"
            y2="38.4"
            href="#PROFILE"
            ><stop stop-color="#b98bff" /><stop
                offset="1"
                stop-color="#710fff"
            /></linearGradient
        ></defs
    ><style>
        .profile {
            fill: url(#profile);
            stroke-width: 0;
        }
    </style><path
        in:draw={{ duration: 1000, easing: quadIn }}
        class={$currentPanelId == 1 ? 'profile' : ''}
        d="m45 37.9q0 3.3-2.2 5.2-2.2 1.9-5.8 1.9h-26q-3.6 0-5.8-1.9-2.2-1.9-2.2-5.2 0-1.4 0.1-2.8 0.1-1.4 0.4-3 0.3-1.6 0.8-3 0.5-1.3 1.3-2.6 0.8-1.3 1.8-2.2 1.1-1 2.6-1.5 1.5-0.5 3.3-0.5 0.3 0 1.3 0.5 1 0.6 2.2 1.4 1.2 0.7 3.2 1.3 2 0.6 4 0.6 2 0 4-0.6 2-0.6 3.2-1.3 1.2-0.8 2.2-1.4 1-0.5 1.3-0.5 1.8 0 3.3 0.5 1.5 0.5 2.6 1.5 1 0.9 1.8 2.2 0.8 1.3 1.3 2.6 0.5 1.4 0.8 3 0.3 1.6 0.4 3 0.1 1.4 0.1 2.8zm-21-34.9q-4.7 0-8.1 3.1-3.4 3.1-3.4 7.4 0 4.3 3.4 7.4 3.4 3.1 8.1 3.1 4.7 0 8.1-3.1 3.4-3.1 3.4-7.4 0-4.3-3.4-7.4-3.4-3.1-8.1-3.1z"
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
