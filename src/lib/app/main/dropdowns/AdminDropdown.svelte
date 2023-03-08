<script lang="ts">
    import type { DropdownActions } from 'stores/dropdowns';
    import DropdownTemplate from '../DropdownTemplate.svelte';

    const actions: DropdownActions[] = [];
</script>

<DropdownTemplate {actions} />
