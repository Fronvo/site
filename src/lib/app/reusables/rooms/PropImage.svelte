<script lang="ts">
</script>

<div class="prop-container">
    <div class="top">
        <span id="avatar" />
        <span id="name" />
    </div>

    <span id="attachment" />
</div>

<style>
    .prop-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 5px;
        margin-bottom: 5px;
        flex: 1;
        display: inline-block;
        mask: linear-gradient(-60deg, #000 40%, #0005, #000 70%) right/300% 100%;
        -webkit-mask: linear-gradient(-60deg, #000 40%, #0005, #000 70%)
            right/300% 100%;
        background-repeat: no-repeat;
        animation: shimmer 2.5s infinite;
    }

    .top {
        display: flex;
        align-items: center;
    }

    #avatar {
        width: 36px;
        height: 36px;
        background: var(--primary);
        border-radius: 30px;
        margin-right: 5px;
    }

    #name {
        width: 150px;
        height: 20px;
        border-radius: 30px;
        background: var(--primary);
    }

    #attachment {
        display: inline-block;
        width: 250px;
        height: 250px;
        background: var(--primary);
        border-radius: 10px;
        margin-top: 5px;
    }

    @keyframes shimmer {
        100% {
            -webkit-mask-position: left;
        }
    }
</style>
