<script lang="ts">
    export let avatar: string;
</script>

<div class="top-container">
    {#if avatar}
        <img id="avatar" src={avatar} alt={`${avatar}`} draggable={false} />
    {:else}
        <img
            src="/images/avatar.svg"
            draggable={false}
            alt="Avatar"
            id="avatar"
        />
    {/if}
</div>

<style>
    .top-container {
        display: flex;
        align-items: center;
        flex: 1;
        width: 100%;
    }

    img {
        border: 20px solid var(--primary);
    }

    #avatar {
        width: 128px;
        height: 128px;
        border: 7px solid var(--primary);
        border-radius: 100px;
        transition: 150ms;
        margin-left: 20px;
        transform: translateY(-80px);
        background: var(--modal_content_bg);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>
