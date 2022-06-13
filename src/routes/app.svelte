<script lang="ts">
    import Account from '$lib/app/account/Account.svelte';
    import FailedToConnect from '$lib/app/FailedToConnect.svelte';
    import Loading from '$lib/app/Loading.svelte';
    import Main from '$lib/app/main/Main.svelte';
    import { accountRegisterTab } from 'stores/app/account';
    import {
        appVisible,
        hasLoggedIn,
        showLoadingDelay,
        tokenInvalid,
    } from 'stores/app/global';
    import {
        initSocket,
        resetSocket,
        socket,
        socketConnected,
        socketTimeout,
    } from 'stores/global';
    import { onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';
    import { getKey } from 'utilities/global';

    $appVisible = true;

    // Reset tab
    $accountRegisterTab = true;
    let socketFailed = false;
    let showLoading = false;

    // Only init socket if the /app route is accessed riectly, no index to preinit
    if (!socket) {
        initSocket();
    }

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

    // Show loading after delay
    setTimeout(() => {
        showLoading = true;
    }, showLoadingDelay);
</script>

{#if $appVisible}
    <div in:fade={{ duration: 500 }} out:fade>
        {#if !$socketConnected}
            {#if showLoading && !socketFailed}
                <div transition:fade>
                    <Loading text="Connecting to Fronvo" />
                </div>
            {:else if socketFailed}
                <div transition:fade>
                    <FailedToConnect />
                </div>
            {/if}
        {:else if (getKey('token') || $hasLoggedIn) && !$tokenInvalid}
            <Main />
        {:else}
            <Account />
        {/if}
    </div>
{/if}
