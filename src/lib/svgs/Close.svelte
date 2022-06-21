<script>
    import { modalVisible } from 'src/stores/app/main';
</script>

<svg
    on:click={() => ($modalVisible = false)}
    version="1.2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 40"
    width="40"
    height="40"
    ><defs
        ><linearGradient
            id="CLOSE"
            gradientUnits="userSpaceOnUse"
        /><linearGradient
            id="close"
            x1="47"
            y1="9.6"
            x2="1"
            y2="38.4"
            href="#CLOSE"
            ><stop stop-color="#b98bff" /><stop
                offset="1"
                stop-color="#710fff"
            /></linearGradient
        ></defs
    ><style>
        .close {
            fill: url(#close);
        }
    </style><path
        class="close"
        d="m38.3 29.5q0.9 0.9 0.9 2.2 0 1.3-0.9 2.2l-4.4 4.4q-0.9 0.9-2.2 0.9-1.3 0-2.2-0.9l-9.5-9.5-9.5 9.5q-0.9 0.9-2.2 0.9-1.3 0-2.2-0.9l-4.4-4.4q-0.9-0.9-0.9-2.2 0-1.3 0.9-2.2l9.5-9.5-9.5-9.5q-0.9-0.9-0.9-2.2 0-1.3 0.9-2.2l4.4-4.4q0.9-0.9 2.2-0.9 1.3 0 2.2 0.9l9.5 9.5 9.5-9.5q0.9-0.9 2.2-0.9 1.3 0 2.2 0.9l4.4 4.4q0.9 0.9 0.9 2.2 0 1.3-0.9 2.2l-9.5 9.5 9.5 9.5z"
    /></svg
>

<style>
    svg {
        cursor: pointer;
        margin-right: 10px;
        transition: 100ms all;
    }

    svg:hover {
        opacity: 0.8;
    }

    svg:active {
        transform: scale(0.9);
    }

    @media screen and (max-width: 700px) {
        svg {
            cursor: default;
            width: 35px;
            height: 35px;
        }
    }

    @media screen and (max-width: 520px) {
        svg {
            cursor: default;
            width: 30px;
            height: 30px;
        }
    }
</style>
