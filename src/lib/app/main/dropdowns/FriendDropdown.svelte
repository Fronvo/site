<script lang="ts">
    import { setTitle, showModal } from 'utilities/main';
    import { ModalTypes, targetFriendModal } from 'stores/modals';
    import DropdownTemplateDarken from '../DropdownTemplateDarken.svelte';
    import { socket } from 'stores/main';
    import {
        currentChannel,
        currentRoomData,
        currentRoomId,
        currentRoomLoaded,
        currentRoomMessages,
        currentServer,
        dmsList,
        isInServer,
    } from 'stores/rooms';
    import type { Room } from 'interfaces/all';
    import { goto } from '$app/navigation';

    async function attemptEnterRoom(): Promise<void> {
        for (const dmIndex in $dmsList) {
            const dm = $dmsList[dmIndex] as Room;

            if (dm.dmUser.profileId != $targetFriendModal.profileId) continue;

            if ($currentRoomData?.roomId == dm.roomId) return;

            dm.unreadCount = 0;

            $currentRoomData = dm;
            $currentRoomLoaded = false;
            $currentRoomLoaded = true;
            $currentRoomMessages = [];
            $currentRoomId = dm.roomId;

            $currentChannel = undefined;
            $currentServer = undefined;
            $isInServer = false;

            setTitle(`@${dm.dmUser.profileId}`);
            goto(`/@${dm.dmUser.profileId}`);
        }
    }

    function messageFriend(): void {
        attemptEnterRoom();

        socket.emit(
            'createDM',
            {
                profileId: $targetFriendModal.profileId,
            },
            attemptEnterRoom
        );
    }

    function removeFriend(): void {
        showModal(ModalTypes.RemoveFriend);
    }
</script>

<DropdownTemplateDarken>
    <button on:click={messageFriend}
        ><h1>Message</h1>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><path
                fill="none"
                stroke-width="1.5"
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12c0 1.6.376 3.112 1.043 4.453c.178.356.237.763.134 1.148l-.595 2.226a1.3 1.3 0 0 0 1.591 1.591l2.226-.595a1.634 1.634 0 0 1 1.149.133A9.958 9.958 0 0 0 12 22Z"
            /></svg
        ></button
    >

    <hr />

    <button on:click={removeFriend}
        ><h1>Remove friend</h1>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><g fill="none" stroke-width="1.5"
                ><circle cx="12" cy="12" r="10" /><path
                    stroke-linecap="round"
                    d="M15 12H9"
                /></g
            ></svg
        ></button
    >

    <!-- Future blocking -->
    <!-- 
    <button on:click={removeFriend}
        ><h1>Block</h1>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            ><path
                d="M10.03 8.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.97 1.97a.75.75 0 1 0 1.06 1.06L12 13.06l1.97 1.97a.75.75 0 0 0 1.06-1.06L13.06 12l1.97-1.97a.75.75 0 1 0-1.06-1.06L12 10.94l-1.97-1.97Z"
            /><path
                fill-rule="evenodd"
                d="M12 1.25c-.938 0-1.833.307-3.277.801l-.727.25c-1.481.506-2.625.898-3.443 1.23c-.412.167-.767.33-1.052.495c-.275.16-.55.359-.737.626c-.185.263-.281.587-.341.9c-.063.324-.1.713-.125 1.16c-.048.886-.048 2.102-.048 3.678v1.601c0 6.101 4.608 9.026 7.348 10.224l.027.011c.34.149.66.288 1.027.382c.387.1.799.142 1.348.142c.55 0 .96-.042 1.348-.142c.367-.094.687-.233 1.026-.382l.028-.011c2.74-1.198 7.348-4.123 7.348-10.224V10.39c0-1.576 0-2.792-.048-3.679a8.85 8.85 0 0 0-.125-1.16c-.06-.312-.156-.636-.34-.9c-.188-.266-.463-.465-.738-.625a8.554 8.554 0 0 0-1.052-.495c-.818-.332-1.962-.724-3.443-1.23l-.727-.25c-1.444-.494-2.34-.801-3.277-.801ZM9.08 3.514c1.615-.552 2.262-.764 2.92-.764c.658 0 1.305.212 2.92.764l.572.196c1.513.518 2.616.896 3.39 1.21c.387.158.667.29.864.404c.097.056.164.102.208.139c.038.03.053.048.055.05a.408.408 0 0 1 .032.074c.02.056.042.136.063.248a7.4 7.4 0 0 1 .1.958c.046.841.046 2.015.046 3.624v1.574c0 5.175-3.87 7.723-6.449 8.849c-.371.162-.586.254-.825.315c-.228.059-.506.095-.976.095s-.748-.036-.976-.095c-.24-.06-.454-.153-.825-.315c-2.58-1.127-6.449-3.674-6.449-8.849v-1.574c0-1.609 0-2.783.046-3.624a7.4 7.4 0 0 1 .1-.958c.021-.112.043-.192.063-.248c.018-.05.03-.07.032-.074a.386.386 0 0 1 .055-.05a1.57 1.57 0 0 1 .208-.14c.197-.114.477-.245.864-.402c.774-.315 1.877-.693 3.39-1.21l.573-.197Z"
                clip-rule="evenodd"
            /></svg
        ></button
    > -->
</DropdownTemplateDarken>

<style>
    button {
        width: calc(200px - 10px);
        height: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        box-shadow: none;
        box-shadow: 2px solid var(--primary);
        border-radius: 0px;
        background: transparent;
        backdrop-filter: none;
    }

    button:hover {
        background: rgb(255, 255, 255, 0.15);
    }

    h1 {
        font-size: 0.83rem;
        font-weight: 500;
        flex: 1;
        text-align: start;
        color: white;
    }

    hr {
        width: 100%;
        height: 1px;
        border: 1px solid rgb(255, 255, 255, 0.1);
        padding: 0;
        margin: 0;
        margin-bottom: 2px;
        margin-top: 2px;
    }

    svg {
        width: 22px;
        height: 22px;
        margin-right: 5px;
    }
</style>
