<script lang="ts">
    import Theme from '$lib/svgs/Theme.svelte';
    import { indexVisible } from 'stores/index';
</script>

{#if $indexVisible}
    <div class="top-nav-container">
        <div class="logo-container">
            <h1 id="logo">Fronvo</h1>
            <h1 id="descriptor">Your privacy, for free.</h1>
        </div>

        <Theme />
    </div>
{/if}

<style>
    .top-nav-container {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        min-width: 800px;
        max-width: 50%;
        margin: auto;
        background: var(--i_primary);
        box-shadow: 0 0 20px var(--i_shadow);
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        display: flex;
        align-items: center;
        padding: 15px;
        z-index: 1;
    }

    h1 {
        margin: 0;
        color: var(--text);
        font-weight: 500;
    }

    .logo-container {
        flex: 1;
    }

    #logo {
        flex: 1;
        font-size: 1.8rem;
    }

    #descriptor {
        font-size: 1.1rem;
        color: var(--text);
    }

    @media screen and (max-width: 850px) {
        .top-nav-container {
            min-width: initial;
            max-width: initial;
            width: 100%;
            border-radius: 0;
        }

        #logo {
            font-size: 1.4rem;
        }

        #descriptor {
            font-size: 0.9rem;
        }
    }

    @media screen and (max-width: 600px) {
        #logo {
            font-size: 1.4rem;
        }

        #descriptor {
            font-size: 0.8rem;
        }
    }
</style>
