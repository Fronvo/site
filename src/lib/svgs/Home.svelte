<script>
    import { currentPanelId, PanelTypes } from 'stores/panels';
</script>

<svg
    version="1.2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="48"
    height="48"
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
            <stop stop-color="var(--profile_info_color)" /><stop
                offset="1"
                stop-color="var(--profile_info_color)"
            /></linearGradient
        ></defs
    ><style>
        .svg {
            fill: url(#svg);
        }

        .warn {
            fill: #ff0000;
        }
    </style><path
        class={`svg`}
        d={`${
            $currentPanelId == PanelTypes.Home
                ? 'm9.3 40.9v-19.4l-4.2 3.2-1.5-1.9 5.7-4.3v-5.4h2.4v3.6l12.4-9.4 20.3 15.5-1.4 1.8-4.1-3.1v19.4h-12.7v-11.1h-4.2v11.1zm0-30.3q0-2 1.4-3.4 1.4-1.4 3.5-1.4 1.2 0 1.9-0.7 0.6-0.7 0.7-1.7h2.4q-0.1 2-1.4 3.4-1.4 1.4-3.6 1.4-1.2 0-1.8 0.7-0.7 0.7-0.7 1.7z'
                : 'm9.3 40.9v-19.4l-4.2 3.2-1.5-1.9 5.7-4.3v-5.4h2.4v3.6l12.4-9.4 20.3 15.5-1.4 1.8-4.1-3.1v19.4zm2.4-2.4h10.3v-8.7h4.1v8.7h10.4v-18.8l-12.4-9.4-12.4 9.4zm-2.4-27.9q0-2 1.4-3.4 1.3-1.4 3.5-1.4 1.2 0 1.8-0.8 0.7-0.7 0.7-1.7h2.4q0 2-1.4 3.4-1.3 1.5-3.5 1.5-1.2 0-1.8 0.7-0.7 0.7-0.7 1.7zm2.4 27.9h24.8z'
        }`}
    /></svg
>

<style>
    svg {
        width: 36px;
        height: 36px;
    }
</style>
