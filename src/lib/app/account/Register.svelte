<script lang="ts">
    import Center from '$lib/app/Center.svelte';
    import type { FronvoError } from 'interfaces/socket/all';
    import {
        accountRegisterTab,
        accountRegisterVerifyTab,
    } from 'stores/app/account';
    import { socket } from 'stores/global';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    let email: string;
    let password: string;
    let emailInput: HTMLInputElement;
    let passwordInput: HTMLInputElement;
    let registerButton: HTMLButtonElement;
    let isRegistering = false;
    let isErrorVisible = false;
    let errorMessage: string;

    onMount(() => {
        emailInput = document.getElementById('email-input') as HTMLInputElement;
        passwordInput = document.getElementById(
            'password-input'
        ) as HTMLInputElement;
        registerButton = document.getElementById(
            'register-button'
        ) as HTMLButtonElement;
    });

    function register(): void {
        isRegistering = true;

        function toggleUI(state: boolean): void {
            emailInput.disabled = !state;
            passwordInput.disabled = !state;
            registerButton.disabled = !state;

            isRegistering = !state;
        }

        function setError(error: FronvoError): void {
            isErrorVisible = true;
            errorMessage = error.err.msg;
        }

        function attemptRegister(): void {
            // Little hack to recieve required field messages
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

<svelte:head>
    <title>Fronvo | Register</title>
</svelte:head>

<Center>
    <div class="account-container">
        <h1 id="header">Create an account</h1>

        {#if isErrorVisible}
            <h1 id="error-header" in:fade={{ duration: 500 }}>
                {errorMessage}
            </h1>
        {/if}

        <h1 id="input-header">Email</h1>
        <input id="email-input" bind:value={email} maxlength={60} />

        <h1 id="input-header">Password</h1>
        <input
            id="password-input"
            bind:value={password}
            type="password"
            maxlength={30}
        />

        <br />

        <button id="register-button" on:click={register}>Register</button>

        <h1 id="login-redirect" on:click={changeTab}>
            Already have an account?
        </h1>
    </div>
</Center>

<style>
    .account-container {
        border-radius: 10px;
        background: rgb(140, 0, 255);
        padding: 15px 30px 15px 30px;
        box-shadow: 0 0 5px black;
        text-align: center;
        width: 550px;
    }

    .account-container #header {
        color: white;
        text-align: center;
        font-size: 3rem;
        margin: 10px 10px 20px 10px;
    }

    .account-container #error-header {
        color: red;
        font-size: 2rem;
        margin: 0;
        width: 100%;
        word-wrap: break-word;
    }

    .account-container #input-header {
        color: white;
        margin: 0;
        font-size: 2.1rem;
        text-align: start;
    }

    .account-container input {
        font-size: 2rem;
        margin: 0 5px 10px 5px;
        width: 95%;
    }

    .account-container button {
        font-size: 2.5rem;
        margin-top: 20px;
        width: 90%;
    }

    .account-container #login-redirect {
        color: white;
        cursor: pointer;
        margin-top: 25px;
        margin-bottom: 0;
        transition: 250ms color;
        font-size: 2rem;
    }

    .account-container #login-redirect:hover {
        color: rgb(233, 206, 255);
    }

    @media screen and (max-width: 700px) {
        .account-container {
            width: 450px;
        }

        .account-container #header {
            font-size: 2.5rem;
        }

        .account-container #error-header {
            font-size: 1.7rem;
        }

        .account-container #input-header {
            font-size: 1.7rem;
        }

        .account-container input {
            font-size: 1.7rem;
        }

        .account-container button {
            font-size: 2.2rem;
        }

        .account-container #login-redirect {
            font-size: 1.7rem;
        }
    }

    @media screen and (max-width: 520px) {
        .account-container {
            width: 350px;
        }

        .account-container #header {
            font-size: 1.8rem;
        }

        .account-container #error-header {
            font-size: 1.4rem;
        }

        .account-container #input-header {
            font-size: 1.4rem;
        }

        .account-container input {
            font-size: 1.4rem;
        }

        .account-container button {
            font-size: 1.7rem;
        }

        .account-container #login-redirect {
            font-size: 1.4rem;
        }
    }
</style>
