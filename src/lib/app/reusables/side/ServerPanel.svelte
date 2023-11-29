<script lang="ts">
    import { currentRoomData } from 'stores/rooms';
</script>

<div class="server-container">
    <div class="top">
        <h1>{$currentRoomData?.name}</h1>

        <svg
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
                d="m19 9l-7 6l-7-6"
            /></svg
        >
    </div>
</div>

<style>
    .server-container {
        width: 235px;
        flex: 1;
        user-select: none;
    }

    .top {
        display: flex;
        align-items: center;
        padding-left: 20px;
        padding-right: 15px;
        transition: 125ms;
        border-bottom: 1px solid rgb(23, 23, 23);
        box-shadow: 0 0 10px rgb(25, 25, 25);
        padding-top: 5px;
        padding-bottom: 5px;
        cursor: pointer;
    }

    .top:hover {
        background: var(--secondary);
    }

    .top h1 {
        font-size: 1rem;
        font-weight: 600;
        flex: 1;
    }

    .top svg {
        width: 22px;
        height: 22px;
        fill: var(--text);
        stroke: var(--text);
    }
</style>
