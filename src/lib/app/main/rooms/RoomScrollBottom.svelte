<script lang="ts">
    import { currentRoomId, showScrollBottom } from 'stores/rooms';
    import { fly } from 'svelte/transition';

    function scrollBottom() {
        const element = document.getElementsByClassName(
            'chat-container'
        )[0] as HTMLDivElement;

        setTimeout(() => {
            if (element.scrollHeight - element.scrollTop > 10000) {
                element.scrollTop = element.scrollHeight;
            } else {
                element.scrollBy({
                    behavior: 'smooth',
                    top: element.scrollHeight,
                });
            }
        }, 0);
    }
</script>

{#if $showScrollBottom}
    <div
        in:fly={{ y: -25, duration: $currentRoomId ? 250 : 0 }}
        class="bottom-container"
        on:click={scrollBottom}
        on:keydown={scrollBottom}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            ><g fill="white"
                ><path
                    d="M5 6.25a.75.75 0 0 0-.488 1.32l7 6c.28.24.695.24.976 0l7-6A.75.75 0 0 0 19 6.25H5Z"
                    opacity=".5"
                /><path
                    fill-rule="evenodd"
                    d="M4.43 10.512a.75.75 0 0 1 1.058-.081L12 16.012l6.512-5.581a.75.75 0 1 1 .976 1.139l-7 6a.75.75 0 0 1-.976 0l-7-6a.75.75 0 0 1-.081-1.058Z"
                    clip-rule="evenodd"
                /></g
            ></svg
        >
    </div>
{/if}

<style>
    .bottom-container {
        display: flex;
        align-items: center;
        position: absolute;
        bottom: 80px;
        height: 48px;
        width: 48px;
        background: var(--branding);
        box-shadow: 0 0 5px var(--branding);
        border: 2px solid var(--branding);
        border-radius: 15px;
        padding: 5px;
        transition: 150ms;
        cursor: pointer;
        animation-name: float;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-direction: alternate-reverse;
        animation-timing-function: ease-in-out;
    }

    .bottom-container:active {
        opacity: 0.75;
    }

    @keyframes float {
        0% {
            transform: translateY(-5px);
        }

        100% {
            transform: translateY(0px);
        }
    }
</style>
