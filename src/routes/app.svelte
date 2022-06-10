<script lang="ts">
    import Account from '$lib/app/account/Account.svelte';
    import FailedToConnect from '$lib/app/FailedToConnect.svelte';
    import Loading from '$lib/app/Loading.svelte';
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
    import { fade } from 'svelte/transition';
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
    <div transition:fade={{ duration: 300 }}>
        {#if !$socketConnected}
            {#if !socketFailed}
                <div transition:fade={{ duration: 300 }}>
                    <Loading text="Connecting to Fronvo" />
                </div>
            {:else}
                <div transition:fade={{ duration: 300 }}>
                    <FailedToConnect />
                </div>
            {/if}
        {:else if (getKey('token') || $hasLoggedIn) && !$tokenInvalid}
            <!-- Login with loading -->
            <div in:fade={{ duration: 300, delay: 300 }}>
                <Main />
            </div>
        {:else}
            <div in:fade={{ duration: 300, delay: 300 }}>
                <Account />
            </div>
        {/if}
    </div>
{/if}
