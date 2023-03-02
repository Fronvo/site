<script lang="ts">
    export let value: any;
    export let maxLength: number;
    export let isPassword: boolean = false;
</script>

<h1 id="header"><slot /></h1>

{#if !isPassword}
    <input bind:value type="text" maxlength={maxLength} />
{:else}
    <input
        autocomplete="current-password"
        bind:value
        type="password"
        maxlength={maxLength}
    />
{/if}

<style>
    h1 {
        color: var(--profile_info_color);
        margin: 0;
        margin-bottom: 5px;
        font-size: 2.1rem;
        text-align: start;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    input {
        font-size: 2rem;
        margin: 0 5px 15px 5px;
        width: 95%;
        color: var(--profile_info_color);
        background: transparent;
        border: 2px solid var(--profile_info_color);
    }

    @media screen and (max-width: 700px) {
        h1 {
            font-size: 1.4rem;
        }

        input {
            font-size: 1.4rem;
        }
    }
</style>
