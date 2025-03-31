import { Block } from "payload";

export const heroLarge: Block = {
  slug: "heroLarge",
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
          type: "text",
          required: true,
        },
        {
          name: "openInNewTab",
          type: "checkbox",
        },
      ],
    },
  ],
};
