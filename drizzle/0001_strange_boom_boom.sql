ALTER TABLE "users" DROP CONSTRAINT "users_clerk_id_unique";--> statement-breakpoint
ALTER TABLE "songs" DROP CONSTRAINT "songs_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "songs" ADD COLUMN "userId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "songs" ADD COLUMN "createdAt" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "clerkId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "firstName" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "lastName" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "createdAt" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "songs" ADD CONSTRAINT "songs_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "songs" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "songs" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "clerk_id";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "first_name";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "last_name";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "created_at";