<script lang="ts">
    import type { FronvoError } from 'interfaces/all';
    import {
        accountRegisterTab,
        accountResetPasswordTab,
        accountResetPasswordVerifyTab,
    } from 'stores/account';
    import { socket } from 'stores/main';
    import { onMount, onDestroy } from 'svelte';
    import AccountButton from '../reusables/index/AccountButton.svelte';
    import AccountHeader from '../reusables/index/AccountHeader.svelte';
    import AccountHeaderError from '../reusables/index/AccountHeaderError.svelte';
    import AccountInput from '../reusables/index/AccountInput.svelte';
    import AccountRedirect from '../reusables/index/AccountRedirect.svelte';
    import AccountTemplate from '../reusables/index/AccountTemplate.svelte';

    let email = '';
    let errorMessage: string;

    let isResetting = false;

    function keyListener(ev: KeyboardEvent): void {
        if (ev.key == 'Enter') {
            reset();
        }

        if (ev.ctrlKey || ev.altKey) return;
    }

    onMount(() => {
        document.addEventListener('keydown', keyListener);
    });

    onDestroy(() => {
        document.removeEventListener('keydown', keyListener);
    });

    function reset(): void {
        if (isResetting) return;

        function toggleUI(state: boolean): void {
            isResetting = !state;
        }

        function setError(error: FronvoError): void {
            errorMessage = error.err.msg;
        }

        function attemptReset(): void {
            // Little hack to recieve required field messages
            socket.emit('resetPassword', { email: email || '' }, ({ err }) => {
                if (err) {
                    setError({ err });
                    toggleUI(true);
                } else {
                    // Move on to verification
                    $accountResetPasswordVerifyTab = true;
                }
            });
        }

        toggleUI(false);

        attemptReset();
    }

    function loginTab(): void {
        if (isResetting) return;

        $accountRegisterTab = false;
        $accountResetPasswordTab = false;
    }
</script>

<AccountTemplate>
    <AccountHeader>Reset password</AccountHeader>

    <AccountHeaderError {errorMessage} />

    <AccountInput bind:value={email} maxLength={120}>Email</AccountInput>

    <AccountButton callback={reset}>Send reset email</AccountButton>

    <AccountRedirect callback={loginTab} marginTop={40}
        >Back to login</AccountRedirect
    >
</AccountTemplate>
