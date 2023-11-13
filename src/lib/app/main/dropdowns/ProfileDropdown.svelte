<script>
    import { targetProfileModal } from 'stores/modals';
    import DropdownTemplateEmpty from '../DropdownTemplateEmpty.svelte';
    import PreviewSmall from '$lib/app/reusables/all/PreviewSmall.svelte';
</script>

<DropdownTemplateEmpty>
    <PreviewSmall profileData={$targetProfileModal} />
</DropdownTemplateEmpty>
