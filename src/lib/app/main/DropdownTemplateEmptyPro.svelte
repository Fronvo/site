<div class="dropdown-container">
    <slot />
</div>

<style>
    .dropdown-container {
        display: flex;
        flex-direction: column;
        justify-content: start;
        border: 1px solid var(--primary);
        border-radius: 10px;
        box-shadow: 0 0 5px rgb(0, 175, 175);
        background: var(--bg);
        overflow: hidden;
    }
</style>
