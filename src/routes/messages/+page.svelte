<script lang="ts">
    import { goto } from '$app/navigation';
    import { activeDashboardTab } from 'stores/dashboard';
    import { indexVisible } from 'stores/index';
    import {
        cachedAccountData,
        currentToken,
        isMobile,
        loginSucceeded,
        showLayout,
    } from 'stores/main';
    import {
        currentChannel,
        currentRoomData,
        currentRoomId,
        currentRoomLoaded,
        currentServer,
        isInServer,
    } from 'stores/rooms';
    import { onMount } from 'svelte';
    import { DashboardOptions } from 'types/all';
    import { getKey } from 'utilities/global';
    import { redirectApp } from 'utilities/index';
    import { performLogin } from 'utilities/main';

    onMount(async () => {
        if ($loginSucceeded) {
            $currentRoomId = undefined;
            $currentRoomData = undefined;
            $currentRoomLoaded = false;
            $isInServer = false;
            $currentServer = undefined;
            $currentChannel = undefined;

            return;
        }

        // Remove homepage for registered users
        if ($isMobile && getKey('token')) {
            redirectApp();

            $currentToken = getKey('token');

            $activeDashboardTab = DashboardOptions.Messages;

            await performLogin(getKey('token'), $cachedAccountData);
            return;
        }

        // Disable __layout in index
        $showLayout = false;

        // Default when accessed
        $indexVisible = true;

        goto('/', {
            replaceState: true,
        });
    });
</script>
