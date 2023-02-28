<script lang="ts">
    import type { DropdownActions } from 'stores/dropdowns';
    import { darkTheme, dataSaver, xmasMode } from 'stores/main';
    import { setKey } from 'utilities/global';
    import DropdownTemplate from '../DropdownTemplate.svelte';

    function toggleTheme(): void {
        $darkTheme = !$darkTheme;
        setKey('darkTheme', $darkTheme);
    }

    function toggleDataSaver(): void {
        $dataSaver = !$dataSaver;
        setKey('dataSaver', $dataSaver);
    }

    function toggleXmasMode(): void {
        $xmasMode = !$xmasMode;
        setKey('xmasMode', $xmasMode);
    }

    const actions: DropdownActions[] = [
        {
            title: `${$darkTheme ? 'White' : 'Dark'} theme`,
            callback: toggleTheme,
            useHr: true,
        },
        {
            title: `${$dataSaver ? 'Disable' : 'Enable'} data saver`,
            callback: toggleDataSaver,
            useHr: new Date().getMonth() == 11,
        },
        {
            title: `${$xmasMode ? 'Disable' : 'Enable'} christmas mode`,
            callback: toggleXmasMode,
            condition: new Date().getMonth() == 11,
        },
    ];
</script>

<DropdownTemplate {actions} />
