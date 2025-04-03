import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "designo"."pages_blocks_attributes_list_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "designo"."pages_blocks_attributes_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "designo"."_pages_v_blocks_attributes_list_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "designo"."_pages_v_blocks_attributes_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "designo"."pages_blocks_attributes_list_list" ADD CONSTRAINT "pages_blocks_attributes_list_list_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "designo"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "designo"."pages_blocks_attributes_list_list" ADD CONSTRAINT "pages_blocks_attributes_list_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "designo"."pages_blocks_attributes_list"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "designo"."pages_blocks_attributes_list" ADD CONSTRAINT "pages_blocks_attributes_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "designo"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "designo"."_pages_v_blocks_attributes_list_list" ADD CONSTRAINT "_pages_v_blocks_attributes_list_list_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "designo"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "designo"."_pages_v_blocks_attributes_list_list" ADD CONSTRAINT "_pages_v_blocks_attributes_list_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "designo"."_pages_v_blocks_attributes_list"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "designo"."_pages_v_blocks_attributes_list" ADD CONSTRAINT "_pages_v_blocks_attributes_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "designo"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_attributes_list_list_order_idx" ON "designo"."pages_blocks_attributes_list_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_attributes_list_list_parent_id_idx" ON "designo"."pages_blocks_attributes_list_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_attributes_list_list_image_idx" ON "designo"."pages_blocks_attributes_list_list" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_attributes_list_order_idx" ON "designo"."pages_blocks_attributes_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_attributes_list_parent_id_idx" ON "designo"."pages_blocks_attributes_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_attributes_list_path_idx" ON "designo"."pages_blocks_attributes_list" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_attributes_list_list_order_idx" ON "designo"."_pages_v_blocks_attributes_list_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_attributes_list_list_parent_id_idx" ON "designo"."_pages_v_blocks_attributes_list_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_attributes_list_list_image_idx" ON "designo"."_pages_v_blocks_attributes_list_list" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_attributes_list_order_idx" ON "designo"."_pages_v_blocks_attributes_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_attributes_list_parent_id_idx" ON "designo"."_pages_v_blocks_attributes_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_attributes_list_path_idx" ON "designo"."_pages_v_blocks_attributes_list" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "designo"."pages_blocks_attributes_list_list" CASCADE;
  DROP TABLE "designo"."pages_blocks_attributes_list" CASCADE;
  DROP TABLE "designo"."_pages_v_blocks_attributes_list_list" CASCADE;
  DROP TABLE "designo"."_pages_v_blocks_attributes_list" CASCADE;`)
}
