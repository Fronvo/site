<script lang="ts">
    import type { AccountPost } from 'interfaces/all';
    import type { DropdownActions } from 'stores/dropdowns';
    import { cachedAccountData } from 'stores/main';
    import { ModalTypes, postModalInfo } from 'stores/modals';
    import { currentPanelId, PanelTypes } from 'stores/panels';
    import { ourData } from 'stores/profile';
    import { dismissDropdown, showModal } from 'utilities/main';
    import { loadTargetProfile } from 'utilities/profile';
    import DropdownTemplate from '../DropdownTemplate.svelte';

    const isProfilePanel = $currentPanelId == PanelTypes.Profile;

    function isOwner(): boolean {
        return ($postModalInfo as AccountPost).author == $ourData.profileId;
    }

    function deletePost(): void {
        showModal(ModalTypes.DeletePost);
    }

    async function viewProfile(): Promise<void> {
        loadTargetProfile(
            ($postModalInfo as AccountPost).author,
            $cachedAccountData
        );

        dismissDropdown();
    }

    const actions: DropdownActions[] = [
        {
            title: 'View profile',
            condition: !isProfilePanel,
            callback: viewProfile,
            useHr: isOwner() && !isProfilePanel,
        },
        {
            title: 'Delete',
            callback: deletePost,
            condition: isOwner(),
        },
    ];
</script>

<DropdownTemplate {actions} />
