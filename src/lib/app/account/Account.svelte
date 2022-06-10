<script lang="ts">
    import Login from '$lib/app/account/Login.svelte';
    import Register from '$lib/app/account/Register.svelte';
    import RegisterVerify from '$lib/app/account/RegisterVerify.svelte';
    import {
        accountRegisterTab,
        accountRegisterVerifyTab,
    } from 'stores/app/account';
    import { fade } from 'svelte/transition';
</script>

{#if $accountRegisterTab}
    <div transition:fade={{ duration: 300 }}>
        {#if $accountRegisterVerifyTab}
            <div transition:fade={{ duration: 300 }}>
                <RegisterVerify />
            </div>
        {:else}
            <div transition:fade={{ duration: 300 }}>
                <Register />
            </div>
        {/if}
    </div>
{:else}
    <div transition:fade={{ duration: 300 }}>
        <Login />
    </div>
{/if}
