<script lang="ts">
    import { type ModalData, targetTheme } from 'stores/modals';
    import { dismissModal, setProgressBar } from 'utilities/main';
    import { currentToken, socket } from 'stores/main';
    import { applyThemeLocally } from 'utilities/themes';
    import InfoHeader from '$lib/app/reusables/all/InfoHeader.svelte';
    import { setKey } from 'utilities/global';
    import ModalTemplatePro from '../ModalTemplatePRO.svelte';

    function applyTheme(): void {
        setProgressBar(true);

        setKey('token', $currentToken);

        socket.emit(
            'applyTheme',
            {
                title: $targetTheme.title,
            },
            ({ err }) => {
                if (!err) {
                    applyThemeLocally(
                        $targetTheme.title,
                        $targetTheme.brandingWhite,
                        $targetTheme.brandingDarkenWhite,
                        $targetTheme.brandingDark,
                        $targetTheme.brandingDarkenDark
                    );

                    location.href = '';
                }

                setProgressBar(false);
            }
        );
    }

    const data: ModalData = {
        title: 'Attention',
        actions: [
            {
                title: 'Apply theme',
                callback: applyTheme,
                primary: true,
            },
            {
                title: 'Dismiss',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplatePro {data}>
    <h1 class="modal-header">
        Applying this theme will save your credentials in this browser
    </h1>

    <InfoHeader
        marginLeft={'30px'}
        text={'You can log back out at any time'}
    /></ModalTemplatePro
>

<style>
    h1 {
        font-size: 1.2rem;
        width: 82%;
        text-align: start;
    }
</style>
