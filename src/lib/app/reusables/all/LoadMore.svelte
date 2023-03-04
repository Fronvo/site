<script lang="ts">
    import ModernButton from './ModernButton.svelte';

    export let callback: () => void;
</script>

<div>
    <ModernButton {callback}>Load more</ModernButton>
</div>

<style>
    div {
        text-align: center;
        margin: 20px;
        margin-top: 30px;
    }

    @media screen and (max-width: 700px) {
        div {
            margin-bottom: 60px;
        }
    }
</style>
