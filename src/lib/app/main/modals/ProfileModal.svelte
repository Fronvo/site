<script lang="ts">
    import ModalTemplate from '../ModalTemplate.svelte';
    import { targetProfileModal, type ModalData } from 'stores/modals';
    import PreviewLarge from '$lib/app/reusables/all/PreviewLarge.svelte';

    const profileData = $targetProfileModal;

    const data: ModalData = {
        noDecoration: true,
        transparent: false,
    };
</script>

<ModalTemplate {data}>
    <PreviewLarge {profileData} />
</ModalTemplate>
