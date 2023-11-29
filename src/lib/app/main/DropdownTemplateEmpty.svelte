<div class="dropdown-container">
    <slot />
</div>

<style>
    .dropdown-container {
        display: flex;
        flex-direction: column;
        justify-content: start;
        border-radius: 0px;
        background: var(--primary);
        box-shadow: 0 0 5px var(--bg);
        overflow: hidden;
    }
</style>
