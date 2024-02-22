<div class="dropdown-container">
    <slot />
</div>

<style>
    .dropdown-container {
        display: flex;
        flex-direction: column;
        justify-content: start;
        border-radius: 2px;
        background: rgb(80, 80, 80, 0.3);
        backdrop-filter: blur(10px);
        overflow: hidden;
    }
</style>
