<script lang="ts">
    import Login from '$lib/app/account/Login.svelte';
    import Register from '$lib/app/account/Register.svelte';
    import RegisterVerify from '$lib/app/account/RegisterVerify.svelte';
    import {
        accountRegisterTab,
        accountRegisterVerifyTab,
        accountResetPasswordFinalTab,
        accountResetPasswordTab,
        accountResetPasswordVerifyTab,
    } from 'stores/app/account';
    import ResetPassword from './ResetPassword.svelte';
    import ResetPasswordFinal from './ResetPasswordFinal.svelte';
    import ResetPasswordVerify from './ResetPasswordVerify.svelte';
</script>

{#if $accountRegisterVerifyTab}
    <RegisterVerify />
{:else if $accountResetPasswordTab}
    {#if $accountResetPasswordFinalTab}
        <ResetPasswordFinal />
    {:else if $accountResetPasswordVerifyTab}
        <ResetPasswordVerify />
    {:else}
        <ResetPassword />
    {/if}
{:else if $accountRegisterTab}
    <Register />
{:else}
    <Login />
{/if}
