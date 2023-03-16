<script lang="ts">
    import { writable, type Writable } from 'svelte/store';
    import { dismissModal, setProgressBar, switchPanel } from 'utilities/main';
    import { loadCommunitiesData } from 'utilities/communities';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { cachedAccountData, socket } from 'stores/main';
    import type { ModalData } from 'stores/modals';
    import { loadOurProfile } from 'utilities/profile';
    import { PanelTypes } from 'stores/panels';
    import ErrorHeader from '$lib/app/reusables/all/ErrorHeader.svelte';

    let name: string;
    let icon: Writable<string> = writable('');
    let isCreating = false;
    let errorMessage: string;

    function createCommunity(): void {
        if (isCreating || !name) return;

        isCreating = true;

        setProgressBar(true);

        socket.emit(
            'createCommunity',
            {
                name,
                icon: $icon,
            },
            async ({ err }) => {
                if (err) {
                    errorMessage = err.msg;
                    isCreating = false;
                    setProgressBar(false);

                    return;
                }

                // Update community panel
                await loadCommunitiesData(
                    await loadOurProfile($cachedAccountData)
                );

                switchPanel(PanelTypes.Community);

                dismissModal();
            }
        );
    }

    const data: ModalData = {
        title: 'Create Community',

        actions: [
            {
                title: 'Create',
                callback: createCommunity,
            },
            {
                title: 'Discard',
                callback: dismissModal,
            },
        ],

        useSecondaryHr: true,
    };
</script>

<ModalTemplate {data}>
    <ErrorHeader {errorMessage} />

    <input
        placeholder="Community name"
        class="modal-input"
        bind:value={name}
        maxlength={15}
    />
</ModalTemplate>
