<script lang="ts">
    import { isMobile } from 'stores/main';

    export let opacity: number;
</script>

<div
    class={`prop-container ${$isMobile ? 'mobile' : ''}`}
    style={`opacity: ${opacity}`}
>
    <span id="attachment" />
</div>

<style>
    .prop-container {
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
        margin-right: 10px;
        margin-left: 10px;
    }

    .top {
        display: flex;
        align-items: center;
    }

    #attachment {
        display: inline-block;
        width: 150px;
        height: 150px;
        background: rgb(255, 255, 255);
        border-radius: 10px;
        margin-top: 5px;
    }

    .mobile #attachment {
        background: rgb(255, 255, 255);
    }

    @media screen and (max-width: 850px) {
        .mobile #attachment {
            width: 80px;
            height: 80px;
        }
    }
</style>
