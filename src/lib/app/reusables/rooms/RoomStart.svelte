<script lang="ts">
    import {
        currentRoomData,
        currentRoomMessages,
        sendContent,
    } from 'stores/rooms';

    // TODO: Complete the rest when added
    var shouldText = $currentRoomMessages.length == 0;

    function personaliseServer(): void {}

    function sendMessage(): void {
        if (!shouldText) return;

        $sendContent = 'My first message!';
    }

    function createInvite(): void {}

    $: shouldText = $currentRoomMessages.length == 0;
</script>

<div class="start-container">
    <h1 id="intro">Welcome to {$currentRoomData.name}</h1>
    <h1 id="descriptor">
        This is your new server on Fronvo. You can customise the server to your
        liking and later invite your friends!
    </h1>

    <div
        class="option"
        on:click={personaliseServer}
        on:keydown={personaliseServer}
    >
        <svg
            id="decorator"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            ><path
                fill-rule="evenodd"
                d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22Zm-3-5.25a.75.75 0 0 1 0-1.5h6a.75.75 0 0 1 0 1.5H9Zm1-6.25c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S8.448 9 9 9s1 .672 1 1.5Zm5 1.5c.552 0 1-.672 1-1.5S15.552 9 15 9s-1 .672-1 1.5s.448 1.5 1 1.5Z"
                clip-rule="evenodd"
            /></svg
        >

        <h1>Personalise your server</h1>

        <svg
            id="arrow"
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
                d="m9 5l6 7l-6 7"
            /></svg
        >
    </div>
    <div class="option" on:click={sendMessage} on:keydown={sendMessage}>
        <svg
            id="decorator"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            ><path
                fill-rule="evenodd"
                d="M3.464 3.464C2 4.93 2 7.286 2 12c0 4.714 0 7.071 1.464 8.535C4.93 22 7.286 22 12 22c4.714 0 7.071 0 8.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536C19.072 2 16.714 2 12 2S4.929 2 3.464 3.464ZM9.952 6.25c-.43 0-.832 0-1.16.049c-.371.055-.752.186-1.057.525c-.294.327-.398.717-.443 1.089c-.042.348-.042.78-.042 1.267v.57a.75.75 0 0 0 1.5 0v-.528c0-.543.001-.882.031-1.129a.976.976 0 0 1 .046-.22a.133.133 0 0 1 .023-.046h.001c.001-.002.002-.003.011-.008a.592.592 0 0 1 .152-.037c.204-.03.491-.032.986-.032h1.25v8.5H9.5a.75.75 0 0 0 0 1.5H15a.75.75 0 0 0 0-1.5h-2.25v-8.5H14c.495 0 .782.002.986.032c.092.014.135.03.152.037l.011.007v.001a.13.13 0 0 1 .024.045c.014.038.032.105.046.221c.03.247.031.586.031 1.13v.527a.75.75 0 0 0 1.5 0v-.57c0-.488 0-.919-.042-1.267c-.045-.372-.149-.762-.443-1.09c-.305-.338-.686-.469-1.057-.524c-.328-.05-.73-.05-1.16-.049H9.952Z"
                clip-rule="evenodd"
            /></svg
        >

        <h1>Send a message</h1>

        {#if shouldText}
            <svg
                id="arrow"
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
                    d="m9 5l6 7l-6 7"
                /></svg
            >
        {:else}
            <svg
                id="completed"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                stroke="currentColor"
                ><g fill="none" stroke-width="1.5"
                    ><circle cx="12" cy="12" r="10" opacity=".5" /><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m8.5 12.5l2 2l5-5"
                    /></g
                ></svg
            >
        {/if}
    </div>
    <div class="option" on:click={createInvite} on:keydown={createInvite}>
        <svg
            id="decorator"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            ><path
                fill-rule="evenodd"
                d="M12 2C7.286 2 4.929 2 3.464 3.464C2 4.93 2 7.286 2 12c0 4.714 0 7.071 1.464 8.535C4.93 22 7.286 22 12 22c4.714 0 7.071 0 8.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536C19.072 2 16.714 2 12 2Zm-.889 3.673a4.074 4.074 0 0 1 3.614 0c.565.28 1.072.774 1.829 1.511l.1.098l.104.1c.754.735 1.263 1.23 1.553 1.783a3.836 3.836 0 0 1 0 3.565c-.29.554-.799 1.049-1.553 1.783l-.104.1l-2.203 2.146l-.034.033c-.18.175-.32.311-.461.417a2.74 2.74 0 0 1-3.27 0a4.955 4.955 0 0 1-.46-.417l-.035-.033l-.034-.034c-.18-.175-.32-.311-.429-.45a2.606 2.606 0 0 1 0-3.236c.11-.139.25-.275.429-.45l.034-.034l1.699-1.653a.75.75 0 0 1 1.046 1.075l-1.698 1.653c-.23.225-.292.287-.332.337a1.106 1.106 0 0 0 0 1.38c.04.05.101.113.332.337c.23.224.295.284.347.323a1.24 1.24 0 0 0 1.473 0c.052-.039.117-.1.347-.323l2.203-2.145c.897-.874 1.21-1.191 1.374-1.504a2.336 2.336 0 0 0 0-2.174c-.164-.313-.477-.63-1.374-1.504c-.895-.872-1.224-1.179-1.55-1.34a2.574 2.574 0 0 0-2.28 0c-.326.161-.655.468-1.55 1.34L7.99 10.535c-.503.49-.681.668-.797.83a2.342 2.342 0 0 0 0 2.74c.116.162.294.34.797.83a.75.75 0 1 1-1.046 1.075l-.058-.056c-.424-.413-.709-.69-.913-.975a3.842 3.842 0 0 1 0-4.487c.204-.285.489-.562.913-.975l.058-.056l2.238-2.179l.1-.098c.757-.737 1.264-1.231 1.83-1.511Z"
                clip-rule="evenodd"
            /></svg
        >

        <h1>Invite your friends</h1>

        <svg
            id="arrow"
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
                d="m9 5l6 7l-6 7"
            /></svg
        >
    </div>
</div>

<style>
    .start-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: end;
        flex-wrap: wrap;
        margin: auto;
        height: 100%;
        user-select: none;
        padding-top: 50px;
    }

    h1 {
        margin: 0;
        text-align: center;
        width: 375px;
    }

    #intro {
        font-weight: 600;
        font-size: 2rem;
    }

    #descriptor {
        font-size: 0.9rem;
        font-weight: 500;
        color: var(--gray);
        text-align: center;
        margin-bottom: 10px;
    }

    .option {
        display: flex;
        align-items: center;
        justify-content: start;
        width: 400px;
        max-width: 400px;
        height: 75px;
        background: var(--bg);
        border-radius: 10px;
        margin: 10px;
        padding: 15px;
        cursor: pointer;
        transition: 125ms;
        border: 2px solid var(--pro);
    }

    .option:hover {
        background: var(--primary);
    }

    .option:hover #arrow {
        transform: translateX(5px);
    }

    .option h1 {
        font-size: 0.9rem;
        font-weight: 600;
        flex: 1;
        text-align: start;
    }

    .option #decorator {
        width: 40px;
        height: 40px;
        fill: var(--pro);
        margin-right: 10px;
    }

    .option #arrow {
        width: 24px;
        height: 24px;
        stroke: var(--text);
        transition: 150ms;
    }

    .option #completed {
        width: 32px;
        height: 32px;
        stroke: var(--pro);
    }
</style>
