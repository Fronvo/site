import { json } from '@sveltejs/kit';
import Stripe from 'stripe';

// @ts-ignore
const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET);

export async function POST() {
    const paymentIntent = await stripe.paymentIntents.create({
        // WHY IS THIS / 100?
        amount: 500,
        currency: 'eur',
        automatic_payment_methods: {
            enabled: true,
        },
    });

    return json({
        clientSecret: paymentIntent.client_secret,
    });
}
