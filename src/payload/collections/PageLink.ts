import { CollectionConfig } from "payload";

export const PageLinksCollection: CollectionConfig = {
  slug: "pageLinks",
  fields: [
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
