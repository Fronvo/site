<script lang="ts">
    export let color: string;
</script>

<div class="icon-container">
    <div id="icon" style={`background: ${color}`} />
</div>

<style>
    .icon-container {
        display: flex;
        align-items: center;
        flex: 1;
        width: 100%;
    }

    #icon {
        width: 100px;
        height: 100px;
        border-radius: 100px;
        transition: 150ms;
        margin-left: 20px;
        background: var(--modal_content_bg);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: default;
        margin-top: 10px;
    }
</style>
