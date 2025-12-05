import { betterAuth } from "better-auth";
import { createD1Adapter } from "./d1-adapter";
import type { D1Database } from "@cloudflare/workers-types";
import { authConfig } from "@/lib/auth-config";

export function createAuth(db: D1Database, env?: { BETTER_AUTH_URL?: string; BETTER_AUTH_SECRET?: string }) {
	return betterAuth({
		database: {
			db: createD1Adapter(db),
			type: "sqlite",
		},
		...authConfig,
		baseURL: env?.BETTER_AUTH_URL || "http://localhost:8787",
		secret: env?.BETTER_AUTH_SECRET || "change-me-in-production",
	});
}
