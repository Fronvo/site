<script lang="ts">
    export let opacity: number;
</script>

<div class="room-container" style={`opacity: ${opacity}`}>
    <div class="img" />
    <div class="name" />
</div>

<style>
    .room-container {
        display: flex;
        align-items: center;
        width: 100%;
        margin-top: 15px;
        margin-bottom: 15px;
        margin-left: 10px;
    }

    .img {
        width: 32px;
        height: 32px;
        background: var(--tertiary);
        border-radius: 100px;
        margin-right: 10px;
    }

    .name {
        width: 150px;
        height: 20px;
        background: var(--tertiary);
        border-radius: 20px;
    }
</style>
