<script lang="ts">
    import { socket } from 'stores/main';
    import { type ModalData, targetTheme } from 'stores/modals';
    import { dismissModal, setProgressBar } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { loadThemes } from 'utilities/themes';
    import { toast } from 'svelte-sonner';
    import ThemePreviewLarge from '$lib/app/reusables/all/ThemePreviewLarge.svelte';

    function deletePost(): void {
        setProgressBar(true);

        socket.emit(
            'deleteTheme',
            {
                title: $targetTheme.title,
            },
            async ({ err }) => {
                if (err) {
                    dismissModal();
                } else {
                    await loadThemes();

                    dismissModal();

                    toast('Theme deleted');
                }

                setProgressBar(false);
            }
        );
    }

    const data: ModalData = {
        title: 'Delete theme',
        actions: [
            {
                title: 'Delete',
                callback: deletePost,
                danger: true,
            },
            {
                title: 'Dismiss',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    <ThemePreviewLarge themeData={$targetTheme} />
</ModalTemplate>
