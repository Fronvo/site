<script>
    import { ourData } from 'stores/profile';
</script>

<div class={`dropdown-container ${$ourData.appliedTheme ? 'themed' : ''}`}>
    <slot />
</div>

<style>
    .dropdown-container {
        display: flex;
        flex-direction: column;
        justify-content: start;
        background: var(--bg);
        border: 2px solid var(--pro);
        box-shadow: 0 0 5px var(--pro);
        border-radius: 10px;
        overflow: hidden;
    }

    .themed {
        border: 2px solid var(--branding);
        box-shadow: 0 0 5px var(--branding);
    }
</style>
