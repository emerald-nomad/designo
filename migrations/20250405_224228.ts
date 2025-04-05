import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "designo"."footer" DROP CONSTRAINT "footer_cta_link_url_id_pages_id_fk";
  
  DROP INDEX IF EXISTS "footer_cta_link_cta_link_url_idx";
  ALTER TABLE "designo"."footer" ADD COLUMN "cta_link_page_id" integer NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "designo"."footer" ADD CONSTRAINT "footer_cta_link_page_id_pages_id_fk" FOREIGN KEY ("cta_link_page_id") REFERENCES "designo"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "footer_cta_link_cta_link_page_idx" ON "designo"."footer" USING btree ("cta_link_page_id");
  ALTER TABLE "designo"."footer" DROP COLUMN IF EXISTS "cta_link_url_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "designo"."footer" DROP CONSTRAINT "footer_cta_link_page_id_pages_id_fk";
  
  DROP INDEX IF EXISTS "footer_cta_link_cta_link_page_idx";
  ALTER TABLE "designo"."footer" ADD COLUMN "cta_link_url_id" integer NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "designo"."footer" ADD CONSTRAINT "footer_cta_link_url_id_pages_id_fk" FOREIGN KEY ("cta_link_url_id") REFERENCES "designo"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "footer_cta_link_cta_link_url_idx" ON "designo"."footer" USING btree ("cta_link_url_id");
  ALTER TABLE "designo"."footer" DROP COLUMN IF EXISTS "cta_link_page_id";`)
}
