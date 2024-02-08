<script lang="ts">
    import { ModalTypes } from 'stores/modals';
    import DropdownTemplateDarken from '../DropdownTemplateDarken.svelte';
    import { socket } from 'stores/main';
    import { dropdownDMRoom } from 'stores/dropdowns';
    import { currentRoomData, dmsList } from 'stores/rooms';
    import { showModal } from 'utilities/main';
    import { goHome } from 'utilities/rooms';

    function viewProfile(): void {
        showModal(ModalTypes.Profile);
    }

    function closeDM(): void {
        if ($currentRoomData == $dropdownDMRoom) goHome();

        socket.emit('closeDM', {
            roomId: $dropdownDMRoom.roomId,
        });

        $dmsList.splice($dmsList.indexOf($dropdownDMRoom), 1);
        $dmsList = $dmsList;
    }
</script>

<DropdownTemplateDarken>
    <!-- Non-deleted -->
    {#if $dropdownDMRoom.dmUser.profileId}
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

        <hr />
    {/if}

    <button on:click={closeDM}
        ><h1>Close DM</h1>
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
    >
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
