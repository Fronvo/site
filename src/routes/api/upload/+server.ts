import { json } from '@sveltejs/kit';
import Imagekit from 'imagekit';
import { v4 } from 'uuid';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const requestParsed = await request.json();

    const file = requestParsed['file'] as string;
    const width = requestParsed['width'] as number;
    const height = requestParsed['height'] as number;
    const noTransform = requestParsed['noTransform'] as boolean;

    const imagekit = new Imagekit({
        urlEndpoint: import.meta.env.VITE_IMAGEKIT_ENDPOINT,
        publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC,
        privateKey: import.meta.env.VITE_IMAGEKIT_PRIVATE,
    });

    const result = await imagekit.upload({
        file,
        fileName: v4(),
    });

    let finalIcon: string;

    if (noTransform) {
        finalIcon = imagekit.url({
            src: result.url,
        });
    } else {
        finalIcon = imagekit.url({
            src: result.url,
            transformation: [
                {
                    width: width ? width : 128,
                    height: height ? height : 128,
                },
            ],
        });
    }

    return json(finalIcon);
}
