<script lang="ts">
    import type { DropdownActions } from 'stores/dropdowns';
    import { cachedAccountData, socket } from 'stores/main';
    import { ourData } from 'stores/profile';
    import { searchData } from 'stores/profile';
    import { setProgressBar, updateCachedAccount } from 'utilities/main';
    import DropdownTemplate from '../DropdownTemplate.svelte';

    function checkDisable(): boolean {
        // We must be an admin
        if (!$ourData.isAdmin) {
            return false;
        }

        // If target isn't an admin aswell, can disable
        if (!$searchData.isAdmin && $ourData.isAdmin) {
            return true;
        }

        return false;
    }

    function toggleDisable(): void {
        setProgressBar(true);

        socket.emit(
            'toggleDisableAccount',
            { profileId: $searchData.profileId },
            ({ err }) => {
                if (!err) {
                    $searchData.isDisabled = !$searchData.isDisabled;
                }

                updateCachedAccount($searchData.profileId, $cachedAccountData);

                setProgressBar(false);
            }
        );
    }

    const actions: DropdownActions[] = [
        {
            title: `${$searchData?.isDisabled ? 'Enable' : 'Disable'} profile`,
            callback: toggleDisable,
            condition: checkDisable() || true,
        },
    ];
</script>

<DropdownTemplate {actions} />
