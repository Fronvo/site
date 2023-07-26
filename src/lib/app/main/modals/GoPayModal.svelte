<script lang="ts">
    import { onMount } from 'svelte';
    import { loadStripe } from '@stripe/stripe-js';
    import {
        Elements,
        PaymentElement,
        LinkAuthenticationElement,
    } from 'svelte-stripe';
    import ModalTemplatePro from '../ModalTemplatePRO.svelte';
    import type { ModalData } from 'stores/modals';
    import { dismissModal, setProgressBar } from 'utilities/main';
    import { cachedAccountData, currentToken, darkTheme } from 'stores/main';
    import { loadProfile } from 'utilities/profile';
    import { toast } from 'svelte-sonner';
    import { loadThemes } from 'utilities/themes';

    let stripe = null;
    let clientSecret = null;
    let elements: any;
    let processing = false;

    onMount(async () => {
        stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC);

        // create payment intent server side
        clientSecret = await createPaymentIntent();
    });

    async function createPaymentIntent() {
        const response = await fetch('/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({}),
        });
        const { clientSecret } = await response.json();

        return clientSecret;
    }

    async function submit() {
        if (processing) return;

        setProgressBar(true);

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

            await loadProfile($cachedAccountData);
            await loadThemes();

            dismissModal();

            toast('Welcome to the PRO club.');
        }

        setProgressBar(false);
    }

    const data: ModalData = {
        title: 'Join PRO for 5€',

        actions: [
            {
                title: !processing ? 'Pay' : 'Processing',
                pro: true,
                callback: submit,
            },
            {
                title: 'Cancel',
                callback: processing ? () => {} : dismissModal,
            },
        ],
    };
</script>

<ModalTemplatePro {data}>
    {#if stripe && clientSecret}
        <Elements
            {stripe}
            {clientSecret}
            labels="floating"
            theme={$darkTheme ? 'night' : 'stripe'}
            bind:elements
        >
            <form on:submit|preventDefault={submit}>
                <LinkAuthenticationElement />
                <PaymentElement />
            </form>
        </Elements>
    {/if}
</ModalTemplatePro>
