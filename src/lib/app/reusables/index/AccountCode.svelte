<script lang="ts">
    import SvelteSegmentedInput from 'svelte-segmented-input';

    export let value: any;
    export let length = 6;
    export let valueEntered: () => void;
</script>

<!-- Accessible from mobile in the /reset route, keep responsive -->
<SvelteSegmentedInput
    bind:value
    on:valueEntered={valueEntered}
    {length}
    style={{
        fontSize: '1.4rem',
        borderRadius: '0px',
        borderWidth: '3px',
        borderColorActive: 'rgb(255, 255, 255)',
        textColor: 'var(--text)',
        inputWidth: '100%',
        padding: '10px 10px 10px 10px',
    }}
/>
