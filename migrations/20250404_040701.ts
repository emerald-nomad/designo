import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "designo"."enum_users_role" AS ENUM('admin', 'demo');
  CREATE TABLE IF NOT EXISTS "designo"."footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"page_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "designo"."footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"cta_title" varchar NOT NULL,
  	"cta_info" varchar NOT NULL,
  	"cta_link_text" varchar NOT NULL,
  	"cta_link_url_id" integer NOT NULL,
  	"address_title" varchar NOT NULL,
  	"address_address_line1" varchar NOT NULL,
  	"address_address_line2" varchar,
  	"address_city" varchar NOT NULL,
  	"address_state" varchar NOT NULL,
  	"address_zip" varchar NOT NULL,
  	"contact_us_title" varchar NOT NULL,
  	"contact_us_phone" varchar NOT NULL,
  	"contact_us_email" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "designo"."footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  ALTER TABLE "designo"."users" ADD COLUMN "role" "designo"."enum_users_role" NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "designo"."footer_nav_items" ADD CONSTRAINT "footer_nav_items_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "designo"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "designo"."footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "designo"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "designo"."footer" ADD CONSTRAINT "footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "designo"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "designo"."footer" ADD CONSTRAINT "footer_cta_link_url_id_pages_id_fk" FOREIGN KEY ("cta_link_url_id") REFERENCES "designo"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "designo"."footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "designo"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "designo"."footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "designo"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "footer_nav_items_order_idx" ON "designo"."footer_nav_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_nav_items_parent_id_idx" ON "designo"."footer_nav_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_nav_items_page_idx" ON "designo"."footer_nav_items" USING btree ("page_id");
  CREATE INDEX IF NOT EXISTS "footer_logo_idx" ON "designo"."footer" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "footer_cta_link_cta_link_url_idx" ON "designo"."footer" USING btree ("cta_link_url_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_order_idx" ON "designo"."footer_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "footer_rels_parent_idx" ON "designo"."footer_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_path_idx" ON "designo"."footer_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "footer_rels_pages_id_idx" ON "designo"."footer_rels" USING btree ("pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "designo"."footer_nav_items" CASCADE;
  DROP TABLE "designo"."footer" CASCADE;
  DROP TABLE "designo"."footer_rels" CASCADE;
  ALTER TABLE "designo"."users" DROP COLUMN IF EXISTS "role";
  DROP TYPE "designo"."enum_users_role";`)
}
