<script lang="ts">
    import { targetMemberModal } from 'stores/modals';
    import DropdownTemplateDarken from '../DropdownTemplateDarken.svelte';
    import { socket } from 'stores/main';
    import { currentServer } from 'stores/rooms';
    import { dismissModal } from 'utilities/main';

    function unbanMember(): void {
        socket.emit('unbanMember', {
            serverId: $currentServer.serverId,
            profileId: $targetMemberModal.profileId,
        });

        dismissModal();
    }
</script>

<DropdownTemplateDarken>
    <button on:click={unbanMember}
        ><h1>Unban member</h1>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            ><path
                fill-rule="evenodd"
                d="M2.25 6A.75.75 0 0 1 3 5.25h18a.75.75 0 0 1 0 1.5H3A.75.75 0 0 1 2.25 6Zm0 4A.75.75 0 0 1 3 9.25h18a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75Zm12.22 2.97a.75.75 0 0 1 1.06 0l1.97 1.97l1.97-1.97a.75.75 0 1 1 1.06 1.06L18.56 16l1.97 1.97a.75.75 0 1 1-1.06 1.06l-1.97-1.97l-1.97 1.97a.75.75 0 1 1-1.06-1.06L16.44 16l-1.97-1.97a.75.75 0 0 1 0-1.06ZM2.25 14a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75Zm0 4a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75Z"
                clip-rule="evenodd"
            /></svg
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

    svg {
        width: 22px;
        height: 22px;
        margin-right: 5px;
    }
</style>
