<script lang="ts">
    import { onMount } from 'svelte';
    import { loadStripe } from '@stripe/stripe-js';
    import { Elements, PaymentElement } from 'svelte-stripe';
    import { modalLoading, type ModalData } from 'stores/modals';
    import { dismissModal } from 'utilities/main';
    import { cachedAccountData, currentToken, darkTheme } from 'stores/main';
    import { loadProfile } from 'utilities/profile';
    import ModalTemplate from '../ModalTemplate.svelte';

    let stripe = null;
    let clientSecret = null;
    let elements: any;

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

    async function submit() {
        $modalLoading = true;

        const result = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
        });

        // Payment Status
        if (result.error) {
            $modalLoading = false;
        } else {
            await fetch('/api/apply-turbo', {
                method: 'POST',
                body: JSON.stringify({
                    token: $currentToken,
                    ch: result.paymentIntent.id,
                }),
            });

            await loadProfile($cachedAccountData);

            dismissModal();
        }
    }

    const data: ModalData = {
        title: 'Join Turbo for 5€',

        actions: [
            {
                title: 'Pay',
                callback: submit,
                primary: true,
            },
            {
                title: 'Cancel',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
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
            <form on:submit|preventDefault={submit}>
                <PaymentElement />
            </form>
        </Elements>
    {/if}
</ModalTemplate>
