import { list } from "@vercel/blob";

export async function GET() {
  const { blobs } = await list({
    prefix: "logos/",
  });
  return Response.json(blobs);
}
