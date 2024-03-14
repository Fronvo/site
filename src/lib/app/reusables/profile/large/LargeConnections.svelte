<script lang="ts">
    import { isMobile } from 'stores/main';

    export let spotify: {
        hasSpotify: boolean;
        spotifyName: string;
        spotifyUrl: string;
    };

    function openSpotify(): void {
        window.open(spotify.spotifyUrl, '_blank');
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
</div>

<style>
    .connections-container {
        display: flex;
        flex-direction: column;
        align-items: start;
        margin-left: 20px;
    }

    .connection {
        width: 47%;
        padding: 10px;
        padding-right: 0px;
        border-radius: 5px;
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
        width: max-content;
        max-width: 100%;
        font-weight: 500;
        font-size: 1rem;
        flex: 1;
        overflow: hidden;
        white-space: no-wrap;
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
