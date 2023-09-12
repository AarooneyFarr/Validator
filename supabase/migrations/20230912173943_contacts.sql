create table "public"."contacts" (
    "id" uuid not null default gen_random_uuid(),
    "idea" text not null,
    "created_at" timestamp with time zone default now(),
    "first_name" text not null default ''::text,
    "last_name" text not null default ''::text,
    "email" text not null default ''::text,
    "source" text not null default ''::text
);


CREATE UNIQUE INDEX contacts_pkey ON public.contacts USING btree (id);

alter table "public"."contacts" add constraint "contacts_pkey" PRIMARY KEY using index "contacts_pkey";

alter table "public"."contacts" add constraint "contacts_idea_fkey" FOREIGN KEY (idea) REFERENCES ideas(name) ON DELETE CASCADE not valid;

alter table "public"."contacts" validate constraint "contacts_idea_fkey";


