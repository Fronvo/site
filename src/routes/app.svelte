<svelte:head>
    <title>Fronvo</title>
</svelte:head>

<script context='module'>
    export const ssr = false;
</script>

<script>
    import { fade } from 'svelte/transition';
    import { connectionTimeout, sockt } from '../stores';
    import { animateFadeIn, animateFadeOut, isLoggedIn, send } from '../utilities';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation'

    let main, preLogin, preLoginError, statusText, postLogin;

    onMount(() => {
        setupUI();
    });

    function setupUI() {
        main = document.getElementById('appMain')
        preLogin = document.getElementById('appPreLogin');
        preLoginError = document.getElementById('appPreLoginError');
        statusText = document.getElementById('appStatusText');
        postLogin = document.getElementById('appPostLogin');

        attemptSocketInit();
    }

    function attemptSocketInit() {
        animateFadeIn(main, () => {
            setTimeout(() => {
                if(!$sockt) postConnectionTimeout();
            }, connectionTimeout);

            function attemptSocketLogin() {
                isLoggedIn()
                .then(() => postLoginSetup())
                .catch(() => {
                    statusText.textContent = 'Logging in...';

                    setTimeout(() => {
                        const token = localStorage.getItem('token');

                        if(token) {
                            send('loginToken', {
                                token: token
                            }, (err) => {
                                if(!err) postLoginSetup();
                                else {
                                    localStorage.removeItem('token');
                                    goto('/account');
                                }
                            });
                        } else goto('account');
                    }, 500);
                });
            }

            if(!sockt) {
                sockt.subscribe((socket) => {
                    if(!socket) return;

                    attemptSocketLogin();
                });
            } else attemptSocketLogin();
        });
    }

    function postLoginSetup() {
        animateFadeOut(preLogin, () => {
            animateFadeIn(postLogin)
        });
    }

    function postConnectionTimeout() {
        animateFadeOut(preLogin, () => {
            animateFadeIn(preLoginError);
        });
    }

    function attemptSocketReinit() {
        animateFadeOut(preLoginError, () => {
            // animated by main
            preLogin.style.display = 'block';

            attemptSocketInit();
        });
    }
</script>

<div id='appMain' transition:fade class='center' style='display: none;'>
    <div id='appPreLogin'>
        <h1 id='appStatusText'>Connecting to Fronvo...</h1>
    </div>

    <div id='appPreLoginError' style='display: none;'>
        <h1>Failed to connect to Fronvo.</h1>
        <button on:click={() => attemptSocketReinit()}>Retry</button>
    </div>

    <div id='appPostLogin' style='display: none;'>
        <h1>Congrats, you logged in!</h1>
        <h1>Now what?</h1>
        <button><a style='color: white' href='https://github.com/fronvo/fronvo-site'>Visit the repository</a></button>
    </div>
</div>
