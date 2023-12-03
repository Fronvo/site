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
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    .top {
        display: flex;
        align-items: center;
    }

    #avatar {
        width: 26px;
        height: 26px;
        background: var(--secondary);
        border-radius: 10px;
        margin-right: 10px;
    }

    #name {
        width: 150px;
        height: 20px;
        border-radius: 30px;
        background: var(--secondary);
    }

    @keyframes shimmer {
        100% {
            -webkit-mask-position: left;
        }
    }
</style>
