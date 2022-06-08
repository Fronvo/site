<div class="center-container">
    <slot>
        <h1>No content</h1>
    </slot>
</div>

<style>
    .center-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: max-content;
        height: fit-content;
        margin: auto;
    }
</style>
