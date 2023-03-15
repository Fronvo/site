<script lang="ts">
    import type { FronvoError } from 'interfaces/all';
    import { cachedAccountData, socket } from 'stores/main';
    import SvelteSegmentedInput from 'svelte-segmented-input';
    import AccountTemplate from '../reusables/index/AccountTemplate.svelte';
    import AccountButton from '../reusables/index/AccountButton.svelte';
    import AccountHeader from '../reusables/index/AccountHeader.svelte';
    import { setKey } from 'utilities/global';
    import { homePosts } from 'stores/home';
    import { dismissModal, performLogin } from 'utilities/main';
    import { pendingSearchId } from 'stores/profile';
    import AccountInfo from '../reusables/index/AccountInfo.svelte';
    import {
        accountRegisterTab,
        accountRegisterVerifyTab,
    } from 'stores/account';
    import ErrorHeader from '../reusables/all/ErrorHeader.svelte';

    let code: string;
    let errorMessage: string;

    function verify(): void {
        function setError(error: FronvoError): void {
            errorMessage = error.err.msg;
        }

        function attemptVerify(): void {
            socket.emit(
                'registerVerify',
                { code: code || '' },
                async ({ err, token }) => {
                    if (err) {
                        setError({ err });
                    } else {
                        // Reset tabs
                        $accountRegisterVerifyTab = false;
                        $accountRegisterTab = false;

                        setKey('token', token);
                        $homePosts = undefined;

                        await performLogin(
                            $pendingSearchId,
                            $cachedAccountData
                        );

                        dismissModal();
                    }
                }
            );
        }

        attemptVerify();
    }
</script>

<AccountTemplate>
    <AccountHeader>Register Verification</AccountHeader>

    <AccountInfo
        >A 6-digit verification code has been sent to your email</AccountInfo
    >

    <ErrorHeader {errorMessage} />

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
