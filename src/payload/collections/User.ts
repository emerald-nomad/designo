import { CollectionConfig } from "payload";

export const UsersCollection: CollectionConfig = {
  slug: "users",
  auth: true,
  fields: [
    {
      name: "role",
      type: "select",
      required: true,
      options: [
        { label: "Admin", value: "admin" },
        { label: "Demo", value: "demo" },
      ],
    },
  ],
  access: {
    read: ({ req: { user } }) => Boolean(user && user.role == "admin"),
    create: ({ req: { user } }) => Boolean(user && user.role == "admin"),
    delete: ({ req: { user } }) => Boolean(user && user.role == "admin"),
    update: ({ req: { user } }) => Boolean(user && user.role == "admin"),
  },
};
