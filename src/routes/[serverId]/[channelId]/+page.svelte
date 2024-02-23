<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { indexVisible } from 'stores/index';
    import {
        cachedAccountData,
        currentToken,
        loginSucceeded,
        showLayout,
    } from 'stores/main';
    import { pendingChannelId, pendingServerId } from 'stores/rooms';
    import { onMount } from 'svelte';
    import { getKey } from 'utilities/global';
    import { redirectApp } from 'utilities/index';
    import { performLogin } from 'utilities/main';

    onMount(async () => {
        if ($loginSucceeded) return;

        // Remove homepage for registered users
        if (getKey('token')) {
            redirectApp();

            $currentToken = getKey('token');

            $pendingServerId = $page.params.serverId;
            $pendingChannelId = $page.params.channelId;

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
