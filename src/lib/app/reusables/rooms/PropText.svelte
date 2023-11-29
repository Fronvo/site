<script lang="ts">
</script>

<div class="prop-container">
    <div class="top">
        <span id="avatar" />
        <span id="name" />
    </div>

    <div class="content">
        <span id="text" />
        <span id="text-2" />
        <span id="text-3" />
        <span id="text-2" />
        <span id="text" />
    </div>
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
        background: var(--secondary);
        border-radius: 30px;
        margin-right: 5px;
    }

    #name {
        width: 150px;
        height: 20px;
        border-radius: 30px;
        background: var(--secondary);
    }

    .content {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    #text {
        width: 125px;
        height: 20px;
        border-radius: 30px;
        background: var(--secondary);
        margin-top: 5px;
        margin-right: 5px;
    }

    #text-2 {
        width: 75px;
        height: 20px;
        border-radius: 30px;
        background: var(--secondary);
        margin-top: 5px;
        margin-right: 5px;
    }

    #text-3 {
        width: 50px;
        height: 20px;
        border-radius: 30px;
        background: var(--secondary);
        margin-top: 5px;
        margin-right: 5px;
    }

    @keyframes shimmer {
        100% {
            -webkit-mask-position: left;
        }
    }
</style>
