import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "designo"."media" ADD COLUMN "url" varchar;
  ALTER TABLE "designo"."media" ADD COLUMN "thumbnail_u_r_l" varchar;
  ALTER TABLE "designo"."media" ADD COLUMN "filename" varchar;
  ALTER TABLE "designo"."media" ADD COLUMN "mime_type" varchar;
  ALTER TABLE "designo"."media" ADD COLUMN "filesize" numeric;
  ALTER TABLE "designo"."media" ADD COLUMN "width" numeric;
  ALTER TABLE "designo"."media" ADD COLUMN "height" numeric;
  ALTER TABLE "designo"."media" ADD COLUMN "focal_x" numeric;
  ALTER TABLE "designo"."media" ADD COLUMN "focal_y" numeric;
  ALTER TABLE "designo"."header" ADD COLUMN "logo_id" integer NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "designo"."header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "designo"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "designo"."media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "header_logo_idx" ON "designo"."header" USING btree ("logo_id");
  ALTER TABLE "designo"."header" DROP COLUMN IF EXISTS "title";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "designo"."header" DROP CONSTRAINT "header_logo_id_media_id_fk";
  
  DROP INDEX IF EXISTS "media_filename_idx";
  DROP INDEX IF EXISTS "header_logo_idx";
  ALTER TABLE "designo"."header" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "designo"."media" DROP COLUMN IF EXISTS "url";
  ALTER TABLE "designo"."media" DROP COLUMN IF EXISTS "thumbnail_u_r_l";
  ALTER TABLE "designo"."media" DROP COLUMN IF EXISTS "filename";
  ALTER TABLE "designo"."media" DROP COLUMN IF EXISTS "mime_type";
  ALTER TABLE "designo"."media" DROP COLUMN IF EXISTS "filesize";
  ALTER TABLE "designo"."media" DROP COLUMN IF EXISTS "width";
  ALTER TABLE "designo"."media" DROP COLUMN IF EXISTS "height";
  ALTER TABLE "designo"."media" DROP COLUMN IF EXISTS "focal_x";
  ALTER TABLE "designo"."media" DROP COLUMN IF EXISTS "focal_y";
  ALTER TABLE "designo"."header" DROP COLUMN IF EXISTS "logo_id";`)
}
