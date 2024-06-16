import ImageKit from "imagekit";

export async function POST(request: Request) {
  const req = await request.json();

  const apiURL = process.env.FRONVO_API_URL;

  // Verify we have access to the folder
  const folderRes = await fetch(`${apiURL}/files/${req.folderId}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: req.token,
    },
  });

  if (folderRes.status == 404) {
    return Response.json({ failure: "Folder not found" });
  } else if (folderRes.status == 400) {
    return Response.json({
      failure: "You don't have access to this folder",
    });
  }

  const folderJson = await folderRes.json();

  // @ts-ignore
  const files = folderJson.files as {}[];

  if (files.length == 200) {
    return Response.json({
      failure: "Maximum files uploaded to this folder (200)",
    });
  }

  const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
  });

  return Response.json({ ...imagekit.getAuthenticationParameters() });
}
