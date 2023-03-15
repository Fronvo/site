<script lang="ts">
    import { goto } from '$app/navigation';
    import { communityData, replyingTo } from 'stores/community';
    import type { DropdownActions } from 'stores/dropdowns';
    import { homePosts } from 'stores/home';
    import { cachedAccountData, queuedAccounts, socket } from 'stores/main';
    import { modalSide, ModalTypes } from 'stores/modals';
    import { PanelTypes } from 'stores/panels';
    import {
        ourData,
        ourPosts,
        pendingSearchId,
        searchData,
    } from 'stores/profile';
    import { removeKey } from 'utilities/global';
    import {
        dismissModal,
        performLogin,
        setProgressBar,
        showModal,
        switchPanel,
    } from 'utilities/main';
    import { loadTargetProfile } from 'utilities/profile';
    import DropdownTemplate from '../DropdownTemplate.svelte';

    function editProfile(): void {
        showModal(ModalTypes.EditProfile);
    }

    function logout(): void {
        setProgressBar(true);

        socket.emit('logout', async ({ err }) => {
            if (err) return;

            removeKey('token');

            // Login state, home posts, profile, community need refreshing
            $homePosts = undefined;

            $ourData = undefined;
            $ourPosts = undefined;
            $searchData = undefined;
            $pendingSearchId = undefined;

            $communityData = undefined;
            $replyingTo = undefined;

            // Reset cache
            $queuedAccounts = [];
            $cachedAccountData = [];

            // And finally, modals
            $modalSide = undefined;

            await performLogin(undefined, $cachedAccountData);

            goto('/home', {
                replaceState: true,
            });

            switchPanel(PanelTypes.Home);

            setProgressBar(false);

            dismissModal();
        });
    }

    const actions: DropdownActions[] = [
        {
            title: 'View profile',
            callback: () =>
                loadTargetProfile($ourData.profileId, $cachedAccountData),
            useHr: true,
        },
        {
            title: 'Edit profile',
            callback: editProfile,
        },
        {
            title: 'Logout',
            callback: logout,
        },
    ];
</script>

<DropdownTemplate {actions} />
