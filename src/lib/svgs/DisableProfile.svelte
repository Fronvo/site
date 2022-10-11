<script lang="ts">
    import { socket } from 'src/stores/global';
    import { userData } from 'src/stores/app/profile';

    function toggleDisable(): void {
        socket.emit(
            'toggleDisableAccount',
            { profileId: $userData.profileId },
            ({ err }) => {
                if (!err) {
                    $userData.isDisabled = !$userData.isDisabled;
                }
            }
        );
    }
</script>

<svg
    version="1.2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="48"
    height="48"
    on:click={toggleDisable}
    ><defs
        ><linearGradient
            id="DISABLE"
            gradientUnits="userSpaceOnUse"
        /><linearGradient
            id="disable"
            x1="47"
            y1="9.6"
            x2="1"
            y2="38.4"
            href="#DISABLE"
            ><stop stop-color="#b98bff" /><stop
                offset="1"
                stop-color="#710fff"
            /></linearGradient
        ></defs
    ><style>
        .disable {
            fill: url(#disable);
            stroke-width: 0;
        }
    </style><path
        class="disable"
        d={!$userData.isDisabled
            ? 'm29.3 23-9.65-9.65q.8-.7 1.925-1.1 1.125-.4 2.425-.4 2.85 0 4.825 1.975T30.8 18.65q0 1.3-.4 2.425Q30 22.2 29.3 23ZM11.25 35.2q3.15-2.15 6.125-3.3T24 30.75q1.9 0 3.4.275t2.65.725l-6.3-6.3q-2.75-.15-4.5-1.825t-2-4.425l-6.2-6.2q-1.9 2.25-2.9 4.975-1 2.725-1 6.025 0 3 .925 5.75t3.175 5.45Zm25.8-.3q1.8-2.1 2.825-4.85Q40.9 27.3 40.9 24q0-7.2-4.85-12.05Q31.2 7.1 24 7.1q-3.5 0-6.2 1.05t-4.75 2.75ZM24 43.75q-4.05 0-7.675-1.55t-6.3-4.25Q7.35 35.25 5.8 31.675 4.25 28.1 4.25 24t1.55-7.675q1.55-3.575 4.25-6.275t6.275-4.25Q19.9 4.25 24 4.25t7.675 1.55q3.575 1.55 6.275 4.225T42.2 16.3q1.55 3.6 1.55 7.7 0 4.05-1.55 7.675t-4.225 6.3Q35.3 40.65 31.7 42.2q-3.6 1.55-7.7 1.55Zm0-2.9q2.95 0 5.425-.825Q31.9 39.2 34.5 37.3q-2.55-1.85-5.175-2.775Q26.7 33.6 24 33.6t-5.3.925q-2.6.925-5.2 2.775 2.6 1.9 5.1 2.725 2.5.825 5.4.825Zm0-3.6Z'
            : 'M11.25 35.2q3.15-2.15 6.2-3.3 3.05-1.15 6.55-1.15 3.55 0 6.6 1.15t6.25 3.3q2.2-2.7 3.125-5.425Q40.9 27.05 40.9 24q0-7.2-4.85-12.05Q31.2 7.1 24 7.1q-7.2 0-12.025 4.85T7.15 24q0 3.05.925 5.775Q9 32.5 11.25 35.2ZM24 25.45q-2.85 0-4.825-1.975T17.2 18.65q0-2.9 1.975-4.85Q21.15 11.85 24 11.85q2.9 0 4.85 1.975Q30.8 15.8 30.8 18.65t-1.975 4.825Q26.85 25.45 24 25.45Zm0 18.3q-4.05 0-7.65-1.575-3.6-1.575-6.275-4.25Q7.4 35.25 5.825 31.65 4.25 28.05 4.25 24q0-4.05 1.575-7.65 1.575-3.6 4.25-6.3 2.675-2.7 6.275-4.25 3.6-1.55 7.65-1.55 4.05 0 7.65 1.575 3.6 1.575 6.3 4.25 2.7 2.675 4.25 6.275 1.55 3.6 1.55 7.65 0 4.05-1.575 7.65-1.575 3.6-4.25 6.275-2.675 2.675-6.275 4.25-3.6 1.575-7.65 1.575Zm0-2.9q2.75 0 5.325-.775T34.5 37.3q-2.6-1.8-5.2-2.75T24 33.6q-2.65 0-5.275.925Q16.1 35.45 13.5 37.3q2.6 2 5.175 2.775 2.575.775 5.325.775Zm0-18.3q1.75 0 2.85-1.1t1.1-2.8q0-1.75-1.1-2.85T24 14.7q-1.7 0-2.8 1.1-1.1 1.1-1.1 2.85 0 1.7 1.1 2.8 1.1 1.1 2.8 1.1Zm0-3.9Zm0 18.6Z'}
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
