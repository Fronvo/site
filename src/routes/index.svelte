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
	import { isLoggedIn, animateFadeIn } from '../utilities';

	const socket = $sockt;

	socket.removeAllListeners();

	let main, redirectBtn, errMsg;

	onMount(() => {
		main = document.getElementById('rootMain');
		redirectBtn = document.getElementById('redirectBtn');
		errMsg = document.getElementById('errMsg');

		animateFadeIn(main);

		main.style.display = 'initial';
	});

	function attemptRedirect() {
		if(socket.connected) {
			redirectBtn.disabled = true;

			// very bad practice, i dont have the mental capacity rn to add tokens
			isLoggedIn()
			.then(() => goto('app'))
			.catch(() => {
				const email = localStorage.getItem('email');
				const password = localStorage.getItem('password');

				if(email && password) {
					// dont care, app will validate
					goto('app');
				} else {
					goto('account');
				}
			});
		} else {
			// show if not visible already
			if(errMsg.style.display === 'none') {
				errMsg.style.display = 'initial';
			}

			errMsg.textContent = 'Server unreachable, try again later.';
		}
	}
</script>

<div id='rootMain' out:fade style='display: none;'>
	<div in:fly class='fronvo-top'>
		<h1>Fronvo</h1>
		<h2>The cross platform app you have been waiting for!</h2>
	</div>

	<div in:scale={{delay: 300, duration: 250}} out:scale class='center'>
		<h1 id='errMsg' style='color: red; display: none;'>Error</h1>

		<div></div>

		<button id='redirectBtn' on:click='{() => attemptRedirect()}' style='margin-top: 10px;'>Try it online</button>

		<h1>or</h1>

		<button on:click='{() => goto('downloads')}'>Download</button>
	</div>

	<div class="footer">
		<h1>Fronvo is now on <a href='https://github.com/fronvo' style='color: black;'>Github</a>!</h1>
	</div>
</div>
