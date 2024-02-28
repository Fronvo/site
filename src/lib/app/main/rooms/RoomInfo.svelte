<script lang="ts">
    import { isMobile } from 'stores/main';
    import {
        currentChannel,
        currentRoomData,
        currentRoomId,
        currentRoomLoaded,
        dmsShowProfile,
        isInServer,
        mobileShowMembers,
    } from 'stores/rooms';

    function goBack(): void {
        $currentRoomId = undefined;
        $currentRoomData = undefined;
        $currentRoomLoaded = false;
        $currentChannel = undefined;
    }

    function toggleProfileview(): void {
        $dmsShowProfile = !$dmsShowProfile;
    }

    function toggleMembersView(): void {
        $mobileShowMembers = true;
    }
</script>

<div class="placeholder">
    <div
        class={`info-container ${!$currentRoomId ? 'empty' : ''} ${
            $isMobile ? 'mobile' : ''
        }`}
    >
        <div class="data-container">
            {#if $isMobile}
                <svg
                    on:click={goBack}
                    on:keydown={goBack}
                    id="back"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    ><path
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="m15 5l-6 7l6 7"
                    /></svg
                >
            {/if}

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

            {#if !$isMobile}
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
            {:else if $isInServer}
                <svg
                    on:click={toggleMembersView}
                    on:keydown={toggleMembersView}
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    ><circle cx="9.001" cy="6" r="4" /><ellipse
                        cx="9.001"
                        cy="17.001"
                        rx="7"
                        ry="4"
                    /><path
                        d="M21 17c0 1.657-2.036 3-4.521 3c.732-.8 1.236-1.805 1.236-2.998c0-1.195-.505-2.2-1.239-3.001C18.962 14 21 15.344 21 17ZM18 6a3 3 0 0 1-4.029 2.82A5.688 5.688 0 0 0 14.714 6c0-1.025-.27-1.987-.742-2.819A3 3 0 0 1 18 6.001Z"
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

    .mobile {
        background: var(--bg);
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
        z-index: 2;
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

    #back {
        stroke: var(--text);
        transition: 125ms;
    }

    #back:active {
        opacity: 0.75;
    }

    @media screen and (max-width: 850px) {
        .mobile svg {
            width: 26px;
            height: 26px;
        }
    }
</style>
