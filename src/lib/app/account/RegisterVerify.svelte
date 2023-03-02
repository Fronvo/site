<script lang="ts">
    import type { FronvoError } from 'interfaces/all';
    import { socket } from 'stores/main';
    import SvelteSegmentedInput from 'svelte-segmented-input';
    import { accountRegisterFinalTab } from 'stores/account';
    import AccountTemplate from '../reusables/index/AccountTemplate.svelte';
    import AccountButton from '../reusables/index/AccountButton.svelte';
    import AccountHeader from '../reusables/index/AccountHeader.svelte';
    import AccountHeaderError from '../reusables/index/AccountHeaderError.svelte';

    let code: string;
    let errorMessage: string;

    function verify(): void {
        function setError(error: FronvoError): void {
            errorMessage = error.err.msg;
        }

        function attemptVerify(): void {
            socket.emit('registerVerify', { code: code || '' }, ({ err }) => {
                if (err) {
                    setError({ err });
                } else {
                    $accountRegisterFinalTab = true;
                }
            });
        }

        attemptVerify();
    }
</script>

<AccountTemplate>
    <AccountHeader>Register Verification</AccountHeader>

    <AccountHeader
        >A 6-digit verification code has been sent to your email</AccountHeader
    >

    <AccountHeaderError {errorMessage} />

    <SvelteSegmentedInput
        bind:value={code}
        on:valueEntered={verify}
        length={6}
        style={{
            fontSize: '2rem',
            borderRadius: '10px',
            borderWidth: '2px',
            borderColorActive: 'rgb(255, 255, 255)',
            textColor: 'white',
            inputWidth: '100%',
            padding: '10px 10px 10px 10px',
        }}
    />

    <AccountButton callback={verify}>Verify</AccountButton>
</AccountTemplate>
