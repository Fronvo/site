<script lang="ts">
    // Used for future custom avatar URLs
    export let url: string = undefined;
</script>

<!-- TODO: Default to svg fronvo avatar, on the site hosted -->
{#if !url}
    <svg
        version="1.2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="48"
        height="48"
        ><defs
            ><linearGradient
                id="AVATAR"
                gradientUnits="userSpaceOnUse"
            /><linearGradient
                id="avatar"
                x1="47.1"
                y1="9.6"
                x2="1"
                y2="38.4"
                href="#AVATAR"
                ><stop stop-color="#b98bff" /><stop
                    offset="1"
                    stop-color="#710fff"
                /></linearGradient
            ></defs
        ><style>
            .avatar {
                fill: url(#avatar);
                stroke-width: 0;
            }
        </style><path
            class="avatar"
            d="m13 19.4l6.8 15.9-14-15.9zm3.1 0h15.7l-7.8 18.5zm-10.9-3.1l6.5-9.2h5.9l-4.6 9.2zm29.7 3.1h7.3l-14 15.9zm-14.1-12.2h6.2l4.6 9.2h-15.4zm9.4 0h5.9l6.5 9.2h-7.8zm6.6-3.1h-25.9q-0.7 0-1.1 0.6l-8.7 12.3q-0.3 0.5-0.3 1 0 0.6 0.4 1l21.6 24.6q0.4 0.5 1.1 0.5 0.6 0 1-0.5l21.6-24.6q0.4-0.4 0.4-1 0.1-0.5-0.3-1l-8.6-12.3q-0.4-0.6-1.2-0.6z"
        /></svg
    >
{:else}
    <img src={url} alt="Avatar" draggable={false} />
{/if}

<style>
    svg,
    img {
        cursor: pointer;
        transition: 100ms all;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    svg {
        margin-bottom: 15px;
        margin-top: 10px;
    }

    img {
        width: 60px;
        height: 60px;
        border-radius: 10px;
    }

    svg:hover,
    img:hover {
        opacity: 0.8;
    }

    svg:active,
    img:active {
        transform: scale(0.95);
    }

    @media screen and (max-width: 720px) {
        svg {
            margin-bottom: 0;
            margin-top: 0;
            margin-right: 20px;
            cursor: default;
            margin-left: 10px;
        }

        img {
            width: 48px;
            height: 48px;
            cursor: default;
        }

        svg:hover,
        img:hover {
            opacity: 1;
        }
    }

    @media screen and (max-width: 520px) {
        svg {
            width: 40px;
            height: 40px;
            margin-right: 10px;
            margin-left: 5px;
        }

        img {
            width: 40px;
            height: 40px;
        }
    }
</style>
