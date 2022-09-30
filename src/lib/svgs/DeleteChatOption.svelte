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
        d="m18.6 37.9q-0.3 0.3-0.6 0.3h-1.8q-0.4 0-0.6-0.3-0.2-0.2-0.2-0.6v-18.7q0-0.4 0.2-0.6 0.2-0.2 0.6-0.2h1.8q0.3 0 0.6 0.2 0.2 0.2 0.2 0.6v18.7q0 0.4-0.2 0.6zm6.9 0q-0.3 0.3-0.6 0.3h-1.8q-0.3 0-0.6-0.3-0.2-0.2-0.2-0.6v-18.7q0-0.4 0.2-0.6 0.3-0.2 0.6-0.2h1.8q0.3 0 0.6 0.2 0.2 0.2 0.2 0.6v18.7q0 0.4-0.2 0.6zm6.9 0q-0.2 0.3-0.6 0.3h-1.8q-0.3 0-0.6-0.3-0.2-0.2-0.2-0.6v-18.7q0-0.4 0.2-0.6 0.3-0.2 0.6-0.2h1.8q0.4 0 0.6 0.2 0.2 0.2 0.2 0.6v18.7q0 0.4-0.2 0.6zm-13.1-30.1q0.2-0.2 0.4-0.3h8.6q0.3 0.1 0.4 0.3l1.3 3.2h-12zm23.4 3.3q-0.2-0.2-0.6-0.2h-8.3l-1.9-4.5q-0.4-1-1.5-1.7-1-0.6-2.1-0.6h-8.6q-1.1 0-2.2 0.6-1 0.7-1.4 1.7l-1.9 4.5h-8.4q-0.3 0-0.6 0.2-0.2 0.2-0.2 0.6v1.7q0 0.4 0.2 0.6 0.3 0.3 0.6 0.3h2.6v25.3q0 2.2 1.3 3.7 1.3 1.6 3.1 1.6h22.4q1.8 0 3.1-1.6 1.2-1.6 1.2-3.8v-25.2h2.6q0.4 0 0.6-0.3 0.3-0.2 0.3-0.6v-1.7q0-0.4-0.3-0.6z"
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
