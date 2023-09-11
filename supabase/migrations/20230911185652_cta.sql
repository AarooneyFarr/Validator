alter table "public"."features" add column "image" text;

alter table "public"."ideas" add column IF NOT EXISTS "cta_button_text" text not null default ''::text;

alter table "public"."ideas" add column IF NOT EXISTS "cta_name" text not null default ''::text;


