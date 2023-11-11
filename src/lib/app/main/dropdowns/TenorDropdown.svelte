<script lang="ts">
    import { onMount } from 'svelte';
    import DropdownTemplateEmpty from '../DropdownTemplateEmpty.svelte';
    import { fade, scale } from 'svelte/transition';
    import { targetTenorCallback } from 'stores/modals';
    import { socket } from 'stores/main';
    import type { TenorGifs } from 'interfaces/account/fetchTenor';

    let search: HTMLInputElement;

    let gifsP: TenorGifs[] = [];
    let showEmpty = true;

    onMount(() => {
        if (search) {
            search.focus();

            search.onkeydown = async (ev) => {
                if (ev.shiftKey || ev.key == 'Escape') {
                    return;
                }

                let oldVal: string;

                setTimeout(() => {
                    oldVal = search.value;

                    if (oldVal.length == 0) {
                        showEmpty = true;
                        return;
                    }

                    showEmpty = false;
                }, 0);

                setTimeout(() => {
                    if (oldVal != search.value || oldVal == '') {
                        gifsP = [];
                        return;
                    }

                    gifsP = [];

                    socket.emit('fetchTenor', { q: oldVal }, ({ gifs }) => {
                        if (gifs.length > 0) {
                            gifsP = gifs;
                        }
                    });
                }, 100);
            };
        }
    });

    function sendGif(url: string): void {
        $targetTenorCallback(url);
    }
</script>

<DropdownTemplateEmpty>
    <div class="search-container">
        <input maxlength={64} bind:this={search} placeholder="Search Tenor" />

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            ><g fill="none" stroke="var(--text)" stroke-width="1.5"
                ><circle cx="11.5" cy="11.5" r="9.5" /><path
                    stroke-linecap="round"
                    d="m20 20l2 2"
                /></g
            ></svg
        >
    </div>

    <div class="gifs-container">
        {#if gifsP.length == 0 && showEmpty}
            <div class="empty" in:fade>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    ><g fill="none" stroke="var(--branding)" stroke-width="1.5"
                        ><path
                            d="M19.562 7a2.132 2.132 0 0 0-2.1-2.5H6.538a2.132 2.132 0 0 0-2.1 2.5M17.5 4.5c.028-.26.043-.389.043-.496a2 2 0 0 0-1.787-1.993C15.65 2 15.52 2 15.26 2H8.74c-.26 0-.391 0-.497.011a2 2 0 0 0-1.787 1.993c0 .107.014.237.043.496"
                            opacity=".85"
                        /><path
                            d="M14.581 13.616c.559.346.559 1.242 0 1.588l-3.371 2.09c-.543.337-1.21-.1-1.21-.794v-4.18c0-.693.667-1.13 1.21-.794l3.371 2.09Z"
                        /><path
                            d="M2.384 13.793c-.447-3.164-.67-4.745.278-5.77C3.61 7 5.298 7 8.672 7h6.656c3.374 0 5.062 0 6.01 1.024c.947 1.024.724 2.605.278 5.769l-.422 3c-.35 2.48-.525 3.721-1.422 4.464c-.897.743-2.22.743-4.867.743h-5.81c-2.646 0-3.97 0-4.867-.743c-.897-.743-1.072-1.983-1.422-4.464l-.422-3Z"
                        /></g
                    ></svg
                >

                <h1>Search for GIFs</h1>
            </div>
        {/if}

        <div class="gif-container">
            {#each gifsP.slice(0, Math.ceil(gifsP.length / 2)) as { gif_tiny }, i}
                <img
                    on:click={() => sendGif(gif_tiny)}
                    on:keydown={() => sendGif(gif_tiny)}
                    in:scale={{ duration: 250, delay: i + i * 25 }}
                    src={gif_tiny}
                    alt="Tenor GIF"
                    draggable={false}
                />
            {/each}
        </div>

        <div class="gif-container">
            {#each gifsP.slice(Math.ceil(gifsP.length / 2) + 1, gifsP.length) as { gif_tiny }, i}
                <img
                    on:click={() => sendGif(gif_tiny)}
                    on:keydown={() => sendGif(gif_tiny)}
                    in:scale={{ duration: 250, delay: i + i * 25 }}
                    src={gif_tiny}
                    alt="Tenor GIF"
                    draggable={false}
                />
            {/each}
        </div>
    </div>
</DropdownTemplateEmpty>

<style>
    .search-container {
        display: flex;
        align-items: center;
        border: 2px solid var(--primary);
        border-radius: 10px;
        width: 95%;
        align-self: center;
        margin-top: 10px;
        height: 40px;
        padding-left: 5px;
        padding-right: 10px;
    }

    .gifs-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        width: 500px;
        height: 500px;
        padding-right: 10px;
        margin-top: 10px;
        overflow: auto;
    }

    .gif-container {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: start;
        width: 50%;
        height: 100vh;
    }

    input {
        font-size: 1rem;
        background: transparent;
        width: 150px;
        flex: 1;
    }

    svg {
        width: 20px;
        height: 20px;
        cursor: default;
    }

    img {
        border-radius: 5px;
        transition: 150ms;
        cursor: pointer;
        width: 95%;
        margin-left: 10px;
        margin-bottom: 10px;
        border: 2.5px solid var(--bg);
    }

    img:hover {
        border: 2.5px solid var(--branding);
    }

    img:active {
        transform: scale(0.95);
    }

    .empty {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 275px;
        justify-content: center;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .empty h1 {
        margin: 0;
        font-size: 1.3rem;
    }

    .empty svg {
        width: 128px;
        height: 128px;
        cursor: default;
    }
</style>
