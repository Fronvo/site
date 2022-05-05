<script context='module' lang='ts'>
	import type { ErrorLoadParams, ErrorLoadResult } from 'src/interfaces/global';

	export function load({ status, error }: ErrorLoadParams): ErrorLoadResult {
		return {
			props: {
				status,
				error: error.message
			}
		}
	}
</script>

<script lang='ts'>
    export let status: number;
</script>

<div class='center'>
	<h1 class='err-msg'>{status}</h1>
</div>
