ALTER TABLE "vision_missions" ADD COLUMN "vision" text NOT NULL;--> statement-breakpoint
ALTER TABLE "vision_missions" ADD COLUMN "mission" text NOT NULL;--> statement-breakpoint
ALTER TABLE "vision_missions" DROP COLUMN "title";--> statement-breakpoint
ALTER TABLE "vision_missions" DROP COLUMN "type";--> statement-breakpoint
ALTER TABLE "vision_missions" DROP COLUMN "content";--> statement-breakpoint
DROP TYPE "public"."type";