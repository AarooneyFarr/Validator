alter table "public"."faqs" drop constraint "faqs_pkey";

drop index if exists "public"."faqs_pkey";

alter table "public"."faqs" add column "id" uuid not null default gen_random_uuid();

alter table "public"."faqs" alter column "idea" set default ''::text;

CREATE UNIQUE INDEX faqs_pkey ON public.faqs USING btree (id);

alter table "public"."faqs" add constraint "faqs_pkey" PRIMARY KEY using index "faqs_pkey";


