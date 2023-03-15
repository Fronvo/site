<h1><slot /></h1>

<style>
    h1 {
        color: var(--profile_info_color);
        text-align: center;
        font-size: 2.5rem;
        margin: 0px 10px 15px 10px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    @media screen and (max-width: 850px) {
        h1 {
            font-size: 1.5rem;
        }
    }
</style>
