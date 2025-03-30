import { GlobalConfig } from "payload";

export const HeaderGlobal: GlobalConfig = {
  slug: "header",
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
  ],
};
