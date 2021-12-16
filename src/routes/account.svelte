<svelte:head>
    <title>Fronvo - Account</title>
</svelte:head>

<script context='module'>
	export const prerender = true;
	export const ssr = false;
</script>

<script>
    import { scale, fade } from 'svelte/transition';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { sockt } from '../stores';
    import { send } from '../utilities';

    let registerBtn, loginBtn, emailInput, passwordInput,
    emailText, passwordText;

    let defaultBorder = '#ea00ff', errorBorder = '#d80000', whiteColor = '#ffffff';

    let email, password, hasRetried = false, mountReady = false, errorVisible = false;

    function setupUI() {
        registerBtn = document.getElementById('registerBtn');
        loginBtn = document.getElementById('loginBtn');
        emailInput = document.getElementById('emailInput');
        passwordInput = document.getElementById('passwordInput')
        emailText = document.getElementById('emailText');
        passwordText = document.getElementById('passwordText');

        console.log('setupui', registerBtn)
    }

    onMount(() => {
        if(localStorage.getItem('token')) goto('/', true);
        else {
            mountReady = true;

            // why wont it work on its own??
            setTimeout(() => setupUI());
        }
    });

    function disableUI() {
        registerBtn.disabled = true;
        loginBtn.disabled = true;
        emailInput.disabled = true;
        passwordInput.disabled = true;

        emailText.style.color = whiteColor;
        passwordText.style.color = whiteColor;
        emailInput.style.borderColor = defaultBorder;
        passwordInput.style.borderColor = defaultBorder;
    }

    function enableUI() {
        registerBtn.disabled = false;
        loginBtn.disabled = false;
        emailInput.disabled = false;
        passwordInput.disabled = false;
    }

    function setError(errorText) {
        if(!errorVisible) errorVisible = true;
        setTimeout(() => document.getElementById('topError').textContent = errorText);
    }

    function attemptAccountAction(type) {
        if(!(type === 'register' || type === 'login')) return;

        if(!$sockt) {
            setError('Server is unreachable.');
            return;

        } else if(!email || !password) {
            disableUI();

            setError(!email ? 'The email is required.' : 'The password is required.');
            
            !email ? emailInput.style.borderColor = errorBorder: passwordInput.style.borderColor = errorBorder;
            
            enableUI();

            return;
        }

        disableUI();

        send(type, {
            email: email,
            password: password
        }, (err, token) => {
            if(token) {
                localStorage.setItem('token', token);
                goto('app', true);
                return;
            }

            if(errorVisible)
                setError(err.msg);
            
            // delay sequential attempts
            let funcTimeout = hasRetried ? 300 : 0;

            setTimeout(() => {
                if(err.extras) {
                    if(err.extras.for === 'email') {
                        emailInput.style.borderColor = errorBorder;
                    } else if(err.extras.for === 'password') {
                        passwordInput.style.borderColor = errorBorder;
                    }
                }

                setError(err.msg);

                enableUI();
            }, funcTimeout);

            if(!hasRetried) hasRetried = true;
        });
    }

</script>

{#if mountReady}
    <div in:scale={{start: .9, delay: 150, duration: 500}} out:scale={{start: .95, duration: 500}} class='center'>

        {#if errorVisible}
            <h1 in:fade={{duration: 300}} id='topError' style='color: red;'>Error</h1>
        {/if}

        <h1 id='emailText' style='margin-bottom: 0;'>Email</h1>
        <input id='emailInput' bind:value={email}/>

        <div></div>

        <h1 id='passwordText' style='margin-bottom: 0;'>Password</h1>
        <input style='margin-bottom: 50px;' id='passwordInput' bind:value={password} type='password'/>

        <div></div>

        <div style='margin-bottom: 20px;'>
            <button id='registerBtn' style='margin-right: 25px;' on:click={() => attemptAccountAction('login')}>Login</button>

            <button id='loginBtn' style='margin-left: 25px;' on:click={() => attemptAccountAction('register')}>Register</button>
        </div>
    </div>
{/if}
