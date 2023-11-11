<script lang="ts">
    import type { Theme } from 'interfaces/all';
    import { darkTheme, socket } from 'stores/main';
    import { ourData } from 'stores/profile';
    import { setProgressBar } from 'utilities/main';
    import { applyThemeLocally } from 'utilities/themes';

    export let theme: Theme;

    let color = `#${$darkTheme ? theme.brandingDark : theme.brandingWhite}`;

    function decideApplyAction(): void {
        if ($ourData.appliedTheme == theme.title) return;

        applyTheme();
    }

    function applyTheme(): void {
        setProgressBar(true);

        socket.emit(
            'applyTheme',
            {
                title: theme.title,
            },
            ({ err }) => {
                if (!err) {
                    applyThemeLocally(
                        theme.brandingWhite,
                        theme.brandingDarkenWhite,
                        theme.brandingDark,
                        theme.brandingDarkenDark
                    );

                    $ourData.appliedTheme = theme.title;
                }

                setProgressBar(false);
            }
        );
    }

    $: color = `#${$darkTheme ? theme.brandingDark : theme.brandingWhite}`;
</script>

<div
    class="theme-container"
    on:click={decideApplyAction}
    on:keydown={decideApplyAction}
>
    <div id="icon" style={`background: ${color}`} />

    <h1 id="title">{theme.title}</h1>

    {#if $ourData.appliedTheme == theme.title}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            ><g fill="none" stroke="var(--branding)" stroke-width="1.5"
                ><circle cx="12" cy="12" r="10" opacity=".5" /><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m8.5 12.5l2 2l5-5"
                /></g
            ></svg
        >
    {/if}
</div>

<style>
    .theme-container {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        background: transparent;
        cursor: pointer;
        width: 100%;
        padding: 8px;
        cursor: pointer;
    }

    div:hover {
        background: var(--primary);
    }

    div h1 {
        margin: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    #icon {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        width: 38px;
        height: 38px;
        border-radius: 30px;
        margin-right: 8px;
    }

    #title {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-size: 1.1rem;
        color: var(--text);
        font-weight: 600;
    }

    #icon {
        padding: 0;
        margin-right: 12px;
    }

    svg {
        width: 28px;
        height: 28px;
        margin-left: 10px;
    }
</style>
