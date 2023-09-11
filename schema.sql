
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

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."feature_type" AS ENUM (
    'primary',
    'secondary'
);

ALTER TYPE "public"."feature_type" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE "public"."features" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "idea" "text",
    "title" "text" DEFAULT ''::"text" NOT NULL,
    "description" "text",
    "summary" "text",
    "feature_type" "public"."feature_type" DEFAULT 'primary'::"public"."feature_type" NOT NULL
);

ALTER TABLE "public"."features" OWNER TO "postgres";

CREATE TABLE "public"."ideas" (
    "name" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "slogans" "text"[] DEFAULT '{}'::"text"[] NOT NULL,
    "hero_secondary" "text" DEFAULT ''::"text" NOT NULL,
    "cta_text" "text" DEFAULT ''::"text" NOT NULL,
    "primary_feature_title" "text" DEFAULT ''::"text" NOT NULL,
    "primary_feature_description" "text" DEFAULT ''::"text" NOT NULL,
    "secondary_feature_title" "text" DEFAULT ''::"text" NOT NULL,
    "secondary_feature_description" "text" DEFAULT ''::"text" NOT NULL,
    "faq_title" "text" DEFAULT ''::"text" NOT NULL,
    "cta_name" "text" DEFAULT ''::"text" NOT NULL,
    "cta_button_text" "text" DEFAULT ''::"text" NOT NULL
);

ALTER TABLE "public"."ideas" OWNER TO "postgres";

ALTER TABLE ONLY "public"."features"
    ADD CONSTRAINT "features_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."ideas"
    ADD CONSTRAINT "ideas_pkey" PRIMARY KEY ("name");

ALTER TABLE ONLY "public"."features"
    ADD CONSTRAINT "features_idea_fkey" FOREIGN KEY ("idea") REFERENCES "public"."ideas"("name") ON DELETE CASCADE;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."features" TO "anon";
GRANT ALL ON TABLE "public"."features" TO "authenticated";
GRANT ALL ON TABLE "public"."features" TO "service_role";

GRANT ALL ON TABLE "public"."ideas" TO "anon";
GRANT ALL ON TABLE "public"."ideas" TO "authenticated";
GRANT ALL ON TABLE "public"."ideas" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
