<script lang="ts">
    import { accountPanelAnimDuration } from 'stores/account';
    import { fade } from 'svelte/transition';
</script>

<div
    class="header-container"
    transition:fade={{ duration: accountPanelAnimDuration }}
>
    <img
        id="icon"
        src="/svgs/profile/avatar.svg"
        alt="Fronvo logo header"
        draggable={false}
    />
    <h1 id="title">Fronvo</h1>
</div>

<style>
    .header-container {
        position: fixed;
        width: 100%;
        top: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .header-container #icon {
        width: 90px;
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
