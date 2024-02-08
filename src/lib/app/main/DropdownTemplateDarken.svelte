<div class="dropdown-container">
    <slot />
</div>

<style>
    .dropdown-container {
        display: flex;
        flex-direction: column;
        justify-content: start;
        border-radius: 2px;
        background: rgb(100, 100, 100, 0.1);
        backdrop-filter: blur(10px);
        overflow: hidden;
    }
</style>
