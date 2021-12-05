<svelte:head>
    <title>Fronvo</title>
</svelte:head>

<script context='module'>
    export const ssr = false;
</script>

<script>
    import { scale, fly } from 'svelte/transition';
    import { sockt, connectionTimeoutDuration } from '../stores';
    import { animateFadeIn, animateFadeOut, isLoggedIn, send } from '../utilities';
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
        }, connectionTimeoutDuration);

        function attemptSocketLogin() {
            isLoggedIn()
            .then(() => {
                animateFadeOut(connectionError);
                animateFadeIn(postLogin);
            })
            .catch(() => {
                const token = localStorage.getItem('token');

                if(token) {
                    send('loginToken', {
                        token: token
                    }, (err) => {
                        if(!err) {
                            animateFadeOut(connectionError);
                            animateFadeIn(postLogin);
                        } else {
                            localStorage.removeItem('token');
                            goto('account', true);
                        }
                    });
                } else goto('account', true);
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

<div id='appMain'>
    <div id='appConnectionError' class='center' style='display: none'>
        <h1 style='color: red;'>Error connecting to Fronvo.</h1>
    </div>

    <div id='appPostLogin' class='full' style='display: none;'>

        <!-- Menu -->
        <div transition:fly={{y: -100, duration: 500}} class='fronvo-top-panel'>
            <svg id='svg-menu' version="1.2" baseProfile="tiny-ps" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="44" height="44">
                <defs>
                    <linearGradient id="grd5" gradientUnits="userSpaceOnUse"  x1="17.909" y1="9.885" x2="26.575" y2="0.26">
                        <stop offset="0" stop-color="#ac08dd"  />
                        <stop offset="0" stop-color="#cf00ff"  />
                        <stop offset="1" stop-color="#d914dd"  />
                    </linearGradient>
                    <linearGradient id="grd6" gradientUnits="userSpaceOnUse"  x1="27.459" y1="17.425" x2="17.021" y2="27.506">
                        <stop offset="0" stop-color="#ae00ff"  />
                        <stop offset="1" stop-color="#da00ff"  />
                    </linearGradient>
                    <linearGradient id="grd7" gradientUnits="userSpaceOnUse"  x1="36.448" y1="36.789" x2="7.344" y2="42.975">
                        <stop offset="0" stop-color="#ae00e2"  />
                        <stop offset="1" stop-color="#de05e2"  />
                    </linearGradient>
                </defs>
                <style>
                    tspan { white-space:pre }
                    .shp4 { fill: url(#grd5);stroke: #ffffff;stroke-width: 0 } 
                    .shp5 { fill: url(#grd6);stroke: #ffffff;stroke-width: 0 } 
                    .shp6 { fill: url(#grd7);stroke: #ffffff;stroke-width: 0 } 
                </style>
                <path class="shp4" d="M6.36 9.89L6.36 0.26L38.12 0.26L38.12 9.89L6.36 9.89Z" />
                <path class="shp5" d="M13.19 27.51L12.95 17.88L31.29 17.43L31.53 27.05L13.19 27.51Z" />
                <path class="shp6" d="M7.34 44.69L7.34 35.07L36.45 35.07L36.45 44.69L7.34 44.69Z" />
            </svg>
            
            <!-- Online status, settings, username, stats -->
            <h1>Account</h1>
        </div>

        <!-- Chat -->
        <div transition:scale={{start: .95, duration: 500}} class='fronvo-panel panel-1'>
            <svg version="1.2" baseProfile="tiny-ps" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
                <defs>
                    <linearGradient id="grd8" gradientUnits="userSpaceOnUse"  x1="15.64" y1="34.787" x2="30.76" y2="17.994">
                        <stop offset="0" stop-color="#c036d4"  />
                        <stop offset="1" stop-color="#fb00ff"  />
                    </linearGradient>
                </defs>
                <style>
                    tspan { white-space:pre }
                    .shp7 { fill: url(#grd8);stroke: #ffffff;stroke-width: 0 } 
                </style>
                <path class="shp7" d="M33.33 9.24C34.73 11.47 35.43 13.91 35.43 16.54C35.43 19.17 34.73 21.6 33.33 23.84C31.93 26.07 30.02 27.84 27.6 29.13C25.19 30.43 22.56 31.08 19.71 31.08C18.43 31.08 17.12 30.93 15.79 30.62C13.94 32.29 11.87 33.5 9.58 34.26C9.04 34.43 8.4 34.58 7.66 34.71L7.59 34.71C7.43 34.71 7.28 34.64 7.14 34.48C6.99 34.33 6.91 34.13 6.88 33.89C6.86 33.83 6.86 33.77 6.86 33.7C6.86 33.64 6.86 33.58 6.87 33.52C6.88 33.46 6.89 33.41 6.91 33.35C6.94 33.29 6.95 33.25 6.97 33.21C6.98 33.17 7.01 33.12 7.05 33.05C7.08 32.98 7.11 32.94 7.14 32.91C7.16 32.88 7.19 32.83 7.24 32.77C7.28 32.7 7.31 32.66 7.33 32.64C7.4 32.53 7.57 32.29 7.84 31.93C8.11 31.57 8.3 31.29 8.42 31.09C8.54 30.89 8.71 30.62 8.92 30.27C9.14 29.92 9.32 29.55 9.48 29.17C9.64 28.8 9.79 28.38 9.94 27.93C8.09 26.56 6.64 24.89 5.58 22.9C4.53 20.91 4 18.79 4 16.54C4 13.91 4.7 11.47 6.1 9.24C7.5 7.01 9.41 5.24 11.82 3.95C14.24 2.65 16.87 2 19.71 2C22.56 2 25.19 2.65 27.6 3.95C30.02 5.24 31.93 7.01 33.33 9.24ZM42.33 17.28C41.21 15.25 39.69 13.57 37.77 12.22C38.11 13.64 38.29 15.08 38.29 16.54C38.29 19.08 37.79 21.48 36.79 23.75C35.79 26.02 34.36 28.03 32.5 29.77C30.78 31.36 28.81 32.58 26.61 33.43C24.41 34.29 22.11 34.71 19.71 34.71C19.27 34.71 18.61 34.67 17.75 34.6C20.74 37.1 24.25 38.35 28.29 38.35C29.57 38.35 30.88 38.2 32.21 37.89C34.06 39.56 36.13 40.77 38.42 41.53C38.96 41.7 39.6 41.85 40.34 41.98C40.52 42 40.68 41.93 40.83 41.78C40.98 41.63 41.08 41.42 41.12 41.16C41.14 41.1 41.14 41.04 41.14 40.97C41.14 40.91 41.14 40.85 41.13 40.79C41.12 40.73 41.11 40.68 41.09 40.62C41.06 40.56 41.05 40.51 41.03 40.48C41.02 40.44 40.99 40.39 40.95 40.32C40.92 40.25 40.89 40.21 40.86 40.18C40.84 40.15 40.81 40.1 40.76 40.04C40.72 39.97 40.69 39.93 40.67 39.91C40.6 39.79 40.43 39.56 40.16 39.2C39.89 38.84 39.7 38.56 39.58 38.36C39.46 38.16 39.29 37.89 39.08 37.54C38.86 37.19 38.68 36.82 38.52 36.44C38.36 36.07 38.21 35.65 38.06 35.19C39.91 33.83 41.36 32.16 42.42 30.18C43.47 28.2 44 26.08 44 23.81C44 21.48 43.44 19.3 42.33 17.28Z" />
            </svg>
            <h1>Chat</h1>
        </div>
        
        <!-- Friends -->
        <div transition:scale={{start: .95, duration: 500}} class='fronvo-panel panel-2'>
            <svg version="1.2" baseProfile="tiny-ps" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
                <defs>
                    <image  width="48" height="48" id="img1" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwAQMAAABtzGvEAAAAAXNSR0IB2cksfwAAAANQTFRFAAAAp3o92gAAAAF0Uk5TAEDm2GYAAAANSURBVHicY2AYBdQEAAFQAAHr5ijJAAAAAElFTkSuQmCC"/>
                    <linearGradient id="grd9" gradientUnits="userSpaceOnUse"  x1="4.241" y1="47" x2="44.759" y2="2">
                        <stop offset="0" stop-color="#ac08dd"  />
                        <stop offset="0" stop-color="#bc00e8"  />
                        <stop offset="1" stop-color="#d914dd"  />
                    </linearGradient>
                </defs>
                <style>
                    tspan { white-space:pre }
                    .shp8 { fill: url(#grd9);stroke: #ffffff;stroke-width: 0 } 
                </style>
                <path class="shp8" d="M47 39.41C47 41.76 46.22 43.61 44.67 44.96C43.11 46.32 41.04 47 38.47 47L10.53 47C7.96 47 5.89 46.32 4.33 44.96C2.78 43.61 2 41.76 2 39.41C2 38.38 2.04 37.37 2.11 36.38C2.19 35.39 2.34 34.33 2.56 33.19C2.78 32.04 3.07 30.98 3.41 30.01C3.75 29.03 4.21 28.08 4.78 27.15C5.36 26.22 6.02 25.43 6.76 24.78C7.51 24.12 8.42 23.6 9.49 23.21C10.57 22.82 11.76 22.63 13.06 22.63C13.25 22.63 13.7 22.84 14.4 23.25C15.1 23.68 15.9 24.14 16.78 24.66C17.67 25.18 18.82 25.65 20.23 26.07C21.65 26.49 23.07 26.7 24.5 26.7C25.93 26.7 27.35 26.49 28.77 26.07C30.18 25.65 31.33 25.18 32.22 24.66C33.1 24.14 33.9 23.68 34.6 23.25C35.3 22.84 35.75 22.63 35.94 22.63C37.24 22.63 38.43 22.82 39.51 23.21C40.58 23.6 41.49 24.12 42.24 24.78C42.98 25.43 43.64 26.22 44.22 27.15C44.79 28.08 45.25 29.03 45.59 30.01C45.93 30.98 46.22 32.04 46.44 33.19C46.66 34.33 46.81 35.39 46.89 36.38C46.96 37.37 47 38.38 47 39.41ZM24.5 2C21.11 2 18.22 3.1 15.82 5.3C13.43 7.49 12.23 10.14 12.23 13.25C12.23 16.36 13.43 19.01 15.82 21.2C18.22 23.4 21.11 24.5 24.5 24.5C27.89 24.5 30.78 23.4 33.18 21.2C35.57 19.01 36.77 16.36 36.77 13.25C36.77 10.14 35.57 7.49 33.18 5.3C30.78 3.1 27.89 2 24.5 2Z" />
            </svg>
            <h1>Friends</h1>
        </div>

    </div>
</div>
