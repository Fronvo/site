<script lang="ts">
    import { goto } from '$app/navigation';
    import { indexVisible } from 'stores/index';

    function goRoot(): void {
        goto('/', {
            replaceState: true,
        });
    }
</script>

{#if $indexVisible}
    <div
        class="smobile:p-4 mobile:p-6 fixed flex items-center w-full p-8 pr-9 pl-9 bg-index-bg z-10"
    >
        <img
            class="smobile:w-7 smobile:h-7 smobile:mr-1 w-9 h-9 mr-2 cursor-pointer"
            src={'favicon.png'}
            on:click={goRoot}
            on:keydown={goRoot}
            alt="Logo"
            draggable={false}
        />
        <h1 class="smobile:text-2xl m-0 text-3xl w-1 font-extrabold">Fronvo</h1>

        <div class="flex items-center justify-end flex-1">
            <a
                class="text-white hover:underline"
                href="https://github.com/Fronvo"
                ><h1
                    class="smobile:text-base smobile:mr-2 smobile:ml-2 m-0 text-xl font-medium mr-3 ml-3"
                >
                    Source code
                </h1></a
            >
            <a
                class="text-white hover:underline"
                href="https://fronvo.instatus.com"
                ><h1
                    class="smobile:text-base smobile:mr-2 smobile:ml-2 m-0 text-xl font-medium mr-3 ml-3"
                >
                    Status
                </h1></a
            >
        </div>
    </div>
{/if}
