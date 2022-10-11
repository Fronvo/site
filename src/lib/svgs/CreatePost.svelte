<script lang="ts">
    import { ModalTypes } from 'types/app/main';
    import { showModal } from 'utilities/app/main';
</script>

<svg
    version="1.2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="48"
    height="48"
    on:click={() => showModal(ModalTypes.CreatePost)}
    ><defs
        ><linearGradient
            id="CREATE"
            gradientUnits="userSpaceOnUse"
        /><linearGradient
            id="create"
            x1="47"
            y1="9.6"
            x2="1"
            y2="38.4"
            href="#CREATE"
            ><stop stop-color="#b98bff" /><stop
                offset="1"
                stop-color="#710fff"
            /></linearGradient
        ></defs
    ><style>
        .create {
            fill: url(#create);
        }
    </style><path
        class="create"
        d="M25.5 29.1h3v-6.6h6.6v-3h-6.6v-6.6h-3v6.6h-6.6v3h6.6ZM13 38q-1.2 0-2.1-.9-.9-.9-.9-2.1V7q0-1.2.9-2.1.9-.9 2.1-.9h28q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h28V7H13v28Zm-6 9q-1.2 0-2.1-.9Q4 42.2 4 41V10h3v31h31v3Zm6-37v28V7Z"
    /></svg
>

<style>
    svg {
        cursor: pointer;
        transition: 100ms transform;
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
        }
    }
</style>
