<svelte:head>
    <title>Fronvo - Account</title>
</svelte:head>

<script context='module'>
    export const ssr = false;
</script>

<script>
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { sockt } from '../stores';
    import { timeoutRedirect, attemptType, isLoggedIn, animateFadeIn } from '../utilities';

    const socket = $sockt;

    socket.removeAllListeners();

    timeoutRedirect(socket);

    let main, topError, registerBtn,
    loginBtn, emailInput, passwordInput,
    emailText, passwordText;

    let defaultBorder = '#ae00ff', errorBorder = '#d80000', whiteColor = '#ffffff';

    let email, password, hasRetried = false;

    let isMount = true;

    function attemptRedirect() {
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');

        if(email && password) {
            goto('app');
        } else {
            setupUI();
        }
    }

    function setupUI() {
        main = document.getElementById('accountMain');
        topError = document.getElementById('topError');
        registerBtn = document.getElementById('registerBtn');
        loginBtn = document.getElementById('loginBtn');
        emailInput = document.getElementById('emailInput');
        passwordInput = document.getElementById('passwordInput')
        emailText = document.getElementById('emailText');
        passwordText = document.getElementById('passwordText');

        if(!isMount) animateFadeIn(main);

        main.style.display = 'initial';
    }

    socket.on('connect', () => {
        isMount = false;

        attemptRedirect();
    });

    onMount(() => {
        if(socket.connected) {
            attemptRedirect();
        }
    });

    socket.on('disconnect', () => {
        goto('/');
    });

    function attemptAccountAction(type) {
        if(!(type === 'register' || type === 'login')) return;

        registerBtn.disabled = true;
        loginBtn.disabled = true;
        emailInput.disabled = true;
        passwordInput.disabled = true;

        emailText.style.color = whiteColor;
        passwordText.style.color = whiteColor;
        emailInput.style.borderColor = defaultBorder;
        passwordInput.style.borderColor = defaultBorder;

        attemptType(socket, type, email, password).then(() => {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);

            goto('app');
        }).catch((err) => {
            // delay sequential attempts
            let funcTimeout = hasRetried ? 300 : 0;

            // show error msg
            topError.style.display = 'initial';

            topError.textContent = err.msg;

            setTimeout(() => {
                if(err.extras) {
                    if(err.extras.for === 'email') {
                        emailInput.style.borderColor = errorBorder;
                    } else if(err.extras.for === 'password') {
                        passwordInput.style.borderColor = errorBorder;
                    }
                }

                registerBtn.disabled = false;
                loginBtn.disabled = false;
                emailInput.disabled = false;
                passwordInput.disabled = false;
            }, funcTimeout);

            if(!hasRetried) hasRetried = true;
        });
    }
</script>

<div transition:fade={{delay: 200}} id='accountMain' class='center' style='display: none;'>
    <h1 id='topError' style='color: red; display: none;'>Error</h1>

    <h1 id='emailText' style='margin-bottom: 0;'>Email</h1>
    <input id="emailInput" bind:value="{email}"/>

    <div></div>

    <h1 id='passwordText' style='margin-bottom: 0;'>Password</h1>
    <input style='margin-bottom: 50px;' id="passwordInput" bind:value="{password}" type="password"/>

    <div></div>

    <div style='margin-bottom: 20px;'>
        <button id='registerBtn' style='margin-right: 25px;' class='glow' on:click="{() => attemptAccountAction('login')}">Login</button>

        <button id='loginBtn' style='margin-left: 25px;' class='glow' on:click="{() => attemptAccountAction('register')}">Register</button>
    </div>
</div>
