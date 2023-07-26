import { json } from '@sveltejs/kit';
import Imagekit from 'imagekit';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    // PRO for mobile
    // Possibly rethink at the start to prevent overflows
    const imagekit = new Imagekit({
        urlEndpoint: import.meta.env.VITE_IMAGEKIT_ENDPOINT,
        publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC,
        privateKey: import.meta.env.VITE_IMAGEKIT_PRIVATE,
    });

    return json(imagekit.getAuthenticationParameters());
}
