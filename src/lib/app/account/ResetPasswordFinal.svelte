<script lang="ts">
    import type { FronvoError } from 'interfaces/all';
    import {
        accountRegisterTab,
        accountResetPasswordFinalTab,
        accountResetPasswordTab,
        accountResetPasswordVerifyTab,
    } from 'stores/account';
    import { socket } from 'stores/main';
    import { onMount, onDestroy } from 'svelte';
    import AccountButton from '../reusables/index/AccountButton.svelte';
    import AccountHeader from '../reusables/index/AccountHeader.svelte';
    import AccountInput from '../reusables/index/AccountInput.svelte';
    import AccountTemplate from '../reusables/index/AccountTemplate.svelte';
    import ErrorHeader from '../reusables/all/ErrorHeader.svelte';

    let newPassword = '';
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
            socket.emit(
                'resetPasswordFinal',
                { newPassword: newPassword || '' },
                ({ err }) => {
                    if (err) {
                        setError({ err });
                        toggleUI(true);
                    } else {
                        // Complete action, redirect to login
                        $accountResetPasswordTab = false;
                        $accountResetPasswordVerifyTab = false;
                        $accountResetPasswordFinalTab = false;
                        $accountRegisterTab = false;
                    }
                }
            );
        }

        toggleUI(false);

        attemptReset();
    }
</script>

<AccountTemplate>
    <AccountHeader>Set new password</AccountHeader>

    <ErrorHeader {errorMessage} />

    <AccountInput bind:value={newPassword} maxLength={90} isPassword
        >New password</AccountInput
    >

    <AccountButton callback={reset}>Update password</AccountButton>
</AccountTemplate>
