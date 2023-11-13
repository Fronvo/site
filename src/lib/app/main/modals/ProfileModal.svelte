<script lang="ts">
    import ModalTemplate from '../ModalTemplate.svelte';
    import {
        targetProfileModal,
        type ModalData,
        ModalTypes,
    } from 'stores/modals';
    import { showModal } from 'utilities/main';
    import PreviewLarge from '$lib/app/reusables/all/PreviewLarge.svelte';

    const profileData = $targetProfileModal;

    const data: ModalData = {};
</script>

<ModalTemplate {data}>
    <PreviewLarge {profileData} />
</ModalTemplate>
