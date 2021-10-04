<svelte:head>
	<title>Fronvo</title>
</svelte:head>

<script>
	// Animations
	import {fade} from 'svelte/transition';

	// Svelte-routing
	import {navigate} from 'svelte-routing';
</script>

<div in:fade>
	<img class='adaptive' src='../../images/fronvo-img.png' alt='Fronvo icon'/>
</div>