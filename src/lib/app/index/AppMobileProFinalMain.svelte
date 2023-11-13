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
            await fetch('/api/apply-pro', {
                method: 'POST',
                body: JSON.stringify({
                    token: $currentToken,
                    ch: result.paymentIntent.id,
                }),
            });

            goto('/mobile-pro-welcome', {
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
                theme={'night'}
                bind:elements
                variables={{
                    colorPrimary: 'rgb(0, 220, 220)',
                    colorBackground: $darkTheme
                        ? 'rgb(30, 30, 30)'
                        : 'rgb(240, 240, 240)',
                    colorIconCardError: $darkTheme
                        ? 'rgb(30, 30, 30)'
                        : 'rgb(240, 240, 240)',
                }}
                rules={{
                    '.Input': {
                        border: $darkTheme
                            ? 'rgb(30, 30, 30)'
                            : 'rgb(240, 240, 240)',
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
        margin: auto;
        width: 100%;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        z-index: 0;
    }

    .choices-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
    }

    button {
        background: var(--pro);
        box-shadow: 0 0 5px var(--pro);
        font-size: 1.6rem;
        border-radius: 15px;
        font-weight: 300;
        color: white;
    }

    button:active {
        opacity: 0.7;
    }

    button:disabled {
        opacity: 0.75;
    }

    button:hover {
        background: var(--pro);
        color: white;
    }

    #login {
        width: 110px;
        font-size: 1.1rem;
    }
</style>
