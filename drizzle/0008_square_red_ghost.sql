ALTER TABLE "files" ADD COLUMN "id" varchar(255) PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;