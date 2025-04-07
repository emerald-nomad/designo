import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "designo"."footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL,
  	"icon_id" integer NOT NULL,
  	"open_in_new_tab" boolean
  );
  
  ALTER TABLE "designo"."media" ALTER COLUMN "prefix" SET DEFAULT '/designo-local';
  DO $$ BEGIN
   ALTER TABLE "designo"."footer_social_links" ADD CONSTRAINT "footer_social_links_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "designo"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "designo"."footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "designo"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "footer_social_links_order_idx" ON "designo"."footer_social_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_social_links_parent_id_idx" ON "designo"."footer_social_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_social_links_icon_idx" ON "designo"."footer_social_links" USING btree ("icon_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "designo"."footer_social_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "designo"."footer_social_links" CASCADE;
  ALTER TABLE "designo"."media" ALTER COLUMN "prefix" SET DEFAULT 'designo-local';`)
}
