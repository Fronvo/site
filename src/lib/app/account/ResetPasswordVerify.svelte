<script lang="ts">
    import type { FronvoError } from 'interfaces/all';
    import { accountResetPasswordFinalTab } from 'stores/account';
    import { socket } from 'stores/main';
    import AccountButton from '../reusables/index/AccountButton.svelte';
    import AccountCode from '../reusables/index/AccountCode.svelte';
    import AccountHeader from '../reusables/index/AccountHeader.svelte';
    import AccountHeaderError from '../reusables/index/AccountHeaderError.svelte';
    import AccountInfo from '../reusables/index/AccountInfo.svelte';
    import AccountTemplate from '../reusables/index/AccountTemplate.svelte';

    let code: string;
    let errorMessage: string;

    function reset(): void {
        function setError(error: FronvoError): void {
            errorMessage = error.err.msg;
        }

        function attemptReset(): void {
            // Little hack to recieve required field messages
            socket.emit(
                'resetPasswordVerify',
                { code: code || '' },
                ({ err }) => {
                    if (err) {
                        setError({ err });
                    } else {
                        // Move on to verification
                        $accountResetPasswordFinalTab = true;
                    }
                }
            );
        }

        attemptReset();
    }
</script>

<AccountTemplate>
    <AccountHeader>Reset verification</AccountHeader>

    <AccountInfo
        >A 6-digit verification code has been sent to your email</AccountInfo
    >

    <AccountHeaderError {errorMessage} />

    <AccountCode bind:value={code} valueEntered={reset} />

    <AccountButton callback={reset}>Reset password</AccountButton>
</AccountTemplate>
