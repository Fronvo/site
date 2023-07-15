<script lang="ts">
    import { dismissModal } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import type { ModalData } from 'stores/modals';
    import InfoHeader from '$lib/app/reusables/all/InfoHeader.svelte';

    const data: ModalData = {
        title: 'Max rooms reached',
        actions: [
            {
                title: 'Dismiss',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    <h1 class="modal-header">You have created over 5 rooms.</h1>

    <InfoHeader
        marginLeft={'50px'}
        text={'Try deleting some of your existing ones.'}
    />
</ModalTemplate>

<style>
    h1 {
        width: 78%;
        text-align: start;
    }
</style>
