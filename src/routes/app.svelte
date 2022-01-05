<svelte:head>
    <title>Fronvo</title>
</svelte:head>

<script context='module'>
    export const ssr = false;
</script>

<script>
    import { scale, fly } from 'svelte/transition';
    import { sockt, connectionTimeoutDuration } from '../stores';
    import { isLoggedIn, send } from '../utilities';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { Shadow } from 'svelte-loading-spinners';

    let mountReady = false, connSuccessful = false, connTimedOut = false;
    let activeItemId = sessionStorage.getItem('lastActiveItemId') || 0;

    onMount(() => {
        mountReady = true;
        attemptFronvoConnection();
    });

    function attemptFronvoConnection() {
        setTimeout(() => {
            if (!$sockt) connTimedOut = true;
        }, connectionTimeoutDuration);

        function attemptSocketLogin() {
            if(connTimedOut) return;

            isLoggedIn()
            .then(() => postLogin())
            .catch(() => {
                const token = localStorage.getItem('token');

                if(token) {
                    send('loginToken', {
                        token: token
                    }, (err) => {
                            if (!err) postLogin(); 
                            else {
                                localStorage.removeItem('token');
                                goto('account', true);
                            }
                        }
                    );
                } else goto('account', true);
            });
        }

        function postLogin() {
            connTimedOut = false;
            connSuccessful = true;

            $sockt.on('disconnect', () => {
                connSuccessful = false;

                attemptFronvoConnection();
            });
        }

        if (!$sockt) {
            sockt.subscribe((socket) => {
                if (!socket) return;

                attemptSocketLogin();
            });
        } else attemptSocketLogin();
    }

    function retryFronvoConnection() {
        connTimedOut = false;
        connSuccessful = false;

        attemptFronvoConnection();
    }

    function setActiveItem(newItemId) {
        if (activeItemId == newItemId) return;

        sessionStorage.setItem('lastActiveItemId', newItemId);

        activeItemId = newItemId;
    }

</script>

{#if mountReady && !connTimedOut && !connSuccessful}
    <div out:scale={{start: .8, duration: 500}} class='center'>
        <Shadow color='#e700fc' duration='1.2s' />
    </div>
{/if}

{#if connTimedOut}
    <div transition:scale={{start: .9, duration: 500}} class='center'>
        <h1 style='color: red;'>Error connecting to Fronvo.</h1>
        <button on:click={() => retryFronvoConnection()}>Retry</button>
    </div>
{/if}

{#if connSuccessful}
    <div class='full'>
        
        <!-- Top Div -->
        <div transition:fly={{y: -50,  duration: 500}} class='fronvo-top-panel'>

            <!-- Mobile-only menu -->
            <svg id='menu' version='1.2' baseProfile='tiny-ps' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 44 44' width='44' height='44'>
                <defs>
                    <linearGradient id='grd0' gradientUnits='userSpaceOnUse'  x1='18.9' y1='.3' x2='25.6' y2='9.9'>
                        <stop offset='0' stop-color='#c036d4'  />
                        <stop offset='1' stop-color='#fb00ff'  />
                    </linearGradient>
                    <linearGradient id='grd1' gradientUnits='userSpaceOnUse'  x1='31.5' y1='19.6' x2='13' y2='25.3'>
                        <stop offset='0' stop-color='#c036d4'  />
                        <stop offset='1' stop-color='#fb00ff'  />
                    </linearGradient>
                    <linearGradient id='grd2' gradientUnits='userSpaceOnUse'  x1='25.8' y1='44.7' x2='18' y2='35.1'>
                        <stop offset='0' stop-color='#c036d4'  />
                        <stop offset='1' stop-color='#fb00ff'  />
                    </linearGradient>
                </defs>
                <style>
                    tspan { white-space:pre }
                    .shp0 { fill: url(#grd0);stroke: #ffffff;stroke-width: 0 } 
                    .shp1 { fill: url(#grd1);stroke: #ffffff;stroke-width: 0 } 
                    .shp2 { fill: url(#grd2);stroke: #ffffff;stroke-width: 0 } 
                </style>
                <path class='shp0' d='m6.36 9.89v-9.63h31.76v9.63h-31.76z' />
                <path class='shp1' d='m13.19 27.51l-0.24-9.62l18.33-0.46l0.24 9.62l-18.33 0.46z' />
                <path class='shp2' d='m7.34 44.69v-9.63h29.1v9.63h-29.1z' />
            </svg>

            <h1 id='logo-title'>Fronvo</h1>
        </div>

        <!-- Chat -->
        {#if activeItemId == 0}

            <div transition:scale={{start: 0.98, duration: 500}} class='fronvo-panel'>
                <div class='panel-top'>
                    <svg version='1.2' baseProfile='tiny-ps' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' width='48' height='48'>
                        <defs>
                            <linearGradient id='grd3' gradientUnits='userSpaceOnUse'  x1='15.6' y1='34.8' x2='30.8' y2='18'>
                                <stop offset='0' stop-color='#c036d4'  />
                                <stop offset='1' stop-color='#fb00ff'  />
                            </linearGradient>
                        </defs>
                        <style>
                            tspan { white-space:pre }
                            .shp3 { fill: url(#grd3);stroke: #ffffff;stroke-width: 0 } 
                        </style>
                        <path class='shp3' d='m33.33 9.24c1.4 2.23 2.1 4.67 2.1 7.3c0 2.63-0.7 5.06-2.1 7.3c-1.4 2.23-3.31 4-5.73 5.3c-2.42 1.3-5.05 1.95-7.89 1.95c-1.28 0-2.59-0.15-3.93-0.45c-1.85 1.67-3.91 2.88-6.21 3.63c-0.54 0.17-1.18 0.32-1.92 0.45h-0.07c-0.16 0-0.32-0.08-0.46-0.23c-0.14-0.15-0.23-0.35-0.26-0.6c-0.02-0.06-0.02-0.12-0.02-0.18c0-0.07 0-0.13 0.01-0.18c0.01-0.06 0.02-0.11 0.04-0.17c0.02-0.06 0.04-0.1 0.06-0.14c0.01-0.04 0.04-0.09 0.08-0.16c0.04-0.07 0.07-0.11 0.09-0.14c0.02-0.03 0.06-0.08 0.1-0.14c0.04-0.07 0.07-0.11 0.09-0.13c0.07-0.11 0.25-0.35 0.51-0.71c0.27-0.36 0.46-0.64 0.58-0.84c0.12-0.2 0.29-0.47 0.5-0.82c0.22-0.35 0.4-0.71 0.56-1.09c0.16-0.38 0.31-0.8 0.46-1.25c-1.85-1.36-3.3-3.04-4.35-5.03c-1.06-1.99-1.58-4.11-1.58-6.36c0-2.63 0.7-5.06 2.1-7.3c1.4-2.23 3.31-4 5.73-5.3c2.42-1.3 5.05-1.95 7.89-1.95c2.84 0 5.47 0.65 7.89 1.95c2.42 1.3 4.33 3.06 5.73 5.3zm9 8.04c-1.12-2.03-2.63-3.71-4.55-5.05c0.34 1.42 0.51 2.86 0.51 4.32c0 2.54-0.5 4.94-1.5 7.21c-1 2.27-2.43 4.28-4.29 6.02c-1.73 1.59-3.69 2.81-5.89 3.66c-2.2 0.85-4.5 1.28-6.9 1.28c-0.45 0-1.1-0.04-1.96-0.11c2.99 2.5 6.5 3.75 10.54 3.75c1.28 0 2.59-0.15 3.93-0.45c1.85 1.67 3.91 2.88 6.21 3.63c0.54 0.17 1.18 0.32 1.92 0.45c0.18 0.02 0.34-0.05 0.49-0.2c0.15-0.15 0.25-0.36 0.29-0.62c0.01-0.06 0.02-0.12 0.02-0.18c0-0.07 0-0.13-0.01-0.18c-0.01-0.06-0.02-0.11-0.04-0.17c-0.02-0.06-0.04-0.1-0.06-0.14c-0.02-0.04-0.04-0.09-0.08-0.16c-0.04-0.07-0.07-0.11-0.09-0.14c-0.02-0.03-0.06-0.08-0.1-0.14c-0.04-0.07-0.07-0.11-0.09-0.13c-0.07-0.11-0.25-0.35-0.51-0.71c-0.27-0.36-0.46-0.64-0.58-0.84c-0.12-0.2-0.29-0.47-0.5-0.82c-0.22-0.35-0.4-0.71-0.56-1.09c-0.16-0.38-0.31-0.8-0.46-1.25c1.85-1.36 3.3-3.03 4.35-5.01c1.06-1.98 1.58-4.1 1.58-6.37c0-2.33-0.56-4.51-1.67-6.53z' />
                    </svg>

                    <h1 id='title'>Chat</h1>
                </div>
            </div>
        
        {/if}

        <!-- Posts -->
        {#if activeItemId == 1}

            <div transition:scale={{start: 0.98, duration: 500}} class='fronvo-panel'>
                <div class='panel-top'>
                    <svg version="1.2" baseProfile="tiny-ps" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
                        <defs>
                            <linearGradient id="grd10" gradientUnits="userSpaceOnUse"  x1="5.3" y1="22.9" x2="44.3" y2="23.6">
                                <stop offset="0" stop-color="#bf00eb"  />
                                <stop offset="1" stop-color="#ff00dd"  />
                            </linearGradient>
                        </defs>
                        <style>
                            tspan { white-space:pre }
                            .shp10 { fill: url(#grd10) } 
                        </style>
                        <path class="shp10" d="m41.64 11.83c1.74 2.49 2.61 5.21 2.61 8.16c0 2.94-0.87 5.66-2.61 8.16c-1.74 2.49-4.11 4.46-7.09 5.91c-2.99 1.45-6.25 2.17-9.79 2.17c-1.02 0-2.07-0.07-3.16-0.2c-2.87 2.96-6.21 5.01-10.01 6.14c-0.71 0.24-1.54 0.42-2.48 0.56c-0.25 0.03-0.47-0.04-0.66-0.23c-0.2-0.19-0.32-0.43-0.38-0.74v-0.03c-0.04-0.07-0.05-0.17-0.01-0.3c0.04-0.14 0.05-0.22 0.04-0.25c-0.01-0.03 0.03-0.11 0.1-0.24c0.07-0.13 0.12-0.2 0.13-0.23c0.01-0.03 0.07-0.1 0.15-0.22c0.09-0.12 0.14-0.19 0.17-0.23c0.1-0.14 0.33-0.43 0.67-0.88c0.35-0.45 0.6-0.77 0.75-0.96c0.15-0.19 0.38-0.53 0.67-1c0.3-0.47 0.53-0.9 0.71-1.29c0.17-0.39 0.37-0.89 0.59-1.5c0.22-0.61 0.41-1.25 0.57-1.93c-2.28-1.51-4.07-3.37-5.39-5.58c-1.31-2.22-1.97-4.59-1.97-7.13c0-2.2 0.51-4.3 1.55-6.3c1.03-2 2.42-3.73 4.16-5.19c1.74-1.45 3.82-2.61 6.22-3.46c2.41-0.85 4.93-1.28 7.57-1.28c3.54 0 6.8 0.72 9.79 2.17c2.99 1.45 5.35 3.42 7.09 5.91z" />
                    </svg>

                    <h1 id='title'>Posts</h1>
                </div>
            </div>

        {/if}

        <!-- Friends -->
        {#if activeItemId == 2}

            <div transition:scale={{start: 0.98, duration: 500}} class='fronvo-panel'>
                <div class='panel-top'>
                    <svg version='1.2' baseProfile='tiny-ps' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' width='48' height='48'>
                        <defs>
                            <linearGradient id='grd4' gradientUnits='userSpaceOnUse'  x1='2' y1='45.5' x2='47' y2='3.5'>
                                <stop offset='0' stop-color='#ac08dd'  />
                                <stop offset='0' stop-color='#bf00eb'  />
                                <stop offset='1' stop-color='#ff00dd'  />
                            </linearGradient>
                        </defs>
                        <style>
                            tspan { white-space:pre }
                            .shp4 { fill: url(#grd4);stroke: #ffffff;stroke-width: 0 } 
                        </style>
                        <path class='shp4' d='m47 39.41c0 2.34-0.78 4.19-2.33 5.55c-1.56 1.36-3.62 2.04-6.2 2.04h-27.93c-2.58 0-4.65-0.68-6.2-2.04c-1.56-1.36-2.33-3.21-2.33-5.55c0-1.04 0.04-2.05 0.11-3.03c0.07-0.99 0.22-2.05 0.45-3.19c0.22-1.14 0.51-2.2 0.85-3.18c0.34-0.98 0.8-1.93 1.37-2.86c0.58-0.93 1.24-1.72 1.98-2.37c0.75-0.65 1.66-1.18 2.73-1.57c1.08-0.39 2.26-0.59 3.56-0.59c0.19 0 0.64 0.21 1.34 0.63c0.7 0.42 1.5 0.89 2.38 1.41c0.88 0.52 2.03 0.99 3.45 1.41c1.42 0.42 2.84 0.63 4.27 0.63c1.43 0 2.85-0.21 4.27-0.63c1.42-0.42 2.57-0.89 3.45-1.41c0.88-0.52 1.68-0.99 2.38-1.41c0.7-0.42 1.15-0.63 1.34-0.63c1.3 0 2.49 0.2 3.56 0.59c1.08 0.39 1.99 0.91 2.73 1.57c0.75 0.65 1.41 1.45 1.98 2.37c0.58 0.93 1.03 1.88 1.37 2.86c0.34 0.98 0.62 2.04 0.85 3.18c0.22 1.14 0.37 2.21 0.45 3.19c0.07 0.99 0.11 2 0.11 3.03zm-22.5-37.41c-3.39 0-6.28 1.1-8.68 3.3c-2.4 2.2-3.6 4.85-3.6 7.95c0 3.11 1.2 5.76 3.6 7.95c2.4 2.2 5.29 3.3 8.68 3.3c3.39 0 6.28-1.1 8.68-3.3c2.4-2.2 3.6-4.85 3.6-7.95c0-3.11-1.2-5.76-3.6-7.95c-2.4-2.2-5.29-3.3-8.68-3.3z' />
                    </svg>

                    <h1 id='title'>Friends</h1>
                </div>
            </div>

        {/if}

        <!-- Bottom Bar -->
        <div transition:fly={{y: 100, duration: 500}} class='footer bottom-bar'>

            <!-- Chat -->
            <div id='bottom-item-chat' on:click={() => setActiveItem(0)}>
                <svg version='1.2' baseProfile='tiny-ps' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 54 54' width='54' height='54'>
                    <defs>
                        <linearGradient id='grd5' gradientUnits='userSpaceOnUse'  x1='17.6' y1='39.1' x2='34.6' y2='20.2'>
                            <stop offset='0' stop-color='#c036d4'  />
                            <stop offset='1' stop-color='#fb00ff'  />
                        </linearGradient>
                    </defs>
                    <style>
                        tspan { white-space:pre }
                        .shp5 { fill: url(#grd5);stroke: #ffffff;stroke-width: 0 } 
                    </style>
                    <path class='shp5' d='m37.5 10.4c1.57 2.51 2.36 5.25 2.36 8.21c0 2.96-0.79 5.7-2.36 8.21c-1.57 2.51-3.72 4.5-6.44 5.96c-2.72 1.46-5.68 2.19-8.88 2.19c-1.44 0-2.91-0.17-4.42-0.51c-2.08 1.87-4.4 3.24-6.98 4.09c-0.6 0.19-1.32 0.36-2.16 0.51h-0.08c-0.18 0-0.36-0.08-0.51-0.26c-0.16-0.17-0.26-0.39-0.29-0.67c-0.02-0.06-0.03-0.13-0.03-0.21c0-0.07 0-0.14 0.01-0.21c0.01-0.06 0.03-0.13 0.05-0.19c0.03-0.06 0.05-0.12 0.06-0.16c0.02-0.04 0.05-0.1 0.09-0.18c0.04-0.07 0.08-0.13 0.1-0.16c0.03-0.03 0.06-0.08 0.11-0.16c0.05-0.07 0.08-0.12 0.1-0.14c0.08-0.13 0.28-0.39 0.58-0.8c0.3-0.4 0.52-0.72 0.65-0.94c0.13-0.22 0.32-0.53 0.57-0.93c0.24-0.39 0.45-0.8 0.63-1.23c0.18-0.43 0.35-0.89 0.51-1.41c-2.08-1.53-3.71-3.42-4.9-5.65c-1.19-2.24-1.78-4.62-1.78-7.16c0-2.96 0.79-5.7 2.36-8.21c1.57-2.51 3.72-4.5 6.44-5.96c2.72-1.46 5.68-2.19 8.88-2.19c3.2 0 6.16 0.73 8.88 2.19c2.72 1.46 4.87 3.45 6.44 5.96zm10.12 9.04c-1.26-2.28-2.96-4.17-5.12-5.69c0.38 1.6 0.58 3.22 0.58 4.86c0 2.85-0.56 5.56-1.68 8.11c-1.12 2.56-2.73 4.81-4.82 6.77c-1.94 1.79-4.15 3.16-6.63 4.12c-2.48 0.96-5.06 1.44-7.76 1.44c-0.5 0-1.24-0.04-2.21-0.13c3.36 2.81 7.32 4.22 11.85 4.22c1.44 0 2.91-0.17 4.42-0.51c2.08 1.87 4.4 3.24 6.98 4.09c0.6 0.19 1.32 0.36 2.16 0.51c0.2 0.02 0.38-0.05 0.55-0.22c0.17-0.17 0.28-0.4 0.33-0.7c0.02-0.06 0.03-0.13 0.03-0.21c0-0.07 0-0.14-0.01-0.21c-0.01-0.06-0.03-0.13-0.05-0.19c-0.03-0.06-0.05-0.12-0.06-0.16c-0.02-0.04-0.05-0.1-0.09-0.18c-0.04-0.07-0.08-0.13-0.1-0.16c-0.03-0.03-0.06-0.09-0.11-0.16c-0.05-0.07-0.08-0.12-0.1-0.14c-0.08-0.13-0.28-0.39-0.58-0.8c-0.3-0.4-0.52-0.72-0.65-0.94c-0.13-0.22-0.32-0.53-0.57-0.93c-0.24-0.39-0.45-0.8-0.63-1.23c-0.18-0.43-0.35-0.89-0.51-1.41c2.08-1.53 3.71-3.41 4.9-5.64c1.19-2.23 1.78-4.62 1.78-7.17c0-2.62-0.63-5.07-1.88-7.35z' />
                </svg>
            </div>

            <!-- Posts -->
            <div id='bottom-item-posts' on:click={() => setActiveItem(1)}>
                <svg version="1.2" baseProfile="tiny-ps" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 54" width="54" height="54">
                    <defs>
                        <linearGradient id="grd9" gradientUnits="userSpaceOnUse"  x1="5.9" y1="25.8" x2="49.8" y2="26.5">
                            <stop offset="0" stop-color="#bf00eb"  />
                            <stop offset="1" stop-color="#ff00dd"  />
                        </linearGradient>
                    </defs>
                    <style>
                        tspan { white-space:pre }
                        .shp9 { fill: url(#grd9) } 
                    </style>
                    <path class="shp9" d="m46.84 13.31c1.96 2.81 2.94 5.86 2.94 9.18c0 3.31-0.98 6.37-2.94 9.18c-1.96 2.81-4.62 5.02-7.98 6.65c-3.36 1.63-7.04 2.44-11.02 2.44c-1.14 0-2.33-0.08-3.55-0.23c-3.23 3.33-6.99 5.63-11.26 6.91c-0.8 0.27-1.73 0.48-2.79 0.63c-0.28 0.04-0.53-0.05-0.75-0.26c-0.22-0.21-0.36-0.49-0.43-0.83v-0.03c-0.05-0.08-0.05-0.19-0.01-0.34c0.04-0.15 0.06-0.25 0.05-0.29c-0.01-0.04 0.03-0.13 0.11-0.27c0.08-0.14 0.13-0.23 0.15-0.26c0.02-0.03 0.07-0.11 0.17-0.24c0.1-0.13 0.16-0.22 0.2-0.26c0.11-0.15 0.37-0.48 0.76-0.98c0.39-0.5 0.67-0.87 0.84-1.08c0.17-0.22 0.42-0.59 0.76-1.13c0.33-0.53 0.6-1.02 0.8-1.46c0.2-0.44 0.42-1 0.66-1.68c0.24-0.68 0.46-1.41 0.64-2.17c-2.56-1.69-4.58-3.79-6.06-6.28c-1.48-2.49-2.22-5.17-2.22-8.02c0-2.47 0.58-4.84 1.74-7.09c1.16-2.25 2.72-4.2 4.68-5.84c1.96-1.64 4.29-2.93 7-3.9c2.71-0.96 5.55-1.44 8.52-1.44c3.98 0 7.66 0.81 11.02 2.44c3.36 1.63 6.02 3.84 7.98 6.65z" />
                </svg>
            </div>

            <!-- Friends -->
            <div id='bottom-item-friends' on:click={() => setActiveItem(2)}>
                <svg version='1.2' baseProfile='tiny-ps' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 54 54' width='54' height='54'>
                    <defs>
                        <linearGradient id='grd6' gradientUnits='userSpaceOnUse'  x1='2.2' y1='51.2' x2='52.9' y2='4'>
                            <stop offset='0' stop-color='#ac08dd'  />
                            <stop offset='0' stop-color='#bf00eb'  />
                            <stop offset='1' stop-color='#ff00dd'  />
                        </linearGradient>
                    </defs>
                    <style>
                        tspan { white-space:pre }
                        .shp6 { fill: url(#grd6);stroke: #ffffff;stroke-width: 0 } 
                    </style>
                    <path class='shp6' d='m52.87 44.34c0 2.64-0.88 4.72-2.62 6.25c-1.75 1.53-4.08 2.29-6.98 2.29h-31.42c-2.9 0-5.23-0.76-6.98-2.29c-1.75-1.53-2.62-3.61-2.62-6.25c0-1.16 0.04-2.3 0.13-3.41c0.08-1.11 0.25-2.31 0.5-3.59c0.25-1.29 0.57-2.48 0.95-3.58c0.38-1.1 0.9-2.17 1.55-3.21c0.65-1.04 1.39-1.93 2.23-2.67c0.84-0.74 1.86-1.32 3.07-1.76c1.21-0.44 2.55-0.66 4.01-0.66c0.22 0 0.72 0.24 1.51 0.71c0.79 0.47 1.68 1 2.68 1.58c0.99 0.58 2.29 1.11 3.88 1.58c1.59 0.47 3.19 0.71 4.8 0.71c1.61 0 3.21-0.24 4.8-0.71c1.59-0.47 2.89-1 3.88-1.58c0.99-0.58 1.89-1.11 2.68-1.58c0.79-0.47 1.29-0.71 1.51-0.71c1.46 0 2.8 0.22 4.01 0.66c1.21 0.44 2.23 1.03 3.07 1.76c0.84 0.74 1.58 1.63 2.23 2.67c0.65 1.04 1.16 2.12 1.55 3.21c0.38 1.1 0.7 2.29 0.95 3.58c0.25 1.29 0.42 2.48 0.5 3.59c0.08 1.11 0.13 2.25 0.13 3.41zm-25.31-42.09c-3.81 0-7.07 1.24-9.76 3.71c-2.7 2.47-4.04 5.45-4.04 8.95c0 3.49 1.35 6.48 4.04 8.95c2.7 2.47 5.95 3.71 9.76 3.71c3.81 0 7.07-1.24 9.76-3.71c2.7-2.47 4.04-5.45 4.04-8.95c0-3.49-1.35-6.48-4.04-8.95c-2.7-2.47-5.95-3.71-9.76-3.71z' />
                </svg>
            </div>

        </div>
    </div>
{/if}
