<script lang="ts">
    import { channelFilter } from 'stores/rooms';
</script>

<div class="search-container">
    <input
        maxlength={20}
        bind:value={$channelFilter}
        placeholder="Search messages"
    />
</div>

<style>
    .search-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        background: var(--bg);
        border-radius: 5px;
        width: max-content;

        cursor: pointer;
        text-align: center;
        user-select: none;
    }

    .search-container input {
        margin: 0;
        font-size: 0.9rem;
        font-weight: 600;
        margin-left: 5px;
        background: var(--bg);
        color: white;
    }

    .search-container input::placeholder {
        color: rgb(129, 133, 141);
    }
</style>
