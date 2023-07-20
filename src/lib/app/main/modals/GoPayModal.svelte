<script lang="ts">
    import { dismissModal } from 'utilities/main';
    import type { ModalData } from 'stores/modals';
    import ModalTemplatePro from '../ModalTemplatePRO.svelte';

    const data: ModalData = {
        actions: [
            {
                title: 'Cancel',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplatePro {data}>
    <!-- TODO: Stripe elements -->
</ModalTemplatePro>
