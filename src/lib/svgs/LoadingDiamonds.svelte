<span>
    <div />
    <div />
    <div />
</span>

<style>
    span {
        width: 164px;
        height: calc(25px);
        position: relative;
        display: block;
    }

    div {
        width: calc(164px / 4);
        height: calc(164px / 4);
        position: absolute;
        left: 0%;
        background: transparent;
        border: 5px solid var(--branding);
        border-radius: 10px;
        transform: translateX(-120%) rotate(45deg) scale(0);
        animation: diamonds 1.5s linear infinite;
        box-shadow: 0 0 30px var(--branding);
    }

    div:nth-child(1) {
        animation-delay: calc(1.5s * 2 / 3 * -1);
    }

    div:nth-child(2) {
        animation-delay: calc(1.5s * 2 / 3 * -2);
    }

    div:nth-child(3) {
        animation-delay: calc(1.5s * 2 / 3 * -3);
    }

    @keyframes diamonds {
        25% {
            left: 25%;
            transform: translateX(-100%) rotate(45deg) scale(1);
        }

        100% {
            left: 110%;
            transform: translateX(-75%) rotate(45deg) scale(0);
        }
    }
</style>
