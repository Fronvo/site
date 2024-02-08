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

    if (!token) return json(400);

    const client = io(SERVER_URL, {
        transports: ['websocket'],
        path: '/fronvo',
    });

    async function refundTurbo(): Promise<number> {
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
                                'fetchTurboCH',
                                {
                                    secret: import.meta.env.VITE_TURBO_SECRET,
                                },
                                async ({ err, turboCH }) => {
                                    if (!err) {
                                        try {
                                            const res =
                                                await stripe.refunds.create({
                                                    charge: turboCH,
                                                });

                                            if (res.status == 'succeeded') {
                                                client.emit(
                                                    'refundTurbo',
                                                    {
                                                        secret: import.meta.env
                                                            .VITE_TURBO_SECRET,
                                                    },
                                                    ({ err }) => {
                                                        client.emit('logout');

                                                        if (!err) {
                                                            resolve(200);
                                                        } else {
                                                            resolve(400);
                                                        }
                                                    }
                                                );
                                            }
                                        } catch (e) {
                                            return json(400);
                                        }
                                    } else {
                                        resolve(400);
                                    }
                                }
                            );
                        }
                    }
                );
            });
        });
    }

    return json(await refundTurbo());
}
