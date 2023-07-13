import { json } from '@sveltejs/kit';
import Imagekit from 'imagekit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const requestParsed = await request.json();

    let icon = requestParsed['icon'] as string;

    const imagekit = new Imagekit({
        urlEndpoint: import.meta.env.VITE_IMAGEKIT_ENDPOINT,
        publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC,
        privateKey: import.meta.env.VITE_IMAGEKIT_PRIVATE,
    });

    // Delete previous icon
    if (!icon.includes(import.meta.env.VITE_IMAGEKIT_ENDPOINT))
        return json('INVALID');

    icon = icon
        .replace(import.meta.env.VITE_IMAGEKIT_ENDPOINT + '/', '')
        .replace(/\?updatedAt=[a-z0-9]+/, '')
        .replace(/\?tr=[a-zA-Z0-9%-]+/, '');

    const prevResult = await imagekit.listFiles({
        name: icon,
        limit: 1,
    });

    if (prevResult) {
        await imagekit.deleteFile(prevResult[0].fileId);
    }

    return json('OK');
}
