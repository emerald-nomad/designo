import { CollectionConfig } from "payload";

export const PageLinksCollection: CollectionConfig = {
  slug: "pageLinks",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "page",
      type: "relationship",
      relationTo: "pages",
      required: true,
    },
    {
      name: "images",
      type: "group",
      fields: [
        {
          name: "mobileImage",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "tabletImage",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "desktopImage",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};
