import { json } from '@sveltejs/kit';
import Imagekit from 'imagekit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const requestParsed = await request.json();

    let icon = requestParsed['icon'] as string;
    let isPRO = requestParsed['isPRO'] as boolean;

    const targetEndpoint = !isPRO
        ? import.meta.env.VITE_IMAGEKIT2_ENDPOINT
        : import.meta.env.VITE_IMAGEKIT_ENDPOINT;

    const imagekit = new Imagekit({
        urlEndpoint: targetEndpoint,
        publicKey: !isPRO
            ? import.meta.env.VITE_IMAGEKIT2_PUBLIC
            : import.meta.env.VITE_IMAGEKIT_PUBLIC,
        privateKey: !isPRO
            ? import.meta.env.VITE_IMAGEKIT2_PRIVATE
            : import.meta.env.VITE_IMAGEKIT_PRIVATE,
    });

    // Delete previous icon
    if (!icon.includes(targetEndpoint)) return json('INVALID');

    icon = icon
        .replace(targetEndpoint + '/', '')
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
