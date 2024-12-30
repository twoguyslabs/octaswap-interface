import { list } from "@vercel/blob";

export async function GET() {
  const { blobs } = await list({
    prefix: "tokenlist/",
  });
  return Response.json(blobs);
}
