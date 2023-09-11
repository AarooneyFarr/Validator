create table "public"."faqs" (
    "idea" text not null,
    "question" text not null default ''::text,
    "answer" text not null default ''::text,
    "column" smallint not null default '1'::smallint
);


CREATE UNIQUE INDEX faqs_pkey ON public.faqs USING btree (idea);

alter table "public"."faqs" add constraint "faqs_pkey" PRIMARY KEY using index "faqs_pkey";

alter table "public"."faqs" add constraint "faqs_idea_fkey" FOREIGN KEY (idea) REFERENCES ideas(name) ON DELETE CASCADE not valid;

alter table "public"."faqs" validate constraint "faqs_idea_fkey";


