import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "designo"."pages_blocks_hero_large" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sub_title" varchar,
  	"link_text" varchar,
  	"link_url" varchar,
  	"link_open_in_new_tab" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "designo"."_pages_v_blocks_hero_large" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sub_title" varchar,
  	"link_text" varchar,
  	"link_url" varchar,
  	"link_open_in_new_tab" boolean,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "designo"."pages_blocks_hero_large" ADD CONSTRAINT "pages_blocks_hero_large_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "designo"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "designo"."_pages_v_blocks_hero_large" ADD CONSTRAINT "_pages_v_blocks_hero_large_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "designo"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_large_order_idx" ON "designo"."pages_blocks_hero_large" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_large_parent_id_idx" ON "designo"."pages_blocks_hero_large" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_large_path_idx" ON "designo"."pages_blocks_hero_large" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_large_order_idx" ON "designo"."_pages_v_blocks_hero_large" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_large_parent_id_idx" ON "designo"."_pages_v_blocks_hero_large" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_large_path_idx" ON "designo"."_pages_v_blocks_hero_large" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "designo"."pages_blocks_hero_large" CASCADE;
  DROP TABLE "designo"."_pages_v_blocks_hero_large" CASCADE;`)
}
