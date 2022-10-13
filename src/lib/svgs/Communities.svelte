<script lang="ts">
    import { PanelTypes } from 'types/app/main';
    import { switchPanel } from 'utilities/app/main';
</script>

<svg
    version="1.2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="48"
    height="48"
    on:click={() => switchPanel(PanelTypes.Communities)}
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
        class="communities"
        d="M11.5 42q-3.15 0-5.325-2.175Q4 37.65 4 34.5q0-3.15 2.175-5.325Q8.35 27 11.5 27q3.15 0 5.325 2.175Q19 31.35 19 34.5q0 3.15-2.175 5.325Q14.65 42 11.5 42Zm25.05 0q-3.15 0-5.325-2.175Q29.05 37.65 29.05 34.5q0-3.15 2.175-5.325Q33.4 27 36.55 27q3.15 0 5.325 2.175Q44.05 31.35 44.05 34.5q0 3.15-2.175 5.325Q39.7 42 36.55 42ZM11.5 39q1.85 0 3.175-1.325Q16 36.35 16 34.5q0-1.85-1.325-3.175Q13.35 30 11.5 30q-1.85 0-3.175 1.325Q7 32.65 7 34.5q0 1.85 1.325 3.175Q9.65 39 11.5 39Zm25.05 0q1.85 0 3.175-1.325Q41.05 36.35 41.05 34.5q0-1.85-1.325-3.175Q38.4 30 36.55 30q-1.85 0-3.175 1.325Q32.05 32.65 32.05 34.5q0 1.85 1.325 3.175Q34.7 39 36.55 39Zm-12.5-18.05q-3.15 0-5.325-2.175Q16.55 16.6 16.55 13.45q0-3.15 2.175-5.325Q20.9 5.95 24.05 5.95q3.15 0 5.325 2.175Q31.55 10.3 31.55 13.45q0 3.15-2.175 5.325Q27.2 20.95 24.05 20.95Zm0-3q1.85 0 3.175-1.325Q28.55 15.3 28.55 13.45q0-1.85-1.325-3.175Q25.9 8.95 24.05 8.95q-1.85 0-3.175 1.325Q19.55 11.6 19.55 13.45q0 1.85 1.325 3.175Q22.2 17.95 24.05 17.95Zm0-4.5Zm12.5 21.05Zm-25.05 0Z"
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
