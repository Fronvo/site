<script>
    import ProfilePreviewSmall from '$lib/app/reusables/all/ProfilePreviewSmall.svelte';
    import { targetProfileModal } from 'stores/modals';

    import DropdownTemplateEmpty from '../DropdownTemplateEmpty.svelte';
</script>

<DropdownTemplateEmpty>
    <ProfilePreviewSmall profileData={$targetProfileModal} />
</DropdownTemplateEmpty>
