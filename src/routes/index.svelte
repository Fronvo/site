<svelte:head>
	<title>Fronvo</title>
</svelte:head>

<script context='module'>
	export const prerender = true;
	export const ssr = false;
</script>

<script>
	import { goto } from '$app/navigation';
	import { scale, fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	// force socket.io connection beforehand, less delay
	import { sockt } from '../stores';

	let mountReady = false;

	onMount(() => {
		mountReady = true;
	});

	function attemptRedirect() {
		// dont redirect to app directly, despite its checks, breaks transitions
		if(localStorage.getItem('token')) goto('app')
		else goto('account')
	}
	
</script>

{#if mountReady}
	<div>
		<div transition:fly={{duration: 600, y: -100}} class='fronvo-top'>
			<h1 id='logo'>Fronvo</h1>
			<h2 id='description'>The cross platform app you have been waiting for!</h2>
		</div>

		<div in:scale={{duration: 600, delay: 200}} out:scale={{duration: 600}} class='center'>
			<button on:click='{() => attemptRedirect()}' style='margin-top: 10px;'>Try it online</button>

			<h1>or</h1>

			<button on:click='{() => goto('downloads')}'>Download</button>
		</div>

		<div in:scale={{duration: 600, start: 1.5}} out:fly={{y: 100, duration: 600}} class='footer bottom-news'>
			<h1>Fronvo is now on <a href='https://github.com/fronvo' style='color: #f9c0da;'>Github</a>!</h1>
		</div>
	</div>
{/if}
