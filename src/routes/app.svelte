<script lang="ts">
    import Account from '$lib/app/account/Account.svelte';
    import FailedToConnect from 'src/lib/app/FailedToConnect.svelte';
    import Loading from 'src/lib/app/Loading.svelte';
    import Main from 'src/lib/app/main/Main.svelte';
    import { accountVisible } from 'src/stores/app/account';
    import { appVisible } from 'src/stores/app/global';
    import { mainVisible } from 'src/stores/app/main';
    import {
        initSocket,
        resetSocket,
        socketConnected,
        socketTimeout,
    } from 'src/stores/global';
    import { onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';

    $appVisible = true;
    let socketFailed = false;

    initSocket();

    // If the connection failed, stop retrying in the background
    onDestroy(() => {
        resetSocket();
    });

    // Set connection timeout
    setTimeout(() => {
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
        {:else if $mainVisible}
            <div transition:fade={{ duration: 300 }}>
                <Main />
            </div>
        {:else if $accountVisible}
            <div transition:fade={{ duration: 300 }}>
                <Account />
            </div>
        {/if}
    </div>
{/if}
