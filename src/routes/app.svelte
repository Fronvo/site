<svelte:head>
    <title>Fronvo</title>
</svelte:head>

<script context='module'>
    export const ssr = false;
</script>

<script>
    import { fade } from 'svelte/transition';
    import { sockt } from '../stores';
    import { animateFadeIn, animateFadeOut, isLoggedIn, send } from '../utilities';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation'

    let main, preLogin, postLogin;

    onMount(() => {
        setupUI();
    });

    function setupUI() {
        main = document.getElementById('appMain')
        preLogin = document.getElementById('appPreLogin');
        postLogin = document.getElementById('appPostLogin');

        attemptFronvoConnection();
    }

    function attemptFronvoConnection() {
        preLogin.style.display = 'block';
        
        animateFadeIn(main, () => {
            function attemptSocketLogin() {
                isLoggedIn()
                .then(() => postLoginSetup())
                .catch(() => {
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
                });
            }

            if(!$sockt) {
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
</script>

<div id='appMain' transition:fade class='center' style='display: none;'>
    <div id='appPreLogin'>
        <h1 id='appStatusText'>Connecting to Fronvo...</h1>
    </div>

    <div id='appPostLogin' style='display: none;'>
        <h1>Congrats, you logged in!</h1>
        <h1>Now what?</h1>
        <button><a style='color: white' href='https://github.com/fronvo/fronvo-site'>Visit the repository</a></button>
    </div>
</div>
