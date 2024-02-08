<script lang="ts">
    import { targetProfileModal } from 'stores/modals';
    import DropdownTemplateDarken from '../DropdownTemplateDarken.svelte';
    import { socket } from 'stores/main';

    function acceptFriend(): void {
        socket.emit('acceptFriendRequest', {
            profileId: $targetProfileModal.profileId,
        });
    }

    function rejectFriend(): void {
        socket.emit('rejectFriendRequest', {
            profileId: $targetProfileModal.profileId,
        });
    }
</script>

<DropdownTemplateDarken>
    <button on:click={acceptFriend}
        ><h1>Accept friend</h1>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><g fill="none" stroke-width="1.5"
                ><circle cx="12" cy="12" r="10" /><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m8.5 12.5l2 2l5-5"
                /></g
            ></svg
        ></button
    >

    <hr />

    <button on:click={rejectFriend}
        ><h1>Reject friend</h1>
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
