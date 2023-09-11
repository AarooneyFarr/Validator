
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

INSERT INTO "public"."ideas" ("name", "created_at", "slogans", "hero_secondary", "cta_text", "primary_feature_title", "primary_feature_description", "secondary_feature_title", "secondary_feature_description", "faq_title", "cta_name", "cta_button_text") VALUES ('clamshell', '2023-09-11 18:37:24.139793+00', '{"Clamshell is super cool",Clamshell,"is super",cool}', '', '', '', '', '', '', '', '', '');

INSERT INTO "public"."features" ("id", "idea", "title", "description", "summary", "feature_type") VALUES ('08e67d4f-5b93-4dcf-993c-66f76d2ba5f3', 'clamshell', 'Payroll', NULL, 'Keep track of everyone''s salaries and whether or not they''ve been paid. Direct deposit not supported.', 'primary');
INSERT INTO "public"."features" ("id", "idea", "title", "description", "summary", "feature_type") VALUES ('47187dee-3575-4e35-8fa0-ce32532a862a', 'clamshell', 'Claim expenses', NULL, 'All of your receipts organized into one place, as long as you don''t mind typing in the data by hand.', 'primary');
INSERT INTO "public"."features" ("id", "idea", "title", "description", "summary", "feature_type") VALUES ('688473e7-e178-483b-8af3-99c7c24fa545', 'clamshell', 'Clams', NULL, 'Free clams friday means everybody gets to experiece gastrointestinal ecstasy', 'primary');

INSERT INTO "supabase_migrations"."schema_migrations" ("version") VALUES ('20230911174959');

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);

RESET ALL;
