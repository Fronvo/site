import Stripe from 'stripe';
import { error, json } from '@sveltejs/kit';

// @ts-ignore
const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET);

export async function POST({ request }) {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    try {
        stripe.webhooks.constructEvent(
            body,
            signature,
            import.meta.env.VITE_STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        throw error(400, 'Invalid request');
    }

    return json(200);
}
