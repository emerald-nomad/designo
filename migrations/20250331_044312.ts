import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "designo"."page_links" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"page_id" integer NOT NULL,
  	"images_mobile_image_id" integer NOT NULL,
  	"images_tablet_image_id" integer NOT NULL,
  	"images_desktop_image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "designo"."payload_locked_documents_rels" ADD COLUMN "page_links_id" integer;
  DO $$ BEGIN
   ALTER TABLE "designo"."page_links" ADD CONSTRAINT "page_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "designo"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "designo"."page_links" ADD CONSTRAINT "page_links_images_mobile_image_id_media_id_fk" FOREIGN KEY ("images_mobile_image_id") REFERENCES "designo"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "designo"."page_links" ADD CONSTRAINT "page_links_images_tablet_image_id_media_id_fk" FOREIGN KEY ("images_tablet_image_id") REFERENCES "designo"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "designo"."page_links" ADD CONSTRAINT "page_links_images_desktop_image_id_media_id_fk" FOREIGN KEY ("images_desktop_image_id") REFERENCES "designo"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "page_links_page_idx" ON "designo"."page_links" USING btree ("page_id");
  CREATE INDEX IF NOT EXISTS "page_links_images_images_mobile_image_idx" ON "designo"."page_links" USING btree ("images_mobile_image_id");
  CREATE INDEX IF NOT EXISTS "page_links_images_images_tablet_image_idx" ON "designo"."page_links" USING btree ("images_tablet_image_id");
  CREATE INDEX IF NOT EXISTS "page_links_images_images_desktop_image_idx" ON "designo"."page_links" USING btree ("images_desktop_image_id");
  CREATE INDEX IF NOT EXISTS "page_links_updated_at_idx" ON "designo"."page_links" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "page_links_created_at_idx" ON "designo"."page_links" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "designo"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_page_links_fk" FOREIGN KEY ("page_links_id") REFERENCES "designo"."page_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_page_links_id_idx" ON "designo"."payload_locked_documents_rels" USING btree ("page_links_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "designo"."page_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "designo"."page_links" CASCADE;
  ALTER TABLE "designo"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_page_links_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_page_links_id_idx";
  ALTER TABLE "designo"."payload_locked_documents_rels" DROP COLUMN IF EXISTS "page_links_id";`)
}
