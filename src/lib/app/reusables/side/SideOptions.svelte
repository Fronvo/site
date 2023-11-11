<script lang="ts">
    import MessagesList from './MessagesList.svelte';
</script>

<div class="options-container">
    <MessagesList />
</div>

<style>
    .options-container {
        height: 100%;
        border-right: 1px solid var(--primary);
        width: 275px;
    }
</style>
