<script lang="ts">
    import { isMobile } from 'stores/main';

    export let opacity: number;
</script>

<div
    class={`prop-container ${$isMobile ? 'mobile' : ''}`}
    style={`opacity: ${opacity}`}
>
    <div class="top">
        <span id="avatar" />
        <span id="name" />
    </div>

    <span id="attachment" />
</div>

<style>
    .prop-container {
        display: flex;
        flex-direction: column;
        margin-bottom: 30px;
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
        width: 500px;
        height: 500px;
        background: var(--primary);
        border-radius: 10px;
        margin-top: 5px;
    }

    .mobile #attachment {
        background: var(--tertiary);
    }

    @media screen and (max-width: 850px) {
        .mobile #attachment {
            width: 300px;
            height: 300px;
        }
    }

    @keyframes shimmer {
        100% {
            -webkit-mask-position: left;
        }
    }
</style>
