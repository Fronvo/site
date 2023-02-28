<script lang="ts">
    import { dropdownLink, type DropdownActions } from 'stores/dropdowns';
    import DropdownTemplate from '../DropdownTemplate.svelte';

    const defaultImageURL = 'https://fronvo.vercel.app/svgs/profile/avatar.svg';

    function openImage(): void {
        window.open($dropdownLink || defaultImageURL);
    }

    async function copyImageURL(): Promise<void> {
        await navigator.clipboard.writeText($dropdownLink || defaultImageURL);
    }

    const actions: DropdownActions[] = [
        {
            title: 'Open link',
            callback: openImage,
            useHr: true,
        },
        {
            title: 'Copy link',
            callback: copyImageURL,
        },
    ];
</script>

<DropdownTemplate {actions} />
