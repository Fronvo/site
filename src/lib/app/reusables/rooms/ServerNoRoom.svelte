<script lang="ts">
    import { currentServer } from 'stores/rooms';
</script>

<div class="no-container">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
        ><path
            fill-rule="evenodd"
            d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22Zm0-14.25c-.621 0-1.125.504-1.125 1.125a.75.75 0 0 1-1.5 0a2.625 2.625 0 1 1 4.508 1.829c-.092.095-.18.183-.264.267a6.666 6.666 0 0 0-.571.617c-.22.282-.298.489-.298.662V13a.75.75 0 0 1-1.5 0v-.75c0-.655.305-1.186.614-1.583c.229-.294.516-.58.75-.814c.07-.07.136-.135.193-.194A1.125 1.125 0 0 0 12 7.75ZM12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
            clip-rule="evenodd"
        /></svg
    >
    <h1 id="intro">Welcome to {$currentServer.name}</h1>
    <h1 id="descriptor">
        Start by {$currentServer?.channels.length > 0
            ? 'selecting'
            : 'creating'} a channel {$currentServer?.channels.length > 0
            ? 'from'
            : 'in'} this server
    </h1>
</div>

<style>
    .no-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        user-select: none;
        background: rgb(15, 15, 15);
        padding-right: 100px;
    }

    svg {
        width: 128px;
        height: 128px;
        fill: var(--gray);
        margin-bottom: 10px;
        cursor: default;
    }

    #intro {
        margin: 0;
        font-size: 1.1rem;
        color: var(--gray);
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 0.5px;
        text-align: center;
    }

    #descriptor {
        margin: 0;
        font-size: 1rem;
        color: grey;
        font-weight: 500;
        letter-spacing: 0.5px;
        text-align: center;
    }

    @media screen and (max-width: 1050px) {
        .no-container {
            padding-right: 0;
        }
    }
</style>
