<script lang="ts">
    import { darkTheme, isMobile } from 'stores/main';

    export let spotify: {
        hasSpotify: boolean;
        spotifyName: string;
        spotifyUrl: string;
    };

    export let github: {
        hasGithub: boolean;
        githubName: string;
        githubUrl: string;
    };

    function openSpotify(): void {
        window.open(spotify.spotifyUrl, '_blank');
    }

    function openGithub(): void {
        window.open(github.githubUrl, '_blank');
    }
</script>

<div class={`connections-container ${$isMobile ? 'mobile' : ''}`}>
    {#if spotify.hasSpotify}
        <div class="connection">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 256 256"
                ><path
                    fill="#1ED760"
                    d="M128 0C57.308 0 0 57.309 0 128c0 70.696 57.309 128 128 128c70.697 0 128-57.304 128-128C256 57.314 198.697.007 127.998.007zm58.699 184.614c-2.293 3.76-7.215 4.952-10.975 2.644c-30.053-18.357-67.885-22.515-112.44-12.335a7.981 7.981 0 0 1-9.552-6.007a7.968 7.968 0 0 1 6-9.553c48.76-11.14 90.583-6.344 124.323 14.276c3.76 2.308 4.952 7.215 2.644 10.975m15.667-34.853c-2.89 4.695-9.034 6.178-13.726 3.289c-34.406-21.148-86.853-27.273-127.548-14.92c-5.278 1.594-10.852-1.38-12.454-6.649c-1.59-5.278 1.386-10.842 6.655-12.446c46.485-14.106 104.275-7.273 143.787 17.007c4.692 2.89 6.175 9.034 3.286 13.72zm1.345-36.293C162.457 88.964 94.394 86.71 55.007 98.666c-6.325 1.918-13.014-1.653-14.93-7.978c-1.917-6.328 1.65-13.012 7.98-14.935C93.27 62.027 168.434 64.68 215.929 92.876c5.702 3.376 7.566 10.724 4.188 16.405c-3.362 5.69-10.73 7.565-16.4 4.187z"
                /></svg
            >

            <h1>{spotify.spotifyName}</h1>

            <svg
                on:click={openSpotify}
                on:keydown={openSpotify}
                id="open"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                stroke="currentColor"
                ><path
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.55"
                    d="M6 18L18 6m0 0H9m9 0v9"
                /></svg
            >
        </div>
    {/if}

    {#if github.hasGithub}
        <div class="connection">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 16 16"
                ><path
                    fill={`${$darkTheme ? 'white' : 'black'}`}
                    d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38c0-.27.01-1.13.01-2.2c0-.75-.25-1.23-.54-1.48c1.78-.2 3.65-.88 3.65-3.95c0-.88-.31-1.59-.82-2.15c.08-.2.36-1.02-.08-2.12c0 0-.67-.22-2.2.82c-.64-.18-1.32-.27-2-.27c-.68 0-1.36.09-2 .27c-1.53-1.03-2.2-.82-2.2-.82c-.44 1.1-.16 1.92-.08 2.12c-.51.56-.82 1.28-.82 2.15c0 3.06 1.86 3.75 3.64 3.95c-.23.2-.44.55-.51 1.07c-.46.21-1.61.55-2.33-.66c-.15-.24-.6-.83-1.23-.82c-.67.01-.27.38.01.53c.34.19.73.9.82 1.13c.16.45.68 1.31 2.69.94c0 .67.01 1.3.01 1.49c0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8"
                /></svg
            >
            <h1>{github.githubName}</h1>

            <svg
                on:click={openGithub}
                on:keydown={openGithub}
                id="open"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                stroke="currentColor"
                ><path
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.55"
                    d="M6 18L18 6m0 0H9m9 0v9"
                /></svg
            >
        </div>
    {/if}
</div>

<style>
    .connections-container {
        display: flex;
        flex-wrap: wrap;
        align-items: start;
        margin-left: 20px;
    }

    .connection {
        width: 45%;
        padding: 10px;
        padding-right: 0px;
        border-radius: 5px;
        margin: 5px;
        display: flex;
        align-items: center;
        background: var(--secondary);
    }

    .connection svg {
        width: 32px;
        height: 32px;
        min-width: 32px;
        min-height: 32px;
        margin-right: 10px;
        cursor: default;
    }

    .connection h1 {
        width: 200px;
        font-weight: 500;
        font-size: 1rem;
        flex: 1;
        display: -webkit-box;
        overflow: hidden;
        white-space: pre-wrap;
        text-overflow: ellipsis;
    }

    .connection #open {
        width: 22px;
        height: 22px;
        min-width: 22px;
        min-height: 22px;
        stroke: var(--gray);
        cursor: pointer;
    }

    .connection #open:hover {
        stroke: var(--text);
    }

    @media screen and (max-width: 850px) {
    }
</style>
