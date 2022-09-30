<script lang="ts">
    export let callback = () => {};
</script>

<svg
    version="1.2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="48"
    height="48"
    on:click={callback}
    >><defs
        ><linearGradient
            id="OPTIONSMENU"
            gradientUnits="userSpaceOnUse"
        /><linearGradient
            id="optionsmenu"
            x1="47"
            y1="9.6"
            x2="1"
            y2="38.4"
            href="#OPTIONSMENU"
            ><stop stop-color="#b98bff" /><stop
                offset="1"
                stop-color="#710fff"
            /></linearGradient
        ></defs
    ><style>
        .optionsmenu {
            fill: url(#optionsmenu);
            stroke-width: 0;
        }
    </style><path
        class="optionsmenu"
        fill-rule="evenodd"
        d="m28 14.5h-6.7q-1.4 0-2.3-0.8-1-0.8-1-2v-5.8q0-1.2 1-2.1 0.9-0.8 2.3-0.8h6.7q1.4 0 2.4 0.8 1 0.9 1 2.1v5.8q0 1.2-1 2-1 0.8-2.4 0.8zm2.4 14.6q1-0.8 1-2v-5.8q0-1.2-1-2.1-1-0.8-2.4-0.8h-6.7q-1.4 0-2.3 0.8-1 0.9-1 2.1v5.8q0 1.2 1 2 0.9 0.8 2.3 0.8h6.7q1.4 0 2.4-0.8zm0 15.4q1-0.9 1-2.1v-5.7q0-1.2-1-2.1-1-0.8-2.4-0.8h-6.7q-1.4 0-2.3 0.8-1 0.9-1 2.1v5.7q0 1.2 1 2.1 0.9 0.8 2.3 0.8h6.7q1.4 0 2.4-0.8z"
    /></svg
>

<style>
    svg {
        transition: 250ms;
        border-radius: 10px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    svg:hover {
        background: rgb(255, 255, 255, 0.1);
    }

    @media screen and (max-width: 520px) {
        svg {
            width: 38px;
            height: 38px;
        }
    }
</style>
