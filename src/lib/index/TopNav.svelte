<script lang="ts">
    import { goto } from '$app/navigation';
    import { indexVisible } from 'stores/index';

    function goRoot(): void {
        goto('/');
    }
</script>

{#if $indexVisible}
    <div class="top-nav-container">
        <img
            src={'favicon.png'}
            on:click={goRoot}
            on:keydown={goRoot}
            alt="Logo"
            draggable={false}
        />
        <h1 id="logo">Fronvo</h1>

        <div class="options">
            <a href="https://github.com/Fronvo"><h1>Source code</h1></a>
            <a href="https://fronvo.instatus.com"><h1>Status</h1></a>
        </div>
    </div>
{/if}

<style>
    .top-nav-container {
        display: flex;
        align-items: center;
        width: 100%;
        position: fixed;
        padding: 30px;
        padding-left: 30px;
        padding-right: 30px;
        background: rgb(0, 0, 0, 0.1);
        z-index: 1;
    }

    img {
        width: 36px;
        height: 36px;
        margin-right: 10px;
        cursor: pointer;
    }

    h1 {
        margin: 0;
        color: white;
    }

    #logo {
        font-size: 2rem;
        font-weight: 700;
    }

    .options {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: end;
    }

    .options a {
        color: white;
        text-decoration: none;
    }

    .options a:hover {
        text-decoration: underline;
    }

    .options h1 {
        margin: 0;
        font-size: 1.3rem;
        font-weight: 400;
        margin-left: 15px;
        margin-right: 15px;
        color: white;
    }

    @media screen and (max-width: 850px) {
        .top-nav-container {
            padding: 20px;
        }
    }

    @media screen and (max-width: 600px) {
        .top-nav-container {
            padding: 10px;
        }

        img {
            width: 28px;
            height: 28px;
            margin-right: 5px;
        }

        #logo {
            font-size: 1.6rem;
        }

        .options h1 {
            font-size: 1rem;
            margin-right: 10px;
            margin-left: 10px;
        }
    }
</style>
