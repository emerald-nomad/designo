import { CollectionConfig } from "payload";

export const MediaCollection: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: "public",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  access: {
    create: ({ req: { user } }) => Boolean(user && user.role == "admin"),
    delete: ({ req: { user } }) => Boolean(user && user.role == "admin"),
    update: ({ req: { user } }) => Boolean(user && user.role == "admin"),
  },
};
