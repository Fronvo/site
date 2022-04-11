<script context='module'>
	export function load({error, status}) {
		return {
			props: {
                status,
                err: `${error.message}`
			}
		};
	}
</script>

<script>
    export let status, err;
</script>

<div class='center'>
	<h1 class='err-msg'>{status}</h1>
	<h1>{err}</h1>
</div>
