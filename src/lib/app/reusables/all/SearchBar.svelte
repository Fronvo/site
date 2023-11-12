<script lang="ts">
    import { dmsFilter } from 'stores/rooms';
</script>

<div class="search-container">
    <input
        maxlength={20}
        bind:value={$dmsFilter}
        placeholder="Search for people"
    />
</div>

<style>
    .search-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        background: var(--bg);
        border-radius: 5px;
        width: 85%;
        min-height: 30px;
        margin: 10px;
        margin-bottom: 0;
        margin-top: 10px;
        cursor: pointer;
        text-align: center;
        user-select: none;
    }

    .search-container input {
        margin: 0;
        font-size: 0.9rem;
        margin-left: 5px;
        background: var(--bg);
        color: white;
    }

    .search-container input::placeholder {
        color: rgb(129, 133, 141);
    }
</style>
