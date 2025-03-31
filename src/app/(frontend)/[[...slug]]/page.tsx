import { getPayload } from "payload";
import config from "@/payload/payload.config";
import { notFound } from "next/navigation";
import PageBuilder from "@/components/Pagebuilder";

export const revalidate = 900;
export const dynamicParams = true;

export async function generateStaticParams() {
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "pages",
    select: {
      slug: true,
    },
  });

  return docs.map(({ slug }) => ({ slug: [slug] }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const payload = await getPayload({ config });
  const { slug } = await params;

  const { docs } = await payload.find({
    collection: "pages",
    limit: 1,
    where: {
      slug: {
        equals: slug ? `/${slug.join("/")}` : "/",
      },
    },
  });

  const page = docs[0];

  if (!page) {
    return notFound();
  }

  return page.content && <PageBuilder content={page.content} />;
}
