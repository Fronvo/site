<script lang="ts">
    import SvelteSegmentedInput from 'svelte-segmented-input';

    export let value: any;
    export let length = 6;
    export let valueEntered: () => void;
</script>

<SvelteSegmentedInput
    bind:value
    on:valueEntered={valueEntered}
    {length}
    style={{
        fontSize: document.body.clientWidth > 700 ? '2rem' : '1.5rem',
        borderRadius: '0px',
        borderWidth: '3px',
        borderColorActive: 'rgb(255, 255, 255)',
        textColor: 'var(--profile_info_color)',
        inputWidth: '100%',
        padding: '10px 10px 10px 10px',
    }}
/>
