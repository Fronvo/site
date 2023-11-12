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
        width: 190px;
        margin: 15px;
    }

    .img {
        width: 32px;
        height: 32px;
        background: var(--secondary);
        border-radius: 100px;
        margin-right: 10px;
    }

    .name {
        width: 130px;
        height: 20px;
        background: var(--secondary);
        border-radius: 20px;
    }
</style>
