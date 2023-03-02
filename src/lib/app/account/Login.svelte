<script lang="ts">
    import type { FronvoError } from 'interfaces/all';
    import {
        accountRegisterTab,
        accountResetPasswordTab,
    } from 'stores/account';
    import { homePosts } from 'stores/home';
    import { cachedAccountData, socket } from 'stores/main';
    import { pendingSearchId } from 'stores/profile';
    import { onMount, onDestroy } from 'svelte';
    import { setKey } from 'utilities/global';
    import { dismissModal, performLogin } from 'utilities/main';
    import AccountInput from '$lib/app/reusables/index/AccountInput.svelte';
    import AccountHeader from '../reusables/index/AccountHeader.svelte';
    import AccountHeaderError from '../reusables/index/AccountHeaderError.svelte';
    import AccountRedirect from '../reusables/index/AccountRedirect.svelte';
    import AccountButton from '../reusables/index/AccountButton.svelte';
    import AccountTemplate from '../reusables/index/AccountTemplate.svelte';

    let email = '';
    let password = '';
    let errorMessage: string;

    let isLoggingIn = false;

    function keyListener(ev: KeyboardEvent): void {
        if (ev.ctrlKey || ev.altKey) return;

        if (ev.key == 'Enter') {
            login();
        }
    }

    onMount(() => {
        document.addEventListener('keydown', keyListener);
    });

    onDestroy(() => {
        document.removeEventListener('keydown', keyListener);
    });

    function login(): void {
        if (isLoggingIn) return;

        function toggleUI(state: boolean): void {
            isLoggingIn = !state;
        }

        function setError(error: FronvoError): void {
            errorMessage = error.err.msg;
        }

        function attemptLogin(): void {
            socket.emit(
                'login',
                { email: email || '', password: password || '' },
                async ({ err, token }) => {
                    if (err) {
                        setError({ err });
                        toggleUI(true);
                    } else {
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

        toggleUI(false);

        attemptLogin();
    }

    function changeTab(): void {
        if (isLoggingIn) return;

        $accountRegisterTab = true;
    }

    function resetPasswordTab(): void {
        $accountResetPasswordTab = true;
    }
</script>

<AccountTemplate>
    <AccountHeader>Login to account</AccountHeader>

    <AccountHeaderError {errorMessage} />

    <AccountInput bind:value={email} maxLength={120}>Email</AccountInput>

    <AccountInput bind:value={password} maxLength={90} isPassword
        >Password</AccountInput
    >

    <AccountRedirect
        callback={resetPasswordTab}
        start
        marginTop={0}
        marginBottom={10}>Reset password</AccountRedirect
    >

    <AccountButton callback={login}>Login</AccountButton>

    <AccountRedirect marginTop={40} callback={changeTab}
        >New to Fronvo?</AccountRedirect
    >
</AccountTemplate>
