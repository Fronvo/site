<script lang="ts">
    import { setProgressBar, showModal } from 'utilities/main';
    import { ModalTypes, targetProfileModal } from 'stores/modals';
    import { ourData } from 'stores/profile';
    import DropdownTemplateEmpty from '../DropdownTemplateEmpty.svelte';
    import ProfilePreviewSmall from '$lib/app/reusables/all/ProfilePreviewSmall.svelte';
    import { dropdownForAccountInfo } from 'stores/dropdowns';
    import { socket } from 'stores/main';
    import {
        currentRoomData,
        currentRoomId,
        currentRoomLoaded,
        currentRoomMessages,
        roomsList,
    } from 'stores/rooms';
    import { loadRoomMessages, loadRoomsData } from 'utilities/rooms';
    import { toast } from 'svelte-sonner';

    function viewProfile(): void {
        showModal(ModalTypes.Profile);
    }

    function setStatus(): void {
        showModal(ModalTypes.Status);
    }

    function copyId(): void {
        navigator.clipboard.writeText($ourData.profileId);

        toast('Copied ID to clipboard');
    }

    function switchAccounts(): void {
        showModal(ModalTypes.SwitchAccounts);
    }

    function logout(): void {
        showModal(ModalTypes.Logout);
    }

    function addFriend(): void {
        setProgressBar(true);

        socket.emit(
            'addFriend',
            { profileId: $targetProfileModal.profileId },
            ({ err }) => {
                setProgressBar(false);

                if (!err) {
                    toast(
                        `Friend request sent to @${$targetProfileModal.profileId}`
                    );
                } else {
                    // Most logical error
                    toast.error('Friend request has already been sent');
                }
            }
        );
    }

    function removeFriend(): void {
        showModal(ModalTypes.RemoveFriend);
    }

    function sendMessage(): void {
        setProgressBar(true);

        socket.emit(
            'createDM',
            { profileId: $targetProfileModal.profileId },
            async ({ err }) => {
                if (err) {
                    for (const roomIndex in $roomsList) {
                        const room = $roomsList[roomIndex];

                        if (
                            room.isDM &&
                            room.dmUsers.includes(
                                $targetProfileModal.profileId
                            ) &&
                            $currentRoomId != room.roomId
                        ) {
                            $currentRoomId = room.roomId;
                            $currentRoomMessages = await loadRoomMessages(
                                room.roomId
                            );
                            $currentRoomData = room;

                            $currentRoomLoaded = false;
                            $currentRoomLoaded = true;

                            break;
                        }
                    }
                } else {
                    $roomsList = await loadRoomsData();

                    for (const roomIndex in $roomsList) {
                        const room = $roomsList[roomIndex];

                        if (
                            room.isDM &&
                            room.dmUsers.includes(
                                $targetProfileModal.profileId
                            ) &&
                            $currentRoomId != room.roomId
                        ) {
                            $currentRoomId = room.roomId;
                            $currentRoomMessages = await loadRoomMessages(
                                room.roomId
                            );
                            $currentRoomData = room;
                            $currentRoomLoaded = true;

                            break;
                        }
                    }
                }

                setProgressBar(false);
            }
        );
    }

    function removeMember(): void {
        showModal(ModalTypes.RemoveMember);
    }
</script>

<DropdownTemplateEmpty>
    <ProfilePreviewSmall profileData={$targetProfileModal} />

    <button on:click={viewProfile}
        ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            ><g fill="var(--branding)"
                ><circle cx="12" cy="6" r="4" /><ellipse
                    cx="12"
                    cy="17"
                    opacity=".75"
                    rx="7"
                    ry="4"
                /></g
            ></svg
        >View profile</button
    >

    {#if $targetProfileModal.profileId == $ourData.profileId}
        {#if $dropdownForAccountInfo}
            <button on:click={setStatus}
                ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    ><g
                        fill="var(--branding)"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        ><path
                            d="M10.801 2.57a.711.711 0 0 1-.555.838a8.779 8.779 0 0 0-6.838 6.838a.71.71 0 1 1-1.394-.283a10.2 10.2 0 0 1 7.949-7.949a.71.71 0 0 1 .838.556ZM2.57 13.199a.71.71 0 0 1 .838.555a8.779 8.779 0 0 0 6.838 6.838a.71.71 0 1 1-.283 1.394a10.2 10.2 0 0 1-7.948-7.949a.711.711 0 0 1 .555-.838ZM13.199 2.57a.71.71 0 0 1 .838-.556a10.2 10.2 0 0 1 7.949 7.949a.711.711 0 0 1-1.394.283a8.779 8.779 0 0 0-6.838-6.838a.711.711 0 0 1-.555-.838Zm8.231 10.629a.711.711 0 0 1 .556.838a10.2 10.2 0 0 1-7.949 7.949a.711.711 0 0 1-.283-1.394a8.779 8.779 0 0 0 6.838-6.838a.71.71 0 0 1 .838-.555Z"
                        /><path
                            d="M12 19.583a7.583 7.583 0 1 0 0-15.166a7.583 7.583 0 0 0 0 15.166Zm-3.06-5.044a.71.71 0 0 1 .995-.148c.59.437 1.3.69 2.065.69a3.45 3.45 0 0 0 2.065-.69a.71.71 0 1 1 .846 1.142a4.871 4.871 0 0 1-2.911.97a4.872 4.872 0 0 1-2.912-.97a.711.711 0 0 1-.147-.994Zm6.377-4.139c0 .688-.37 1.245-.829 1.245c-.458 0-.83-.557-.83-1.245c0-.687.372-1.244.83-1.244c.458 0 .83.557.83 1.244Zm-5.805 1.245c.458 0 .83-.557.83-1.245c0-.687-.372-1.244-.83-1.244c-.458 0-.83.557-.83 1.244c0 .688.372 1.245.83 1.245Z"
                        /></g
                    ></svg
                >
                Set status</button
            >

            <button on:click={copyId}
                ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    ><g fill="var(--branding)"
                        ><path
                            d="M6.6 11.397c0-2.726 0-4.089.843-4.936c.844-.847 2.201-.847 4.917-.847h2.88c2.715 0 4.072 0 4.916.847c.844.847.844 2.21.844 4.936v4.82c0 2.726 0 4.089-.844 4.936c-.843.847-2.201.847-4.916.847h-2.88c-2.716 0-4.073 0-4.917-.847c-.843-.847-.843-2.21-.843-4.936v-4.82Z"
                        /><path
                            d="M4.172 3.172C3 4.343 3 6.229 3 10v2c0 3.771 0 5.657 1.172 6.828c.617.618 1.433.91 2.62 1.048c-.192-.84-.192-1.996-.192-3.66v-4.819c0-2.726 0-4.089.843-4.936c.844-.847 2.201-.847 4.917-.847h2.88c1.652 0 2.8 0 3.638.19c-.138-1.193-.43-2.012-1.05-2.632C16.657 2 14.771 2 11 2C7.229 2 5.343 2 4.172 3.172Z"
                            opacity=".5"
                        /></g
                    ></svg
                >Copy ID</button
            >

            <button on:click={switchAccounts}
                ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    ><g fill="var(--branding)"
                        ><path
                            d="M15.5 7.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0Z"
                        /><path
                            d="M19.5 7.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Zm-15 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 0 0-5 0Z"
                            opacity=".4"
                        /><path
                            d="M18 16.5c0 1.933-2.686 3.5-6 3.5s-6-1.567-6-3.5S8.686 13 12 13s6 1.567 6 3.5Z"
                        /><path
                            d="M22 16.5c0 1.38-1.79 2.5-4 2.5s-4-1.12-4-2.5s1.79-2.5 4-2.5s4 1.12 4 2.5Zm-20 0C2 17.88 3.79 19 6 19s4-1.12 4-2.5S8.21 14 6 14s-4 1.12-4 2.5Z"
                            opacity=".4"
                        /></g
                    ></svg
                >Switch accounts</button
            >

            <button class="danger" on:click={logout}
                ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    ><g fill="none"
                        ><path
                            fill="red"
                            d="M20 12.75a.75.75 0 0 0 0-1.5v1.5Zm0-1.5H4v1.5h16v-1.5Z"
                        /><path
                            stroke="red"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="m10 6l-6 6l6 6"
                        /></g
                    ></svg
                >Logout</button
            >
        {/if}
    {:else}
        {#if $ourData.friends.includes($targetProfileModal.profileId)}
            <button on:click={removeFriend}
                ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    ><g fill="var(--branding)"
                        ><path d="M16 6a4 4 0 1 1-8 0a4 4 0 0 1 8 0Z" /><path
                            d="M14.477 21.92c-.726.053-1.547.08-2.477.08c-8 0-8-2.015-8-4.5S7.582 13 12 13c2.88 0 5.406.856 6.814 2.141C18.298 15 17.574 15 16.5 15c-1.65 0-2.475 0-2.987.513C13 16.025 13 16.85 13 18.5c0 1.65 0 2.475.513 2.987c.237.238.542.365.964.434Z"
                            opacity=".5"
                        /><path
                            fill-rule="evenodd"
                            d="M13.513 21.487C14.025 22 14.85 22 16.5 22c1.65 0 2.475 0 2.987-.513C20 20.975 20 20.15 20 18.5c0-1.65 0-2.475-.513-2.987C18.975 15 18.15 15 16.5 15c-1.65 0-2.475 0-2.987.513C13 16.025 13 16.85 13 18.5c0 1.65 0 2.475.513 2.987Zm2.404-3.57h-.973a.583.583 0 1 0 0 1.166h3.112a.583.583 0 1 0 0-1.166h-2.139Z"
                            clip-rule="evenodd"
                        /></g
                    ></svg
                >Remove friend</button
            >
        {:else}
            <button on:click={addFriend}
                ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    ><g fill="var(--branding)"
                        ><circle cx="12" cy="6" r="4" /><path
                            d="M18.095 15.031C17.67 15 17.149 15 16.5 15c-1.65 0-2.475 0-2.987.513C13 16.025 13 16.85 13 18.5c0 1.166 0 1.92.181 2.443c-.384.038-.778.057-1.181.057c-3.866 0-7-1.79-7-4s3.134-4 7-4c2.613 0 4.892.818 6.095 2.031Z"
                            opacity=".5"
                        /><path
                            fill-rule="evenodd"
                            d="M16.5 22c-1.65 0-2.475 0-2.987-.513C13 20.975 13 20.15 13 18.5c0-1.65 0-2.475.513-2.987C14.025 15 14.85 15 16.5 15c1.65 0 2.475 0 2.987.513C20 16.025 20 16.85 20 18.5c0 1.65 0 2.475-.513 2.987C18.975 22 18.15 22 16.5 22Zm.583-5.056a.583.583 0 1 0-1.166 0v.973h-.973a.583.583 0 1 0 0 1.166h.973v.973a.583.583 0 1 0 1.166 0v-.973h.973a.583.583 0 1 0 0-1.166h-.973v-.973Z"
                            clip-rule="evenodd"
                        /></g
                    ></svg
                >Add friend</button
            >
        {/if}

        {#if $ourData.friends.includes($targetProfileModal.profileId) && !$currentRoomData?.dmUsers?.includes($targetProfileModal.profileId)}
            <button on:click={sendMessage}
                ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    ><path
                        fill="var(--branding)"
                        fill-rule="evenodd"
                        d="M22 12c0 5.523-4.477 10-10 10c-1.6 0-3.112-.376-4.452-1.044a1.634 1.634 0 0 0-1.149-.133l-2.226.596a1.3 1.3 0 0 1-1.591-1.592l.595-2.226a1.633 1.633 0 0 0-.134-1.148A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10ZM8 13a1 1 0 1 1 0-2a1 1 0 0 1 0 2Zm3-1a1 1 0 1 0 2 0a1 1 0 0 0-2 0Zm4 0a1 1 0 1 0 2 0a1 1 0 0 0-2 0Z"
                        clip-rule="evenodd"
                    /></svg
                >Send message</button
            >
        {/if}

        {#if $ourData.profileId == $currentRoomData?.ownerId && $currentRoomData?.members.includes($targetProfileModal.profileId)}
            <button on:click={removeMember}
                ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    ><g fill="none" stroke="red" stroke-width="1.5"
                        ><circle cx="12" cy="6" r="4" /><path
                            d="M14 20.834c-.634.108-1.305.166-2 .166c-3.866 0-7-1.79-7-4s3.134-4 7-4c1.713 0 3.283.352 4.5.936"
                            opacity=".5"
                        /><circle cx="17" cy="18" r="4" /><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m15.666 16.667l2.667 2.666m0-2.666l-2.666 2.666"
                        /></g
                    ></svg
                >Remove from room</button
            >
        {/if}
    {/if}
</DropdownTemplateEmpty>

<style>
    button {
        display: flex;
        align-items: center;
        font-size: 0.9rem;
        margin-bottom: 5px;
        transform: translateY(-30px);
        margin-left: 15px;
        margin-right: 15px;
        box-shadow: none;
        box-shadow: 2px solid var(--primary);
    }

    button:hover {
        background: var(--secondary);
    }

    svg {
        width: 24px;
        height: 24px;
        margin-right: 10px;
    }
</style>
