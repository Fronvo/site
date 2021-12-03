<svelte:head>
    <title>Fronvo</title>
</svelte:head>

<script context='module'>
    export const ssr = false;
</script>

<script>
    import { fade } from 'svelte/transition';
    import { sockt, connectionTimeoutDuration } from '../stores';
    import { animateFadeIn, isLoggedIn, send } from '../utilities';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation'

    let postLogin, connectionError;

    onMount(() => {
        setupUI();
    });

    function setupUI() {
        connectionError = document.getElementById('appConnectionError');
        postLogin = document.getElementById('appPostLogin');

        attemptFronvoConnection();
    }

    function attemptFronvoConnection() {
        setTimeout(() => {
            if(!$sockt) animateFadeIn(connectionError);
        }, connectionTimeoutDuration)

        function attemptSocketLogin() {
            isLoggedIn()
            .then(() => animateFadeIn(postLogin))
            .catch(() => {
                const token = localStorage.getItem('token');

                if(token) {
                    send('loginToken', {
                        token: token
                    }, (err) => {
                        if(!err) {
                            animateFadeIn(postLogin);
                        } else {
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
    }
</script>

<div id='appMain' transition:fade class='center'>
    <div id='appConnectionError' style='display: none'>
        <h1 style='color: red;'>Error connecting to Fronvo.</h1>
    </div>

    <div id='appPostLogin' style='display: none;'>
        <h1>Fronvo is still in the works...</h1>
        <h1><a href='https://github.com/fronvo'>View the source?</a></h1>
    </div>
</div>
