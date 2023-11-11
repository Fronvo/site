<script lang="ts">
    import ThemeColors from '$lib/app/reusables/themes/ThemeColors.svelte';
    import { writable } from 'svelte/store';
    import ModalTemplatePro from '../ModalTemplatePRO.svelte';
    import type { ModalData } from 'stores/modals';
    import { dismissModal, setProgressBar } from 'utilities/main';
    import { socket } from 'stores/main';
    import { loadThemes } from 'utilities/themes';
    import ThemeTitle from '$lib/app/reusables/themes/ThemeTitle.svelte';

    export let creating = true;

    let title = writable('');
    let brandingWhite = writable('');
    let brandingDarkenWhite = writable('');
    let brandingDark = writable('');
    let brandingDarkenDark = writable('');

    function createTheme(): void {
        if (!$title) return;

        setProgressBar(true);

        socket.emit(
            'createTheme',
            {
                title: $title,
                brandingWhite: $brandingWhite,
                brandingDarkenWhite: $brandingDarkenWhite,
                brandingDark: $brandingDark,
                brandingDarkenDark: $brandingDarkenDark,
            },
            async ({ err }) => {
                if (!err) {
                    await loadThemes();

                    dismissModal();
                }

                setProgressBar(false);
            }
        );
    }

    const data: ModalData = {
        title: '',
        actions: [
            {
                title: 'Create theme',
                callback: createTheme,
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
    <div class="theme-container">
        <ThemeTitle {creating} bind:title={$title} />

        <ThemeColors
            bind:brandingWhite={$brandingWhite}
            bind:brandingDarkenWhite={$brandingDarkenWhite}
            bind:brandingDark={$brandingDark}
            bind:brandingDarkenDark={$brandingDarkenDark}
        />
    </div>
</ModalTemplatePro>

<style>
    .theme-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: start;
    }
</style>
