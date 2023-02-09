<script lang="ts">
    import { sessionTime, sessionWarningShown } from 'stores/all';
    import { dismissModal } from 'utilities/main';
    import { getKey } from 'utilities/global';
    import type { ModalData } from 'types/main';
    import ModalTemplate from '../ModalTemplate.svelte';

    function resetSession(): void {
        $sessionTime = 0;
        $sessionWarningShown = false;

        dismissModal();
    }

    const data: ModalData = {
        title: 'Max online time',

        actions: [
            {
                title: 'Reset',
                callback: resetSession,
            },
        ],

        removeTransparency: true,
    };
</script>

<ModalTemplate {data}>
    <h1 class="modal-header">
        You have reached your maximum online time allowance of <span
            >{getKey('maxOnlineTime') / 60}</span
        > minute(s).
    </h1>

    <h1 class="modal-header">
        You should exit Fronvo now but you can also reset the session time.
    </h1>
</ModalTemplate>

<style>
</style>
