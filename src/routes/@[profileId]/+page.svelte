<script lang="ts">
    import { page } from '$app/stores';
    import { showLayout } from 'stores/main';
    import { pendingSearchId } from 'stores/profile';

    $pendingSearchId = $page.params.profileId;

    $showLayout = true;
</script>
