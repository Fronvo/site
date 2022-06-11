<script lang="ts">
    import Login from '$lib/app/account/Login.svelte';
    import Register from '$lib/app/account/Register.svelte';
    import RegisterVerify from '$lib/app/account/RegisterVerify.svelte';
    import {
        accountRegisterTab,
        accountRegisterVerifyTab,
    } from 'stores/app/account';
</script>

{#if $accountRegisterTab}
    {#if $accountRegisterVerifyTab}
        <RegisterVerify />
    {:else}
        <Register />
    {/if}
{:else}
    <Login />
{/if}
