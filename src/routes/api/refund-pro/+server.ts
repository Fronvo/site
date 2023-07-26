import { json } from '@sveltejs/kit';
import { io } from 'socket.io-client';
import { SERVER_URL } from 'stores/main.js';
import Stripe from 'stripe';

// @ts-ignore
const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET);

/** @type {import('./$types').RequestHandler} */
// @ts-ignore
export async function POST({ request }) {
    const requestParsed = await request.json();

    const token = (await requestParsed['token']) as string;

    if (!token) return json('UNKNOWN ERROR');

    const client = io(SERVER_URL, {
        transports: ['websocket'],
        path: '/fronvo',
    });

    async function refundPro(): Promise<string> {
        return new Promise((resolve) => {
            client.on('connect', () => {
                client.emit(
                    'loginToken',
                    {
                        token,
                    },
                    ({ err }) => {
                        if (!err) {
                            client.emit(
                                'fetchPROCH',
                                {
                                    secret: import.meta.env.VITE_PRO_SECRET,
                                },
                                async ({ err, proCH }) => {
                                    if (!err) {
                                        try {
                                            const res =
                                                await stripe.refunds.create({
                                                    charge: proCH,
                                                });

                                            if (res.status == 'succeeded') {
                                                client.emit(
                                                    'refundPro',
                                                    {
                                                        secret: import.meta.env
                                                            .VITE_PRO_SECRET,
                                                    },
                                                    ({ err }) => {
                                                        client.emit('logout');

                                                        if (!err) {
                                                            resolve('OK');
                                                        } else {
                                                            resolve(
                                                                'UNKNOWN ERROR'
                                                            );
                                                        }
                                                    }
                                                );
                                            }
                                        } catch (e) {
                                            return json('UNKNOWN ERROR');
                                        }
                                    } else {
                                        resolve('UNKNOWN ERROR');
                                    }
                                }
                            );
                        }
                    }
                );
            });
        });
    }

    return json(await refundPro());
}
