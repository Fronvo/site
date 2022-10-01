<script lang="ts">
    import { scale } from 'svelte/transition';
</script>

<div
    class="header-container"
    in:scale={{ duration: 750, start: 0.9, delay: 300 }}
    out:scale={{ duration: 400, start: 0.9 }}
>
    <img
        id="icon"
        src="/svgs/profile/default.svg"
        alt="Fronvo logo header"
        draggable={false}
    />
    <h1 id="title">Fronvo</h1>
</div>

<style>
    .header-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 2rem;
    }

    .header-container #icon {
        width: 90px;
        margin-right: 5px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border-radius: 5px;
    }

    .header-container #title {
        font-size: 4rem;
        color: var(--profile_info_color);
        margin: 0;
        color: white;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    @media screen and (max-width: 520px) {
        .header-container #icon {
            width: 70px;
        }

        .header-container #title {
            font-size: 3.5rem;
        }
    }

    @media screen and (max-height: 900px) {
        .header-container #title {
            display: none;
        }

        .header-container #icon {
            display: none;
        }
    }
</style>
