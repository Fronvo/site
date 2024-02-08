<script lang="ts">
    import { fade } from 'svelte/transition';
    import { initSocket } from 'utilities/main';
    import { onMount } from 'svelte';
    import { loadStripe } from '@stripe/stripe-js';
    import { Elements, PaymentElement } from 'svelte-stripe';
    import { currentToken, darkTheme } from 'stores/main';
    import { goto } from '$app/navigation';

    let stripe = null;
    let clientSecret = null;
    let elements: any;
    let processing = false;

    let mountReady = false;

    onMount(() => {
        initSocket();

        mountReady = true;
    });

    onMount(async () => {
        stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC);

        clientSecret = await createPaymentIntent();
    });

    async function createPaymentIntent() {
        const response = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({}),
        });
        const { clientSecret } = await response.json();

        return clientSecret;
    }

    async function pay() {
        if (processing) return;

        processing = true;

        const result = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
        });

        // Payment Status
        if (result.error) {
            processing = false;
        } else {
            await fetch('/api/apply-turbo', {
                method: 'POST',
                body: JSON.stringify({
                    token: $currentToken,
                    ch: result.paymentIntent.id,
                }),
            });

            goto('/mobile-turbo-welcome', {
                replaceState: true,
            });
        }
    }
</script>

{#if mountReady}
    <div class="main-container" in:fade={{ duration: 250 }}>
        {#if stripe && clientSecret}
            <Elements
                {stripe}
                {clientSecret}
                labels="floating"
                theme={'stripe'}
                bind:elements
                variables={{
                    colorPrimary: 'rgb(0, 220, 220)',
                    colorBackground: 'rgb(240, 240, 240)',
                    colorIconCardError: 'rgb(240, 240, 240)',
                }}
                rules={{
                    '.Input': {
                        border: 'rgb(240, 240, 240)',
                    },
                }}
            >
                <form on:submit|preventDefault={pay}>
                    <PaymentElement />
                </form>
            </Elements>
        {/if}

        <div class="choices-container">
            <button id="login" on:click={pay}>Pay 5€</button>
        </div>
    </div>
{/if}

<style>
    .main-container {
        position: fixed;
        width: max-content;
        height: max-content;
        margin: auto;
        top: 0;
        right: 15px;
        left: 15px;
        bottom: 0;
        padding: 30px;
        padding-bottom: 20px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        flex-direction: column;
        z-index: 0;
        user-select: none;
        overflow-y: auto;
    }

    .choices-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 30px;
    }

    button {
        width: 300px;
        font-size: 1.1rem;
        font-weight: 600;
        background: transparent;
        backdrop-filter: blur(10px);
        border-radius: 5px;
        background: rgb(255, 255, 255, 0.075);
        box-shadow: 0 0 100px rgb(15, 15, 15);
        box-shadow: none;
        transition: 150ms;
        color: white;
    }

    button:hover {
        background: rgb(255, 255, 255, 0.15);
        color: white;
    }

    button:active {
        opacity: 0.8;
    }

    button:disabled {
        opacity: 0.5;
    }
</style>
