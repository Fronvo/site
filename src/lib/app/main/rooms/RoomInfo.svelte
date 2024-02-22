<script lang="ts">
    import {
        currentChannel,
        currentRoomData,
        currentRoomId,
        dmsShowProfile,
        isInServer,
    } from 'stores/rooms';

    function toggleProfileview(): void {
        $dmsShowProfile = !$dmsShowProfile;
    }
</script>

<div class="placeholder">
    <div class={`info-container ${!$currentRoomId ? 'empty' : ''}`}>
        <div class="data-container">
            {#if !$isInServer}
                <img
                    id="icon"
                    src={$currentRoomData?.dmUser.avatar
                        ? `${$currentRoomData.dmUser.avatar}/tr:w-56:h-56`
                        : '/images/avatar.png'}
                    draggable={false}
                    alt="Avatar"
                />
            {:else}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    ><path
                        fill="none"
                        stroke="var(--gray)"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M10 3L5 21M19 3l-5 18m8-12H4m16 7H2"
                    /></svg
                >
            {/if}

            <h1>
                {$currentChannel?.name ||
                    $currentRoomData?.dmUser.username ||
                    'Deleted user'}
            </h1>

            <div class="spacer" />

            {#if !$isInServer}
                <svg
                    on:click={toggleProfileview}
                    on:keydown={toggleProfileview}
                    id={`${$dmsShowProfile ? 'active' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    ><path
                        fill-rule="evenodd"
                        d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10Zm-7-3a3 3 0 1 1-6 0a3 3 0 0 1 6 0Zm-3 11.5a8.46 8.46 0 0 0 4.807-1.489c.604-.415.862-1.205.51-1.848C16.59 15.83 15.09 15 12 15c-3.09 0-4.59.83-5.318 2.163c-.351.643-.093 1.433.511 1.848A8.46 8.46 0 0 0 12 20.5Z"
                        clip-rule="evenodd"
                    /></svg
                >
            {/if}
        </div>
    </div>
</div>

<style>
    .info-container {
        width: 100%;
        min-width: 100%;
        height: 52px;
        display: flex;
        padding: 15px;
        padding-right: 10px;
        margin-top: 1px;
        user-select: none;
    }

    .empty {
        border: none;
    }

    .data-container {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .placeholder {
        width: 100%;
        min-width: 100%;
        z-index: 1;
    }

    #icon {
        width: 28px;
        height: 28px;
        border-radius: 30px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        transition: 150ms;
        cursor: default;
        border: 2px solid transparent;
    }

    h1 {
        margin: 0;
        font-size: 1rem;
        font-weight: 500;
        padding-left: 5px;
        color: var(--text);
        border: 2px solid transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        background: transparent;
    }

    h1:disabled {
        background: transparent;
        color: var(--text);
    }

    .spacer {
        width: 100%;
        flex: 1;
    }

    svg {
        width: 32px;
        height: 32px;
        padding: 2px;
        cursor: pointer;
        fill: var(--text);
    }

    #active {
        fill: var(--text);
    }
</style>
