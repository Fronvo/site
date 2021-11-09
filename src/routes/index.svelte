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
	import { sockt } from '../stores';
	import { animateFadeIn } from '../utilities';

	const socket = $sockt;

	socket.removeAllListeners();

	let main, errMsg;

	onMount(() => {
		main = document.getElementById('rootMain');
		errMsg = document.getElementById('errMsg');

		animateFadeIn(main);

		main.style.display = 'initial';
	});

	function attemptRedirect() {
		if(socket.connected) {
			goto('app');
		} else {
			// show if not visible already
			if(errMsg.style.display === 'none') {
				animateFadeIn(errMsg);
				
				errMsg.style.display = 'initial';
			}

			errMsg.textContent = 'Server unreachable, try again later.';
		}
	}
</script>

<div id='rootMain' out:fade style='display: none;'>
	<div transition:fly={{duration: 500, y: -100}} class='fronvo-top'>
		<h1>Fronvo</h1>
		<h2>The cross platform app you have been waiting for!</h2>
	</div>

	<div in:scale={{delay: 300, duration: 600}} out:scale={{duration: 600}} class='center'>
		<h1 id='errMsg' style='color: red; display: none;'>Error</h1>

		<div></div>

		<button on:click='{() => attemptRedirect()}' style='margin-top: 10px;'>Try it online</button>

		<h1>or</h1>

		<button on:click='{() => goto('downloads')}'>Download</button>
	</div>

	<div in:scale={{duration: 500, start: 2}} out:fly={{y: 100, duration: 500}} class='footer'>
		<h1>Fronvo is now on <a href='https://github.com/fronvo' style='color: black;'>Github</a>!</h1>
	</div>
</div>
