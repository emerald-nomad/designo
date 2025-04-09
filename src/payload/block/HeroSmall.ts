import { Block } from "payload";

export const heroSmall: Block = {
  slug: "heroSmall",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "subTitle",
      type: "text",
      required: true,
    },
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
    },
  ],
};
