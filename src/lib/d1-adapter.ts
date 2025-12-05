import { Kysely } from "kysely";
import { D1Dialect } from "kysely-d1";
import type { D1Database } from "@cloudflare/workers-types";

/**
 * D1 Database Adapter for Better Auth using Kysely
 * This adapter creates a Kysely instance that works with Cloudflare D1
 */
export function createD1Adapter(db: D1Database) {
	return new Kysely<Record<string, unknown>>({
		dialect: new D1Dialect({
			database: db,
		}),
	});
}
