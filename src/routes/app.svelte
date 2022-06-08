<script lang="ts">
    import Account from '$lib/app/account/Account.svelte';
    import Main from 'src/lib/app/main/Main.svelte';
    import { accountVisible } from 'src/stores/app/account';
    import { appVisible } from 'src/stores/app/global';
    import { mainVisible } from 'src/stores/app/main';
    import { initSocket, socketConnected } from 'src/stores/global';
    import { fade } from 'svelte/transition';
    import Loading from 'src/lib/app/Loading.svelte';

    $appVisible = true;

    initSocket();
</script>

{#if $appVisible}
    <div transition:fade={{ duration: 300 }}>
        {#if !$socketConnected}
            <div transition:fade={{ duration: 300 }}>
                <Loading text="Connecting to Fronvo" />
            </div>
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
