<script lang="ts">
    import { isMobile } from 'stores/main';
</script>

<div class={`prop-container ${$isMobile ? 'mobile' : ''}`}>
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

    .mobile #avatar {
        background: var(--tertiary);
    }

    #name {
        width: 150px;
        height: 20px;
        border-radius: 30px;
        background: var(--primary);
    }

    .mobile #name {
        background: var(--tertiary);
    }

    #attachment {
        display: inline-block;
        width: 250px;
        height: 250px;
        background: var(--primary);
        border-radius: 10px;
        margin-top: 5px;
    }

    .mobile #attachment {
        background: var(--tertiary);
    }

    @keyframes shimmer {
        100% {
            -webkit-mask-position: left;
        }
    }
</style>
