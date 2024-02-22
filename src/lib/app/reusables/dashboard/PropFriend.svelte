<script lang="ts">
    export let opacity: number;
</script>

<div class="prop-container" style={`opacity: ${opacity}`}>
    <div class="top">
        <span id="avatar" />
        <span id="name" />
    </div>
</div>

<style>
    .prop-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 30px;
        margin-right: 20px;
        margin-left: 20px;
        flex: 1;
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
        margin-right: 10px;
    }

    #name {
        width: 200px;
        height: 20px;
        border-radius: 30px;
        background: var(--primary);
    }

    @keyframes shimmer {
        100% {
            -webkit-mask-position: left;
        }
    }
</style>
