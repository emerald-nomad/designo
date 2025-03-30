import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { buildConfig } from "payload";
import sharp from "sharp";

import { migrations } from "../../migrations";
import {
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { MediaCollection } from "./collections/Media";
import { PagesCollections } from "./collections/Page";
import { HeaderGlobal } from "./globals/Header";

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "",
  globals: [HeaderGlobal],
  collections: [MediaCollection, PagesCollections],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      FixedToolbarFeature(),
    ],
  }),
  db: vercelPostgresAdapter({
    migrationDir: "migrations",
    prodMigrations: migrations,
    schemaName: "designo",
  }),
  sharp,
  typescript: {
    autoGenerate: true,
    outputFile: "./src/payload/payload-types.ts",
  },
});
