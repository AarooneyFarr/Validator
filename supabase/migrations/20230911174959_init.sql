create type "public"."feature_type" as enum ('primary', 'secondary');

create table "public"."features" (
    "id" uuid not null default gen_random_uuid(),
    "idea" text,
    "title" text not null default ''::text,
    "description" text,
    "summary" text,
    "feature_type" feature_type not null default 'primary'::feature_type
);


create table "public"."ideas" (
    "name" text not null,
    "created_at" timestamp with time zone default now(),
    "slogans" text[] not null default '{}'::text[],
    "hero_secondary" text not null default ''::text,
    "cta_text" text not null default ''::text,
    "primary_feature_title" text not null default ''::text,
    "primary_feature_description" text not null default ''::text,
    "secondary_feature_title" text not null default ''::text,
    "secondary_feature_description" text not null default ''::text,
    "faq_title" text not null default ''::text
);


CREATE UNIQUE INDEX features_pkey ON public.features USING btree (id);

CREATE UNIQUE INDEX ideas_pkey ON public.ideas USING btree (name);

alter table "public"."features" add constraint "features_pkey" PRIMARY KEY using index "features_pkey";

alter table "public"."ideas" add constraint "ideas_pkey" PRIMARY KEY using index "ideas_pkey";

alter table "public"."features" add constraint "features_idea_fkey" FOREIGN KEY (idea) REFERENCES ideas(name) ON DELETE CASCADE not valid;

alter table "public"."features" validate constraint "features_idea_fkey";


