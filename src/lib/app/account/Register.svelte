<script lang="ts">
    import type { FronvoError } from 'interfaces/all';
    import {
        accountRegisterTab,
        accountRegisterVerifyTab,
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
    let password = '';
    let errorMessage: string;

    let isRegistering = false;

    function keyListener(ev: KeyboardEvent): void {
        if (ev.key == 'Enter') {
            register();
        }

        if (ev.ctrlKey || ev.altKey) return;
    }

    onMount(() => {
        document.addEventListener('keydown', keyListener);
    });

    onDestroy(() => {
        document.removeEventListener('keydown', keyListener);
    });

    function register(): void {
        if (isRegistering) return;

        function toggleUI(state: boolean): void {
            isRegistering = !state;
        }

        function setError(error: FronvoError): void {
            errorMessage = error.err.msg;
        }

        function attemptRegister(): void {
            socket.emit(
                'register',
                { email: email || '', password: password || '' },
                ({ err }) => {
                    if (err) {
                        setError({ err });
                        toggleUI(true);
                    } else {
                        // Move on to verification
                        $accountRegisterVerifyTab = true;
                    }
                }
            );
        }

        toggleUI(false);

        attemptRegister();
    }

    function changeTab(): void {
        if (isRegistering) return;

        $accountRegisterTab = false;
    }
</script>

<AccountTemplate>
    <AccountHeader>Join the closed beta</AccountHeader>

    <AccountHeaderError {errorMessage} />

    <AccountInput bind:value={email} maxLength={120}>Email</AccountInput>

    <AccountInput bind:value={password} maxLength={90} isPassword
        >Password</AccountInput
    >

    <AccountButton callback={register}>Register</AccountButton>

    <AccountRedirect marginTop={40} callback={changeTab}
        >Already have an account?</AccountRedirect
    >
</AccountTemplate>
