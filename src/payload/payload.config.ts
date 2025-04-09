import { buildConfig } from "payload";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import {
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { migrations } from "../../migrations";
import { HeaderGlobal } from "./globals/Header";
import { heroLarge } from "./block/HeroLarge";
import { MediaCollection } from "./collections/Media";
import { PagesCollections } from "./collections/Page";
import { PageLinksCollection } from "./collections/PageLink";
import { pageLinkList } from "./block/PageLinkList";
import { attributesList } from "./block/AttributesList";
import { FooterGlobal } from "./globals/Footer";
import { UsersCollection } from "./collections/User";
import { heroSmall } from "./block/HeroSmall";
import { projectCardList } from "./block/ProjectCardList";

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "",
  globals: [HeaderGlobal, FooterGlobal],
  collections: [
    MediaCollection,
    PagesCollections,
    PageLinksCollection,
    UsersCollection,
  ],
  blocks: [attributesList, heroLarge, heroSmall, pageLinkList, projectCardList],
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
  plugins: [
    vercelBlobStorage({
      cacheControlMaxAge: 60 * 60 * 24 * 365, // 1 year
      collections: {
        media: {
          generateFileURL: ({ filename, prefix }) =>
            `https://${process.env.BLOB_STORE_ID}.public.blob.vercel-storage.com/${prefix?.replace("/", "")}/${filename}`,
          prefix: process.env.BLOB_PREFIX as string,
        },
      },
      enabled: Boolean(process.env.BLOB_STORAGE_ENABLED) || false,
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
  sharp,
  typescript: {
    autoGenerate: true,
    outputFile: "./src/payload/payload-types.ts",
  },
});
