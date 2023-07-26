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
    const ch = (await requestParsed['ch']) as string;

    if (!ch || !token) return json('UNKNOWN ERROR');

    const client = io(SERVER_URL, {
        transports: ['websocket'],
        path: '/fronvo',
    });

    async function applyPro(): Promise<string> {
        return new Promise((resolve) => {
            client.on('connect', () => {
                client.emit(
                    'loginToken',
                    {
                        token,
                    },
                    async ({ err }) => {
                        if (!err) {
                            let proCH: string;

                            const data = (
                                await stripe.charges.list({
                                    limit: 5,
                                })
                            ).data;

                            for (const dataIndex in data) {
                                const target = data[dataIndex];

                                // @ts-ignore
                                if (target.payment_intent == ch) {
                                    // @ts-ignore
                                    proCH = target.id;
                                    break;
                                }
                            }

                            if (!proCH) {
                                return json('UNKNOWN ERROR');
                            } else {
                                client.emit(
                                    'applyPro',
                                    {
                                        secret: import.meta.env.VITE_PRO_SECRET,
                                        proCH,
                                    },
                                    ({ err }) => {
                                        client.emit('logout');

                                        if (!err) {
                                            resolve('OK');
                                        } else {
                                            resolve('UNKNOWN ERROR');
                                        }
                                    }
                                );
                            }
                        }
                    }
                );
            });
        });
    }

    return json(await applyPro());
}
