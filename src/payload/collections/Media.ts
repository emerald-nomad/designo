import { CollectionConfig } from "payload";

export const MediaCollection: CollectionConfig = {
  slug: "media",
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
