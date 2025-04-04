import { GlobalConfig } from "payload";

export const FooterGlobal: GlobalConfig = {
  slug: "footer",
  fields: [
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "navItems",
      type: "array",
      fields: [
        {
          name: "page",
          type: "relationship",
          relationTo: "pages",
        },
      ],
    },
    {
      name: "cta",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "info",
          type: "text",
          required: true,
        },
        {
          name: "link",
          type: "group",
          fields: [
            {
              name: "text",
              type: "text",
              required: true,
            },
            {
              name: "url",
              type: "relationship",
              relationTo: "pages",
              required: true,
            },
          ],
        },
        {
          name: "pages",
          type: "relationship",
          relationTo: "pages",
          hasMany: true,
          required: true,
        },
      ],
    },
    {
      name: "address",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "addressLine1",
          type: "text",
          required: true,
        },
        {
          name: "addressLine2",
          type: "text",
        },
        {
          name: "city",
          type: "text",
          required: true,
        },
        {
          name: "state",
          type: "text",
          required: true,
        },
        {
          name: "zip",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "contactUs",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "phone",
          type: "text",
          required: true,
        },
        {
          name: "email",
          type: "text",
          required: true,
        },
      ],
    },
  ],
  access: {
    update: ({ req: { user } }) => Boolean(user && user.role === "admin"),
  },
};
