import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "designo"."pages_blocks_page_link_list_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "designo"."pages_blocks_page_link_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "designo"."_pages_v_blocks_page_link_list_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "designo"."_pages_v_blocks_page_link_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "designo"."page_links" ADD COLUMN "name" varchar NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "designo"."pages_blocks_page_link_list_links" ADD CONSTRAINT "pages_blocks_page_link_list_links_link_id_page_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "designo"."page_links"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "designo"."pages_blocks_page_link_list_links" ADD CONSTRAINT "pages_blocks_page_link_list_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "designo"."pages_blocks_page_link_list"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "designo"."pages_blocks_page_link_list" ADD CONSTRAINT "pages_blocks_page_link_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "designo"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "designo"."_pages_v_blocks_page_link_list_links" ADD CONSTRAINT "_pages_v_blocks_page_link_list_links_link_id_page_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "designo"."page_links"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "designo"."_pages_v_blocks_page_link_list_links" ADD CONSTRAINT "_pages_v_blocks_page_link_list_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "designo"."_pages_v_blocks_page_link_list"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "designo"."_pages_v_blocks_page_link_list" ADD CONSTRAINT "_pages_v_blocks_page_link_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "designo"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_link_list_links_order_idx" ON "designo"."pages_blocks_page_link_list_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_link_list_links_parent_id_idx" ON "designo"."pages_blocks_page_link_list_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_link_list_links_link_idx" ON "designo"."pages_blocks_page_link_list_links" USING btree ("link_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_link_list_order_idx" ON "designo"."pages_blocks_page_link_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_link_list_parent_id_idx" ON "designo"."pages_blocks_page_link_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_link_list_path_idx" ON "designo"."pages_blocks_page_link_list" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_link_list_links_order_idx" ON "designo"."_pages_v_blocks_page_link_list_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_link_list_links_parent_id_idx" ON "designo"."_pages_v_blocks_page_link_list_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_link_list_links_link_idx" ON "designo"."_pages_v_blocks_page_link_list_links" USING btree ("link_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_link_list_order_idx" ON "designo"."_pages_v_blocks_page_link_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_link_list_parent_id_idx" ON "designo"."_pages_v_blocks_page_link_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_page_link_list_path_idx" ON "designo"."_pages_v_blocks_page_link_list" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "designo"."pages_blocks_page_link_list_links" CASCADE;
  DROP TABLE "designo"."pages_blocks_page_link_list" CASCADE;
  DROP TABLE "designo"."_pages_v_blocks_page_link_list_links" CASCADE;
  DROP TABLE "designo"."_pages_v_blocks_page_link_list" CASCADE;
  ALTER TABLE "designo"."page_links" DROP COLUMN IF EXISTS "name";`)
}
