<script lang="ts">
    import { scale } from 'svelte/transition';
</script>

<header
    in:scale={{ duration: 750, start: 0.9, delay: 300 }}
    out:scale={{ duration: 400, start: 0.9 }}
>
    <img
        id="icon"
        src="/svgs/profile/default.svg"
        alt="Icon"
        draggable={false}
    />
    <h1 id="title">Fronvo</h1>
</header>

<style>
    header {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 2rem;
    }

    #icon {
        width: 80px;
        margin-right: 5px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border-radius: 5px;
    }

    #title {
        font-size: 3.5rem;
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
</style>
