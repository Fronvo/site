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
            id="DELETEOPTION"
            gradientUnits="userSpaceOnUse"
        /><linearGradient
            id="deleteoption"
            x1="47"
            y1="9.6"
            x2="1"
            y2="38.4"
            href="#DELETEOPTION"
            ><stop stop-color="#b98bff" /><stop
                offset="1"
                stop-color="#710fff"
            /></linearGradient
        ></defs
    ><style>
        .deleteoption {
            fill: url(#deleteoption);
            stroke-width: 0;
        }
    </style><path
        class="deleteoption"
        fill-rule="evenodd"
        d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z"
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
            width: 34px;
            height: 34px;
        }
    }
</style>
