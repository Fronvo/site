<script lang="ts">
    import { accountPanelAnimDuration } from 'stores/account';
    import { fly, slide } from 'svelte/transition';
</script>

<div in:slide={{ duration: accountPanelAnimDuration }} out:fly={{ y: 50 }}>
    <slot />
</div>

<style>
    div {
        position: fixed;
        border-radius: 10px;
        background: var(--bg_color);
        padding: 20px 30px 20px 30px;
        box-shadow: 0 0 5px black;
        text-align: center;
        width: 550px;
    }

    @media screen and (max-width: 700px) {
        div {
            min-width: 350px;
            width: 50vw;
        }
    }
</style>
