import queryString from 'querystring';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function POST({ url }) {
    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',

        body: queryString.stringify({
            grant_type: 'refresh_token',
            refresh_token: url.searchParams.get('refresh_token') || null,
        }),

        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${btoa(
                `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${
                    import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
                }`
            )}`,
        },
    });

    const jsonRes = JSON.parse(await res.text());

    if (!res.ok) {
        return;
    }

    return json({
        access_token: jsonRes.access_token,
        token_type: jsonRes.token_type,
    });
}
