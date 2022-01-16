<script>
    import '../app.css';

	import { onMount } from 'svelte';
	import { scale, fly } from 'svelte/transition';
	import { sockt, hasToken, connectionTimeoutDuration } from '../stores';
	import { send, gatherLoginData, isLoggedIn } from '../utilities';
	import { Shadow } from 'svelte-loading-spinners';

	// Panels
	import Community from '../panels/community.svelte';
	import Profile from '../panels/profile.svelte';
	
	let mountReady = false, isConnected = false, connTimedOut = false;

	// Panel switching
	const panels = [Community, Profile];
	let activePanel;

	onMount(() => {
		mountReady = true;

		hasToken.subscribe((value) => {
			if(value) attemptFronvoConnection();
		});
	});

	function attemptFronvoConnection() {
        setTimeout(() => {
            if (!$sockt) connTimedOut = true;
        }, connectionTimeoutDuration);

        function attemptSocketLogin() {
            // dont attempt if retry ui is visible
            if(connTimedOut) return;

			const token = localStorage.getItem('token');

			// only true after logging in/registering from the account route
			isLoggedIn()
			.then(() => postLogin())
			.catch(() => {
				send('loginToken', {
					token: token
				}, (err) => {
						if (!err) postLogin(); 
						else {
							localStorage.clear();
							$hasToken = false;
						}
					}
				);
			});
        }

        async function postLogin() {
            gatherLoginData().then(() => {
                isConnected = true;

				setActivePanel(sessionStorage.getItem('activePanelId') || 0);

                $sockt.on('disconnect', () => {
                    isConnected = false;

                    attemptFronvoConnection();
                });
            })
            .catch(() => {
                localStorage.clear();
                $hasToken = false;
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

        attemptFronvoConnection();
    }

	function setActivePanel(newPanelId) {
        if (panels.indexOf(activePanel) == newPanelId) return;

		activePanel = panels[newPanelId];
		
        sessionStorage.setItem('activePanelId', newPanelId);
    }
</script>

<svg class="bg-svg" version="1.2" baseProfile="tiny-ps" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMinYMax slice">
	<defs>
		<image  width="1920" height="1080" id="img1000" href="data:image/png;base64,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"/>
		<linearGradient id="grd1000" gradientUnits="userSpaceOnUse"  x1="1535" y1="284.913" x2="1649" y2="202.087">
			<stop offset="0" stop-color="#b621e0"  />
			<stop offset="1" stop-color="#7900ff"  />
		</linearGradient>
		<linearGradient id="grd1001" gradientUnits="userSpaceOnUse"  x1="1465.469" y1="890.112" x2="1576.359" y2="892.047">
			<stop offset="0" stop-color="#b621e0"  />
			<stop offset="1" stop-color="#7900ff"  />
		</linearGradient>
		<linearGradient id="grd1002" gradientUnits="userSpaceOnUse"  x1="263.226" y1="815.087" x2="271.578" y2="934.514">
			<stop offset="0" stop-color="#b621e0"  />
			<stop offset="1" stop-color="#7900ff"  />
		</linearGradient>
		<linearGradient id="grd1003" gradientUnits="userSpaceOnUse"  x1="317.39" y1="194.888" x2="376.61" y2="250.112">
			<stop offset="0" stop-color="#b621e0"  />
			<stop offset="1" stop-color="#7900ff"  />
		</linearGradient>
	</defs>
	<style>
		tspan { white-space:pre }
		.shp1000 { fill: url(#grd1000);stroke: #ffffff;stroke-width: 3 } 
		.shp1001 { fill: url(#grd1001);stroke: #ffffff;stroke-width: 3 } 
		.shp1002 { fill: url(#grd1002);stroke: #ffffff;stroke-width: 3 } 
		.shp1003 { fill: url(#grd1003);stroke: #ffffff;stroke-width: 3 } 
	</style>
	<use  href="#img1000" x="0" y="0" />
	<path class="shp1000" d="M1535 188L1649 188L1649 299L1535 299L1535 188Z" />
	<path class="shp1001" d="M1465.47 831.26L1576.36 878.35L1476.67 950.89L1465.47 831.26Z" />
	<path class="shp1002" d="M323 913.22L252.31 934.51L210.21 873.87L254.88 815.09L324.59 839.41L323 913.22Z" />
	<path class="shp1003" d="M347 287C312.16 287 284 258.17 284 222.5C284 186.83 312.16 158 347 158C381.84 158 410 186.83 410 222.5C410 258.17 381.84 287 347 287Z" />
</svg>

{#if mountReady && $hasToken}

	{#if !connTimedOut && !isConnected}
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

	{#if isConnected}
		<div class='full'>
			
			<!-- Top Div -->
			<div transition:fly={{y: -50,  duration: 500}} class='fronvo-top'>

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

			<!-- Panel Component -->
			<svelte:component this={activePanel}/>

			<!-- Bottom Bar -->
			<div transition:fly={{y: 100, duration: 500}} class='footer bottom-bar'>

				<!-- Community -->
				<div on:click={() => setActivePanel(0)}>
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

				<!-- Friends -->
				<div on:click={() => setActivePanel(1)}>
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

{/if}

<slot></slot>
