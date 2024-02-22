<script lang="ts">
    import { goto } from '$app/navigation';
    import { activeDashboardTab } from 'stores/dashboard';
    import { ModalTypes } from 'stores/modals';
    import { ourData } from 'stores/profile';
    import {
        currentRoomData,
        currentRoomId,
        currentRoomLoaded,
        pendingChannelId,
        pendingProfileDMId,
        pendingServerId,
    } from 'stores/rooms';
    import { onMount } from 'svelte';
    import { DashboardOptions } from 'types/all';
    import { showModal } from 'utilities/main';

    function showTurbo(): void {
        showModal(ModalTypes.GoTurbo);
    }

    function changeToDashboard(): void {
        changeTab(DashboardOptions.Dashboard);

        goto('/homepage');
    }

    function changeToFriends(): void {
        changeTab(DashboardOptions.Friends);

        goto('/friends');
    }

    function changeToProfile(): void {
        changeTab(DashboardOptions.Profile);

        goto('/profile');
    }

    function changeTab(tab: DashboardOptions): void {
        $activeDashboardTab = tab;

        $currentRoomId = undefined;
        $currentRoomData = undefined;
        $currentRoomLoaded = false;
    }

    onMount(() => {
        if ($pendingProfileDMId || $pendingServerId || $pendingChannelId)
            return;

        if ($activeDashboardTab == DashboardOptions.Dashboard) {
            goto('/homepage');
        } else if ($activeDashboardTab == DashboardOptions.Friends) {
            goto('/friends');
        } else if ($activeDashboardTab == DashboardOptions.Profile) {
            goto('/profile');
        } else {
            goto('/homepage');
        }
    });
</script>

<div class="secondary-container">
    <button
        on:click={changeToDashboard}
        class={`${
            $activeDashboardTab == DashboardOptions.Dashboard &&
            !$currentRoomData
                ? 'active'
                : ''
        }`}
        ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            ><g
                ><path
                    d="M19.992 11.643c.283-.253.546-.504.789-.752c.754-.77 1.342-1.54 1.672-2.268c.324-.716.458-1.544.012-2.258c-.42-.67-1.185-.96-1.956-1.064c-.79-.107-1.75-.041-2.797.152l-.888.165a8 8 0 0 0-12.82 6.641l-.527.593c-.84.817-1.497 1.636-1.872 2.403c-.366.75-.54 1.627-.07 2.38c.433.691 1.232.979 2.032 1.074c.825.098 1.828.016 2.923-.201c.215-.043.436-.091.66-.145a8.046 8.046 0 0 1-1.311-1.26c-.853.146-1.56.18-2.095.116c-.632-.075-.865-.264-.937-.38c-.063-.1-.132-.358.145-.925c.241-.494.688-1.092 1.342-1.758a7.979 7.979 0 0 0 1.545 2.947c.117-.02.237-.042.36-.067c2.02-.4 4.613-1.351 7.28-2.772c2.665-1.42 4.848-3.012 6.227-4.42a7.98 7.98 0 0 0-1.545-2.947c.885-.151 1.61-.182 2.149-.11c.594.08.813.262.883.374c.06.095.126.33-.107.844c-.227.502-.683 1.129-1.377 1.836l-.003.003c.161.576.259 1.179.286 1.799Z"
                /><path
                    d="M12 20a8 8 0 0 0 7.992-8.357c-1.481 1.327-3.49 2.71-5.809 3.945c-2.491 1.328-4.958 2.281-7.032 2.775A7.965 7.965 0 0 0 12 20Z"
                /></g
            ></svg
        >
        <h1>Homepage</h1></button
    >
    <button
        on:click={changeToProfile}
        class={`${
            $activeDashboardTab == DashboardOptions.Profile && !$currentRoomData
                ? 'active'
                : ''
        }`}
    >
        {#if $ourData.avatar}
            <img
                src={`${$ourData.avatar}/tr:w-56:h-56`}
                draggable={false}
                alt={`${$ourData.profileId}\'s avatar'`}
            />
        {:else}<svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                ><path
                    fill-rule="evenodd"
                    d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10Zm-7-3a3 3 0 1 1-6 0a3 3 0 0 1 6 0Zm-3 11.5a8.46 8.46 0 0 0 4.807-1.489c.604-.415.862-1.205.51-1.848C16.59 15.83 15.09 15 12 15c-3.09 0-4.59.83-5.318 2.163c-.351.643-.093 1.433.511 1.848A8.46 8.46 0 0 0 12 20.5Z"
                    clip-rule="evenodd"
                /></svg
            >
        {/if}
        <h1>Profile</h1></button
    >

    <button
        on:click={changeToFriends}
        class={`${
            $activeDashboardTab == DashboardOptions.Friends && !$currentRoomData
                ? 'active'
                : ''
        }`}
        ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            ><path
                d="M15.5 7.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0Zm2.5 9c0 1.933-2.686 3.5-6 3.5s-6-1.567-6-3.5S8.686 13 12 13s6 1.567 6 3.5ZM7.122 5c.178 0 .35.017.518.05A4.977 4.977 0 0 0 7 7.5c0 .868.221 1.685.61 2.396c-.158.03-.32.045-.488.045c-1.414 0-2.561-1.106-2.561-2.47C4.561 6.106 5.708 5 7.122 5ZM5.447 18.986C4.88 18.307 4.5 17.474 4.5 16.5c0-.944.357-1.756.896-2.423C3.49 14.225 2 15.267 2 16.529c0 1.275 1.517 2.325 3.447 2.457ZM17 7.5c0 .868-.221 1.685-.61 2.396c.157.03.32.045.488.045c1.414 0 2.56-1.106 2.56-2.47c0-1.365-1.146-2.471-2.56-2.471c-.178 0-.35.017-.518.05c.407.724.64 1.56.64 2.45Zm1.553 11.486c1.93-.132 3.447-1.182 3.447-2.457c0-1.263-1.491-2.304-3.396-2.452c.54.667.896 1.479.896 2.423c0 .974-.38 1.807-.947 2.486Z"
            /></svg
        >
        <h1>Friends</h1></button
    >

    {#if !$ourData.isTurbo}
        <button id="nitro" on:click={showTurbo}
            ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                ><path
                    d="M20 15c0 4.255-2.618 6.122-4.641 6.751c-.432.134-.715-.369-.457-.74c.88-1.265 1.898-3.195 1.898-5.01c0-1.951-1.644-4.254-2.928-5.675c-.293-.324-.805-.11-.821.328c-.053 1.45-.282 3.388-1.268 4.908a.412.412 0 0 1-.677.036c-.308-.39-.616-.871-.924-1.252c-.166-.204-.466-.207-.657-.026c-.747.707-1.792 1.809-1.792 3.18c0 .93.36 1.905.767 2.69c.224.43-.174.95-.604.724C6.113 19.98 4 18.084 4 15c0-3.146 4.31-7.505 5.956-11.623c.26-.65 1.06-.955 1.617-.531C14.943 5.414 20 10.378 20 15Z"
                /></svg
            >
            <h1>Turbo</h1></button
        >
    {/if}
</div>

<style>
    .secondary-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 5px;
        margin-top: 5px;
    }

    button {
        display: flex;
        align-items: center;
        width: 100%;
        height: 45px;
        background: transparent;
        box-shadow: none;
        backdrop-filter: none;
        font-size: 1rem;
        text-align: start;
        transition: 125ms;
        margin-bottom: 3px;
        border-radius: 5px;
    }

    button:hover {
        background: var(--secondary);
    }

    .active {
        background: var(--secondary);
    }

    button:active {
        opacity: 0.8;
    }

    h1 {
        font-size: 1rem;
        margin: 0;
        color: var(--gray);
    }

    button:hover h1 {
        color: var(--text);
    }

    .active h1 {
        color: var(--text);
    }

    img {
        width: 28px;
        height: 28px;
        margin-right: 10px;
        transition: 125ms;
        border-radius: 5px;
    }

    svg {
        width: 28px;
        height: 28px;
        margin-right: 10px;
        fill: var(--gray);
        transition: 125ms;
    }

    button:hover svg {
        fill: var(--gray);
    }

    .active svg {
        fill: var(--gray);
    }

    #nitro:hover svg {
        fill: var(--text);
    }
</style>
