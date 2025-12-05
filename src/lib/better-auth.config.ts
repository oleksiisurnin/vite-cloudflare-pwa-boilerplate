import { betterAuth } from "better-auth";
import { authConfig } from "@/lib/auth-config";
import Database from "better-sqlite3";

// This file is used ONLY by the Better Auth CLI to generate the schema
const adapter = new Database("./dev-dist/local-auth.db"); // Creates a local file for schema generation

export const auth = betterAuth({
    database: adapter,
    ...authConfig, // Inherit your shared config
});