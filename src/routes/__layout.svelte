<script>
    import '../app.css';

	import { onMount } from 'svelte';
	import { scale, fly } from 'svelte/transition';
	import { sockt, hasToken, connectionTimeoutDuration } from '../stores';
	import { send, gatherLoginData, isLoggedIn } from '../utilities';
	import { Shadow } from 'svelte-loading-spinners';
	
	// Panels
	import Community from '../panels/community.svelte'
	import Friend from '../panels/friend.svelte';

	let mountReady = false, isConnected = false, connTimedOut = false;
	const panels = [Community, Friend];
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

</script>

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
		
		<!-- Panel Component -->
		<svelte:component this={activePanel}/>

	{/if}

{/if}

<slot></slot>
