<svelte:head>
	<title>Fronvo</title>
</svelte:head>

<script context='module'>
	export const prerender = true;
	export const ssr = false;
</script>

<script>
	import { goto } from '$app/navigation';
	import { scale, fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { animateFadeIn } from '../utilities';

	let main;

	onMount(() => {
		main = document.getElementById('rootMain');

		animateFadeIn(main);
	});

	function attemptRedirect() {
		// dont redirect to app directly, despite its checks, breaks transitions
		if(localStorage.getItem('token')) goto('app')
		else goto('account')
	}
</script>

<div id='rootMain' out:fade style='display: none;'>
	<div transition:fly={{duration: 500, y: -100}} class='fronvo-top'>
		<h1>Fronvo</h1>
		<h2>The cross platform app you have been waiting for!</h2>
	</div>

	<div in:scale={{delay: 300, duration: 600}} out:scale={{duration: 600}} class='center'>
		<button on:click='{() => attemptRedirect()}' style='margin-top: 10px;'>Try it online</button>

		<h1>or</h1>

		<button on:click='{() => goto('downloads')}'>Download</button>
	</div>

	<div in:scale={{duration: 500, start: 2}} out:fly={{y: 100, duration: 500}} class='footer'>
		<h1>Fronvo is now on <a href='https://github.com/fronvo' style='color: black;'>Github</a>!</h1>
	</div>
</div>
