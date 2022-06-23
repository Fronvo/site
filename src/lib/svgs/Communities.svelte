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
    on:click={() => switchPanel('Communities')}
    ><defs
        ><linearGradient
            id="COMMUNITIES"
            gradientUnits="userSpaceOnUse"
        /><linearGradient
            id="communities"
            x1="47"
            y1="9.6"
            x2="1"
            y2="38.4"
            href="#COMMUNITIES"
            ><stop stop-color="#b98bff" /><stop
                offset="1"
                stop-color="#710fff"
            /></linearGradient
        ></defs
    ><style>
        .communities {
            fill: url(#communities);
            stroke-width: 0;
        }
    </style><path
        in:draw={{ duration: 1000, easing: quadIn }}
        class={$currentPanelId == 2 ? 'communities' : ''}
        d="m40.8 27.1q0 0.1 0 0.2v14.5q0 0.8-0.5 1.4-0.6 0.6-1.3 0.6h-11.1v-11.6h-7.4v11.6h-11q-0.8 0-1.3-0.6-0.6-0.6-0.6-1.4v-14.5q0 0 0-0.1 0.1 0 0.1-0.1l16.5-14.3 16.6 14.3zm6.7-2.6q-0.1-0.4-0.3-0.6l-6.4-5.5v-12.3q0-0.5-0.2-0.7-0.3-0.3-0.7-0.3h-5.5q-0.4 0-0.7 0.3-0.2 0.2-0.2 0.7v5.8l-7.1-6.1q-0.9-0.8-2.2-0.8-1.2 0-2.2 0.8l-20.7 18.1q-0.3 0.2-0.3 0.6 0 0.4 0.2 0.7l1.8 2.3q0.2 0.2 0.6 0.3 0.3 0 0.7-0.2l19.9-17.4 20 17.4q0.2 0.2 0.6 0.2h0.1q0.4-0.1 0.6-0.3l1.8-2.3q0.2-0.3 0.2-0.7z"
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
</style>
