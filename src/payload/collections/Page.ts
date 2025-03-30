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
  ],
  versions: {
    drafts: true,
  },
};
