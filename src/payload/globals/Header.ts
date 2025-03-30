import { revalidateLayout } from "@/actions/revalidateLayout";
import { GlobalAfterChangeHook, GlobalConfig } from "payload";

const afterChangeHook: GlobalAfterChangeHook = async ({ doc }) => {
  await revalidateLayout();

  return doc;
};

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
  hooks: {
    afterChange: [afterChangeHook],
  },
};
