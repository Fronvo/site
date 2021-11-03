<svelte:head>
    <title>Fronvo</title>
</svelte:head>

<script context='module'>
    export const ssr = false;
</script>

<script>
    import { fade } from 'svelte/transition';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { sockt } from '../stores';
    import { timeoutRedirect, isLoggedIn, animateFadeIn } from '../utilities';

    const socket = $sockt;

    timeoutRedirect(socket);

    socket.removeAllListeners();

    let main;

    let isMount = true;

    function attemptRedirect() {
        isLoggedIn(socket)
        .then(() => setupUI())
        .catch(() => {
            socket.emit('loginToken', {token: localStorage.getItem('token')}, (err) => {
                if(err) { localStorage.removeItem('token'); goto('account'); }
                else setupUI();
            });
        });
    }

    function setupUI() {
        main = document.getElementById('appMain');

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
</script>

<div id='appMain' in:fade={{delay: 200}} class='center' style='display: none;'>
    <h1>Congrats, you logged in!</h1>
    <h1>Now what?</h1>
    <button><a style='color: white' href='https://github.com/fronvo/fronvo-site'>Visit the repository</a></button>
</div>
