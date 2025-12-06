import { env } from "cloudflare:workers";
import { httpServerHandler } from "cloudflare:node";
import express from "express";
import { createAuth } from "./src/lib/auth.js";
import { toNodeHandler } from "better-auth/node";
import apiRouter from "./src/api/index.js";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Handle Better Auth routes
app.use("/api/auth/", (req, res) => {
	const authEnv = {
		BETTER_AUTH_URL: env.VITE_BETTER_AUTH_URL as string | undefined,
		BETTER_AUTH_SECRET: env.BETTER_AUTH_SECRET as string | undefined,
	};
	const auth = createAuth(env.DB, authEnv);
	return toNodeHandler(auth)(req, res);
});

// Handle other API routes
app.use("/api", apiRouter);

const PORT = 3000;

// @ts-ignore
if (globalThis.__server) {
	// @ts-ignore
	globalThis.__server.close();
}

const server = app.listen(PORT);
// @ts-ignore
globalThis.__server = server;

export default httpServerHandler({ port: PORT });