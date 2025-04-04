import { CollectionConfig } from "payload";

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
      blockReferences: ["attributesList", "heroLarge", "pageLinkList"],
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
};
