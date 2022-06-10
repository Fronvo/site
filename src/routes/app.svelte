<script lang="ts">
    import Account from '$lib/app/account/Account.svelte';
    import FailedToConnect from '$lib/app/FailedToConnect.svelte';
    import Main from '$lib/app/main/Main.svelte';
    import { accountRegisterTab } from 'src/stores/app/account';
    import { appVisible, hasLoggedIn, tokenInvalid } from 'stores/app/global';
    import {
        initSocket,
        resetSocket,
        socketConnected,
        socketTimeout,
    } from 'stores/global';
    import { onDestroy } from 'svelte';
    import { getKey } from 'utilities/global';

    $appVisible = true;

    // Reset tab
    $accountRegisterTab = true;
    let socketFailed = false;

    initSocket();

    // If the connection failed, stop retrying in the background
    onDestroy(() => {
        if ($socketConnected) return;

        resetSocket();
    });

    // Set connection timeout
    setTimeout(() => {
        if ($socketConnected) return;

        socketFailed = true;

        resetSocket();
    }, socketTimeout);
</script>

{#if $appVisible}
    <div>
        {#if !$socketConnected}
            {#if socketFailed}
                <FailedToConnect />
            {/if}
        {:else if (getKey('token') || $hasLoggedIn) && !$tokenInvalid}
            <!-- Login with loading -->
            <Main />
        {:else}
            <Account />
        {/if}
    </div>
{/if}
