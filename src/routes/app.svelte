<script lang="ts">
    import { showLayout } from 'stores/global';

    $showLayout = true;
</script>

<style>
    /* Not needed on desktop with mobile width */
    @media screen and (max-width: 720px) {
        :global(::-webkit-scrollbar) {
            width: 0px;
        }
    }
</style>
