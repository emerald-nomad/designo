import { Block } from "payload";

export const pageLinkList: Block = {
  slug: "pageLinkList",
  fields: [
    {
      name: "links",
      type: "array",
      required: true,
      fields: [
        {
          name: "link",
          type: "relationship",
          relationTo: "pageLinks",
          required: true,
        },
      ],
    },
  ],
};
