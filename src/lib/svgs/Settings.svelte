<script>
    import { showModal } from 'utilities/app/main';
</script>

<svg
    version="1.2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="48"
    height="48"
    on:click={() => {
        showModal('Settings');
    }}
    ><defs
        ><linearGradient
            id="SETTINGS"
            gradientUnits="userSpaceOnUse"
        /><linearGradient
            id="settings"
            x1="47"
            y1="9.6"
            x2="1"
            y2="38.4"
            href="#SETTINGS"
            ><stop stop-color="#b98bff" /><stop
                offset="1"
                stop-color="#710fff"
            /></linearGradient
        ></defs
    ><style>
        .settings {
            fill: url(#settings);
            stroke-width: 0;
        }
    </style><path
        class="settings"
        d="m24 31q-2.9 0-4.9-2.1-2.1-2-2.1-4.9 0-2.9 2.1-4.9 2-2.1 4.9-2.1 2.9 0 4.9 2.1 2.1 2 2.1 4.9 0 2.9-2.1 4.9-2 2.1-4.9 2.1zm20.8-10.6q-0.2-0.3-0.6-0.4l-5-0.7q-0.4-1.3-1.1-2.7 0.5-0.7 1.5-1.9 0.9-1.3 1.4-1.9 0.2-0.3 0.2-0.6 0-0.4-0.2-0.6-1-1.4-4.5-4.6-0.4-0.3-0.7-0.3-0.4 0-0.7 0.2l-3.9 3q-1.1-0.6-2.4-1l-0.8-5.1q0-0.3-0.3-0.6-0.3-0.2-0.7-0.2h-6q-0.8 0-1 0.8-0.4 1.3-0.8 5.1-1.3 0.4-2.5 1l-3.8-2.9q-0.3-0.3-0.7-0.3-0.6 0-2.6 1.9-2 2-2.7 3-0.2 0.3-0.2 0.6 0 0.3 0.3 0.7 1.8 2.2 2.9 3.7-0.7 1.3-1.1 2.6l-5.1 0.7q-0.3 0.1-0.5 0.4-0.2 0.3-0.2 0.6v6.1q0 0.3 0.2 0.6 0.2 0.3 0.6 0.4l5 0.7q0.4 1.3 1.1 2.7-0.5 0.7-1.5 1.9-0.9 1.3-1.4 1.9-0.2 0.3-0.2 0.6 0 0.3 0.2 0.6 1.1 1.5 4.5 4.6 0.3 0.3 0.7 0.3 0.4 0 0.7-0.2l3.9-3q1.1 0.6 2.4 1l0.8 5.1q0 0.3 0.3 0.6 0.3 0.2 0.7 0.2h6q0.8 0 1-0.8 0.4-1.3 0.8-5.1 1.3-0.4 2.5-1l3.8 3q0.4 0.2 0.7 0.2 0.6 0 2.6-1.9 1.9-2 2.7-3 0.2-0.3 0.2-0.6 0-0.4-0.3-0.7-1.9-2.4-2.9-3.8 0.6-1 1.1-2.5l5-0.7q0.4-0.1 0.6-0.4 0.2-0.3 0.2-0.6v-6.1q0-0.3-0.2-0.6z"
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
            cursor: default;
        }
    }

    @media screen and (max-width: 520px) {
        svg {
            width: 40px;
            height: 40px;
        }
    }
</style>
