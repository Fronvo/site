<svelte:head>
    <title>Fronvo</title>
</svelte:head>

<script context='module'>
    export const ssr = false;
</script>

<script>
    import { onMount } from 'svelte';
    import { fly, blur } from 'svelte/transition';
    import { hasToken } from '../stores';

    let mountReady = false;
    const githubUrl = 'https://github.com/fronvo/fronvo-site';

    onMount(() => {
        if(localStorage.getItem('token')) $hasToken = true;
        
		mountReady = true;
    });
</script>

{#if mountReady && !$hasToken}
	<div class='full'>
		<div transition:fly={{y: -200, duration: 500}} class='fronvo-top rounded-center'>
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

            <!-- Github Icon -->
            <svg id='svg-icon' on:click={() => location.href=githubUrl} version="1.2" baseProfile="tiny-ps" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 38" width="38" height="38">
                <defs>
                    <image width="38" height="38"/>
                    <linearGradient id="grd3" gradientUnits="userSpaceOnUse"  x1="0" y1="17" x2="38" y2="21">
                        <stop offset="0" stop-color="#ff00e3"  />
                        <stop offset="1" stop-color="#b000f9"  />
                    </linearGradient>
                </defs>
                <style>
                    tspan { white-space:pre }
                    .shp3 { fill: url(#grd3) } 
                </style>
                <path class="shp3" d="m38 19.48c0 4.24-1.21 8.06-3.62 11.45c-2.42 3.39-5.54 5.74-9.36 7.04c-0.45 0.08-0.77 0.03-0.98-0.18c-0.21-0.2-0.31-0.46-0.31-0.76v-5.35c0-1.64-0.43-2.84-1.29-3.6c0.94-0.1 1.79-0.25 2.54-0.46c0.75-0.2 1.53-0.53 2.33-0.99c0.8-0.46 1.47-1.02 2-1.69c0.54-0.67 0.97-1.56 1.31-2.66c0.34-1.11 0.51-2.38 0.51-3.82c0-2.05-0.65-3.79-1.95-5.22c0.61-1.54 0.54-3.26-0.2-5.17c-0.46-0.15-1.13-0.06-2 0.28c-0.87 0.34-1.63 0.71-2.28 1.12l-0.94 0.61c-1.53-0.44-3.12-0.66-4.75-0.66c-1.63 0-3.22 0.22-4.75 0.66c-0.26-0.19-0.61-0.41-1.05-0.68c-0.44-0.27-1.13-0.6-2.07-0.98c-0.94-0.38-1.65-0.49-2.13-0.34c-0.73 1.91-0.78 3.64-0.17 5.17c-1.3 1.44-1.95 3.18-1.95 5.22c0 1.44 0.17 2.71 0.51 3.8c0.34 1.1 0.77 1.99 1.3 2.66c0.53 0.68 1.19 1.24 1.99 1.7c0.8 0.46 1.57 0.79 2.33 0.99c0.75 0.2 1.6 0.36 2.54 0.46c-0.66 0.61-1.06 1.48-1.21 2.61c-0.35 0.17-0.72 0.3-1.11 0.38c-0.4 0.08-0.87 0.13-1.41 0.13c-0.54 0-1.08-0.18-1.62-0.55c-0.54-0.36-0.99-0.89-1.37-1.58c-0.31-0.54-0.71-0.98-1.2-1.32c-0.49-0.34-0.89-0.54-1.22-0.61l-0.49-0.08c-0.35 0-0.59 0.04-0.72 0.11c-0.13 0.08-0.17 0.17-0.12 0.29c0.05 0.12 0.12 0.24 0.22 0.36c0.1 0.12 0.21 0.22 0.32 0.3l0.17 0.13c0.36 0.17 0.72 0.49 1.08 0.96c0.35 0.47 0.61 0.9 0.78 1.29l0.25 0.58c0.21 0.64 0.58 1.16 1.09 1.56c0.51 0.4 1.06 0.65 1.66 0.76c0.59 0.11 1.17 0.17 1.72 0.18c0.55 0.01 1.01-0.02 1.37-0.09l0.57-0.1c0 0.64 0 1.39 0.01 2.26c0.01 0.86 0.01 1.32 0.01 1.37c0 0.3-0.11 0.56-0.32 0.76c-0.21 0.2-0.54 0.26-0.99 0.18c-3.83-1.3-6.95-3.65-9.36-7.04c-2.42-3.39-3.62-7.21-3.62-11.45c0-3.53 0.85-6.79 2.55-9.78c1.7-2.98 4-5.35 6.91-7.09c2.91-1.74 6.09-2.61 9.54-2.61c3.45 0 6.63 0.87 9.54 2.61c2.91 1.74 5.22 4.1 6.91 7.09c1.7 2.98 2.55 6.24 2.55 9.78z" />
            </svg>
		</div>

        <!-- TODO: Svelte component, same way as __layout, in panels/homepage folder -->
        <div transition:blur={{duration: 500}} class='homepage-panels-container'>

        </div>

        <div transition:fly={{y: 100, duration: 500}} class='footer bottom-bar'>

            <!-- Left Arrow -->
            <div on:click={() => {}}>
                <svg version="1.2" baseProfile="tiny-ps" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 54" width="54" height="54">
                    <defs>
                        <image width="54" height="54"/>
                        <linearGradient id="grd4" gradientUnits="userSpaceOnUse"  x1="7" y1="27" x2="42" y2="27">
                            <stop offset="0" stop-color="#ff00e3"  />
                            <stop offset="1" stop-color="#b000f9"  />
                        </linearGradient>
                    </defs>
                    <style>
                        tspan { white-space:pre }
                        .shp4 { fill: url(#grd4);stroke: #ffffff;stroke-width: 2 } 
                    </style>
                    <path class="shp4" d="m7.63 25.58l25.06-23.94c0.43-0.41 0.93-0.61 1.52-0.61c0.59 0 1.09 0.2 1.52 0.61l5.61 5.35c0.43 0.41 0.64 0.89 0.64 1.45c0 0.56-0.21 1.04-0.64 1.45l-17.93 17.14l17.95 17.12c0.43 0.41 0.64 0.89 0.64 1.45c0 0.56-0.21 1.04-0.64 1.45l-5.61 5.36c-0.43 0.41-0.93 0.61-1.52 0.61c-0.59 0-1.09-0.2-1.52-0.61l-25.08-23.93c-0.43-0.41-0.64-0.89-0.64-1.45c0-0.56 0.21-1.04 0.64-1.45z" />
                </svg>
            </div>

            <!-- Right Arrow -->
            <div on:click={() => {}}>
                <svg version="1.2" baseProfile="tiny-ps" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 54" width="54" height="54">
                    <defs>
                        <image width="54" height="54"/>
                        <linearGradient id="grd5" gradientUnits="userSpaceOnUse"  x1="9" y1="27" x2="44" y2="27">
                            <stop offset="0" stop-color="#ff00e3"  />
                            <stop offset="1" stop-color="#b000f9"  />
                        </linearGradient>
                    </defs>
                    <style>
                        tspan { white-space:pre }
                        .shp5 { fill: url(#grd5);stroke: #ffffff;stroke-width: 2 } 
                    </style>
                    <path class="shp5" d="m43.37 28.44l-25.06 23.94c-0.43 0.41-0.93 0.61-1.52 0.61c-0.59 0-1.09-0.2-1.52-0.61l-5.61-5.35c-0.43-0.41-0.64-0.89-0.64-1.45c0-0.56 0.21-1.04 0.64-1.45l17.93-17.14l-17.95-17.12c-0.43-0.41-0.64-0.89-0.64-1.45c0-0.56 0.21-1.04 0.64-1.45l5.61-5.36c0.43-0.41 0.93-0.61 1.52-0.61c0.59 0 1.09 0.2 1.52 0.61l25.08 23.93c0.43 0.41 0.64 0.89 0.64 1.45c0 0.56-0.21 1.04-0.64 1.45z" />
                </svg>
            </div>

        </div>
	</div>
{/if}
