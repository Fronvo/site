<script lang="ts">
    import { dismissModal, showModal } from 'utilities/main';
    import { ModalTypes, type ModalData } from 'stores/modals';
    import ModalTemplatePro from '../ModalTemplatePRO.svelte';

    function goPRO(): void {
        showModal(ModalTypes.GoPay);
    }

    const data: ModalData = {
        title: 'Welcome to the PRO club',
        actions: [
            {
                title: 'Go PRO',
                callback: goPRO,
                pro: true,
            },
            {
                title: 'Cancel',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplatePro {data}>
    <!-- TODO: UI -->
</ModalTemplatePro>
