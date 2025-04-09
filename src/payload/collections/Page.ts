import { CollectionAfterChangeHook, CollectionConfig } from "payload";
import { Page } from "../payload-types";
import { revalidatePage } from "@/actions/revalidatePage";

const afterChangeHook: CollectionAfterChangeHook<Page> = async ({ doc }) => {
  await revalidatePage(doc.slug);

  return doc;
};

export const PagesCollections: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "blocks",
      blocks: [],
      blockReferences: [
        "attributesList",
        "heroLarge",
        "heroSmall",
        "pageLinkList",
      ],
    },
  ],
  versions: {
    drafts: true,
  },
  access: {
    create: ({ req: { user } }) => Boolean(user && user.role == "admin"),
    delete: ({ req: { user } }) => Boolean(user && user.role == "admin"),
    update: ({ req: { user } }) => Boolean(user && user.role == "admin"),
  },
  hooks: {
    afterChange: [afterChangeHook],
  },
};
