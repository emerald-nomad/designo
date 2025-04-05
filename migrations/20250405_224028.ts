import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "designo"."pages_blocks_hero_large" ADD COLUMN "link_page_id" integer;
  ALTER TABLE "designo"."_pages_v_blocks_hero_large" ADD COLUMN "link_page_id" integer;
  DO $$ BEGIN
   ALTER TABLE "designo"."pages_blocks_hero_large" ADD CONSTRAINT "pages_blocks_hero_large_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "designo"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "designo"."_pages_v_blocks_hero_large" ADD CONSTRAINT "_pages_v_blocks_hero_large_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "designo"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_large_link_link_page_idx" ON "designo"."pages_blocks_hero_large" USING btree ("link_page_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_large_link_link_page_idx" ON "designo"."_pages_v_blocks_hero_large" USING btree ("link_page_id");
  ALTER TABLE "designo"."pages_blocks_hero_large" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "designo"."_pages_v_blocks_hero_large" DROP COLUMN IF EXISTS "link_url";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "designo"."pages_blocks_hero_large" DROP CONSTRAINT "pages_blocks_hero_large_link_page_id_pages_id_fk";
  
  ALTER TABLE "designo"."_pages_v_blocks_hero_large" DROP CONSTRAINT "_pages_v_blocks_hero_large_link_page_id_pages_id_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_hero_large_link_link_page_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_hero_large_link_link_page_idx";
  ALTER TABLE "designo"."pages_blocks_hero_large" ADD COLUMN "link_url" varchar;
  ALTER TABLE "designo"."_pages_v_blocks_hero_large" ADD COLUMN "link_url" varchar;
  ALTER TABLE "designo"."pages_blocks_hero_large" DROP COLUMN IF EXISTS "link_page_id";
  ALTER TABLE "designo"."_pages_v_blocks_hero_large" DROP COLUMN IF EXISTS "link_page_id";`)
}
