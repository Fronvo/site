<script lang="ts">
    export let text: string;
    export let marginLeft = '0px';
</script>

<div style={`margin-left: ${marginLeft}`} class="info-container">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        ><g fill="var(--tertiary)"
            ><path
                d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10Z"
                opacity="1"
            /><path
                d="M12 17.75a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75ZM12 7a1 1 0 1 1 0 2a1 1 0 0 1 0-2Z"
            /></g
        ></svg
    >

    <h1>{text}</h1>
</div>

<style>
    .info-container {
        width: 88%;
        display: flex;
        align-items: center;
        justify-content: start;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        text-align: start;
    }

    h1 {
        font-size: 0.9rem;
        font-weight: 600;
    }

    svg {
        width: 24px;
        height: 24px;
        margin-right: 5px;
        cursor: default;
    }
</style>
