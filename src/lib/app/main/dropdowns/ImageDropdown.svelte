<script lang="ts">
    import { dropdownImage, type DropdownActions } from 'stores/dropdowns';
    import DropdownTemplate from '../DropdownTemplate.svelte';

    const defaultImageURL = 'https://fronvo.vercel.app/svgs/profile/avatar.svg';

    function openImage(): void {
        window.open($dropdownImage || defaultImageURL);
    }

    async function copyImageURL(): Promise<void> {
        await navigator.clipboard.writeText($dropdownImage || defaultImageURL);
    }

    const actions: DropdownActions[] = [
        {
            title: 'Open image',
            callback: openImage,
            useHr: true,
        },
        {
            title: 'Copy image URL',
            callback: copyImageURL,
        },
    ];
</script>

<DropdownTemplate {actions} />
