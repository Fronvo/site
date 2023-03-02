<script lang="ts">
    export let callback: () => void;
    export let marginTop: number = 0;
    export let marginBottom: number = 0;
    export let start: boolean = false;
</script>

<h1
    on:click={callback}
    style={`margin-top: ${marginTop}px; margin-bottom: ${marginBottom}px; width: ${
        start ? 'max-content' : 'initial'
    }`}
>
    <slot />
</h1>

<style>
    h1 {
        color: var(--profile_info_color);
        cursor: pointer;
        margin: 0;
        transition: 250ms color;
        font-size: 1.8rem;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        text-align: center;
    }

    @media screen and (max-width: 700px) {
        h1 {
            cursor: default;
            font-size: 1.4rem;
        }
    }
</style>
