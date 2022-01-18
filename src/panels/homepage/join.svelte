<script>
    import { scale, fade } from 'svelte/transition';
    import { sockt, hasToken } from '../../stores';
    import { send } from '../../utilities';

    let registerBtn, loginBtn, emailInput, passwordInput,
    emailText, passwordText;

    let defaultBorder = '#8c00ff', errorBorder = '#d80000', whiteColor = '#ffffff';

    let email, password, hasRetried = false, errorVisible = false;

    // this works
    setTimeout(() => setupUI());

    function setupUI() {
        registerBtn = document.getElementById('register-btn');
        loginBtn = document.getElementById('login-btn');
        emailInput = document.getElementById('email-input');
        passwordInput = document.getElementById('password-input')
        emailText = document.getElementById('email-text');
        passwordText = document.getElementById('password-text');
    }

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
        setTimeout(() => document.getElementById('top-error').textContent = errorText);
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
                $hasToken = true;
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

<div in:scale={{start: .95, duration: 1000}} class='homepage-panel homepage-join-panel'>
    <h1 class='header-section'>Join the Fronvo community</h1>

    {#if errorVisible}
        <h1 in:fade={{duration: 300}} id='top-error'>Error</h1>
    {/if}

    <h1 id='email-text'>Email</h1>
    <input id='email-input' bind:value={email}/>

    <h1 id='password-text'>Password</h1>
    <input id='password-input' bind:value={password} type='password'/>

    <div></div>

    <button id='register-btn' on:click={() => attemptAccountAction('login')}>Login</button>

    <button id='login-btn' on:click={() => attemptAccountAction('register')}>Register</button>
</div>
