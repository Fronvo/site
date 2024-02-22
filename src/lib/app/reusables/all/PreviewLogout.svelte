<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';

    export let profileData: FronvoAccount;
</script>

<div class="switch-container">
    <img
        id="avatar"
        src={profileData.avatar ? profileData.avatar : '/images/avatar.png'}
        alt={`${profileData.username}'s avatar`}
        draggable={false}
    />

    <div class="bottom-container">
        <h1 id="username">{profileData?.profileId}</h1>
    </div>
</div>

<style>
    .switch-container {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        background: transparent;
        cursor: default;
        width: 70%;
        padding: 8px;
        margin-bottom: 10px;
        border: 2px solid white;
        border-radius: 5px;
    }

    div h1 {
        margin: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    #avatar {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        width: 36px;
        height: 36px;
        border-radius: 30px;
        margin-right: 8px;
    }

    .bottom-container {
        display: flex;
        flex-direction: column;
    }

    #username {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-size: 1.1rem;
        color: white;
    }
</style>
