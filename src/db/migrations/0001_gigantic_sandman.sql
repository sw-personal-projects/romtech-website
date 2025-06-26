CREATE TYPE "public"."type" AS ENUM('vision', 'mission');--> statement-breakpoint
CREATE TABLE "team_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"image" varchar NOT NULL,
	"position" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vision_missions" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"type" "type" NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
