<div class="dropdown-container">
    <slot />
</div>

<style>
    .dropdown-container {
        display: flex;
        flex-direction: column;
        justify-content: start;
        background: rgb(15, 15, 15, 0.5);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        border: 1px solid var(--primary);
        overflow: hidden;
    }
</style>
