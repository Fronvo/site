<script lang="ts">
    import {
        ModalTypes,
        targetMemberModal,
        targetProfileModal,
    } from 'stores/modals';
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
    import { setTitle, showModal } from 'utilities/main';
    import { goto } from '$app/navigation';
    import type { Room } from 'interfaces/all';
    import { ourData } from 'stores/profile';

    function viewProfile(): void {
        $targetProfileModal = $targetMemberModal;

        showModal(ModalTypes.Profile);
    }

    async function attemptEnterRoom(): Promise<void> {
        for (const dmIndex in $dmsList) {
            const dm = $dmsList[dmIndex] as Room;

            if (dm.dmUser.profileId != $targetMemberModal.profileId) continue;

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
                profileId: $targetMemberModal.profileId,
            },
            attemptEnterRoom
        );
    }

    function kickMember(): void {
        showModal(ModalTypes.KickMember);
    }

    function banMember(): void {
        showModal(ModalTypes.BanMember);
    }
</script>

<DropdownTemplateDarken>
    <!-- Non-deleted -->
    <button on:click={viewProfile}
        ><h1>View profile</h1>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><g fill="none" stroke-width="1.5"
                ><circle cx="12" cy="6" r="4" /><path
                    d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z"
                /></g
            ></svg
        ></button
    >

    {#if $ourData.friends.includes($targetMemberModal.profileId)}
        <hr />

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
    {/if}

    {#if $ourData.profileId == $currentServer?.ownerId && $ourData.profileId != $targetMemberModal.profileId}
        <!-- <hr />

        <button on:click={messageFriend}
            ><h1>Promote</h1>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                ><g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"
                    ><path
                        d="M5.47 5.47a.75.75 0 0 1 1.06 0l12 12a.75.75 0 1 1-1.06 1.06l-12-12a.75.75 0 0 1 0-1.06"
                    /><path
                        d="M18.53 5.47a.75.75 0 0 1 0 1.06l-12 12a.75.75 0 0 1-1.06-1.06l12-12a.75.75 0 0 1 1.06 0"
                    /></g
                ></svg
            ></button
        > -->

        <hr />

        <button on:click={kickMember}
            ><h1>Kick</h1>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                ><path
                    d="M10.03 8.97a.75.75 0 0 0-1.06 1.06L10.94 12l-1.97 1.97a.75.75 0 1 0 1.06 1.06L12 13.06l1.97 1.97a.75.75 0 0 0 1.06-1.06L13.06 12l1.97-1.97a.75.75 0 1 0-1.06-1.06L12 10.94l-1.97-1.97Z"
                /><path
                    fill-rule="evenodd"
                    d="M12 1.25C6.063 1.25 1.25 6.063 1.25 12S6.063 22.75 12 22.75S22.75 17.937 22.75 12S17.937 1.25 12 1.25ZM2.75 12a9.25 9.25 0 1 1 18.5 0a9.25 9.25 0 0 1-18.5 0Z"
                    clip-rule="evenodd"
                /></svg
            ></button
        >

        <button on:click={banMember}
            ><h1>Ban</h1>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                ><path
                    fill-rule="evenodd"
                    d="M10.155 3.247c-.519.396-1.129 1.004-2.012 1.887s-1.49 1.493-1.887 2.012c-.383.502-.497.83-.497 1.14c0 .31.114.638.497 1.14c.397.52 1.004 1.13 1.887 2.012l4.419 4.419c.883.883 1.493 1.49 2.012 1.887c.502.383.83.497 1.14.497c.31 0 .638-.114 1.14-.497c.519-.396 1.129-1.004 2.012-1.887s1.49-1.493 1.887-2.012c.383-.503.497-.83.497-1.14c0-.31-.114-.638-.497-1.14c-.396-.52-1.004-1.13-1.887-2.012l-4.419-4.419c-.883-.883-1.493-1.49-2.012-1.887c-.502-.383-.83-.497-1.14-.497c-.31 0-.637.114-1.14.497Zm-.91-1.192c.636-.485 1.28-.805 2.05-.805c.77 0 1.414.32 2.05.805c.609.464 1.29 1.145 2.125 1.98l.244.245c.239-.238.451-.44.685-.574a2.312 2.312 0 0 1 2.312 0c.267.154.505.393.787.675l.06.06l.061.061c.282.282.521.52.675.787a2.312 2.312 0 0 1 0 2.312c-.135.234-.336.446-.574.685l.245.244c.835.836 1.516 1.516 1.98 2.125c.485.636.805 1.28.805 2.05c0 .77-.32 1.414-.805 2.05c-.464.608-1.145 1.289-1.98 2.124l-.077.077c-.835.835-1.516 1.516-2.125 1.98c-.635.485-1.28.805-2.05.805c-.768 0-1.413-.32-2.049-.805c-.609-.464-1.29-1.145-2.125-1.98l-.244-.245l-4.993 4.994l-.06.06c-.282.282-.52.521-.787.675a2.312 2.312 0 0 1-2.312 0c-.267-.154-.505-.393-.787-.675l-.06-.06l-.061-.061c-.282-.282-.521-.52-.675-.787a2.312 2.312 0 0 1 0-2.312c.154-.266.393-.505.675-.786l.06-.061l4.994-4.993l-.245-.244c-.835-.836-1.516-1.516-1.98-2.125c-.485-.636-.805-1.28-.805-2.05c0-.77.32-1.414.805-2.05c.464-.608 1.145-1.289 1.98-2.124l.077-.077c.835-.835 1.516-1.516 2.125-1.98Zm-.896 11.71L3.356 18.76c-.376.376-.456.465-.497.536a.812.812 0 0 0 0 .812c.04.072.12.16.497.537c.377.376.466.456.537.497a.812.812 0 0 0 .812 0c.07-.04.16-.12.536-.497l4.994-4.993l-1.886-1.886Zm10.31-6.54c.24-.243.302-.314.336-.374a.812.812 0 0 0 0-.812c-.041-.071-.12-.16-.497-.537c-.377-.376-.466-.456-.537-.497a.812.812 0 0 0-.812 0c-.06.034-.131.096-.374.336l1.884 1.884Z"
                    clip-rule="evenodd"
                /></svg
            ></button
        >
    {/if}
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
        background: var(--primary);
    }

    h1 {
        font-size: 0.83rem;
        font-weight: 500;
        flex: 1;
        text-align: start;
    }

    hr {
        width: 100%;
        height: 1px;
        border: 1px solid var(--primary);
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
