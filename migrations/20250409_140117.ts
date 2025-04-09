import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "designo"."pages_blocks_hero_small" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sub_title" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "designo"."_pages_v_blocks_hero_small" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sub_title" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "designo"."pages_blocks_hero_small" ADD CONSTRAINT "pages_blocks_hero_small_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "designo"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "designo"."pages_blocks_hero_small" ADD CONSTRAINT "pages_blocks_hero_small_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "designo"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "designo"."_pages_v_blocks_hero_small" ADD CONSTRAINT "_pages_v_blocks_hero_small_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "designo"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "designo"."_pages_v_blocks_hero_small" ADD CONSTRAINT "_pages_v_blocks_hero_small_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "designo"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_small_order_idx" ON "designo"."pages_blocks_hero_small" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_small_parent_id_idx" ON "designo"."pages_blocks_hero_small" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_small_path_idx" ON "designo"."pages_blocks_hero_small" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_small_background_image_idx" ON "designo"."pages_blocks_hero_small" USING btree ("background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_small_order_idx" ON "designo"."_pages_v_blocks_hero_small" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_small_parent_id_idx" ON "designo"."_pages_v_blocks_hero_small" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_small_path_idx" ON "designo"."_pages_v_blocks_hero_small" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_small_background_image_idx" ON "designo"."_pages_v_blocks_hero_small" USING btree ("background_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "designo"."pages_blocks_hero_small" CASCADE;
  DROP TABLE "designo"."_pages_v_blocks_hero_small" CASCADE;`)
}
