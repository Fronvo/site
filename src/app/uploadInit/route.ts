export async function GET(_: Request) {
  return Response.json({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
  });
}
