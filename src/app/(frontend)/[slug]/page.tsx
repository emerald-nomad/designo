import { getPayload } from "payload";
import config from "@/payload/payload.config";

export async function generateStaticParams() {
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "pages",
    select: {
      slug: true,
    },
  });

  return docs.map(({ slug }) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const payload = await getPayload({ config });
  const { slug } = await params;

  console.log({ slug });

  const { docs } = await payload.find({
    collection: "pages",
    limit: 1,
    where: {
      slug: {
        equals: `/${slug}`,
      },
    },
  });

  const page = docs[0];

  return <h1>{page.name}</h1>;
}
