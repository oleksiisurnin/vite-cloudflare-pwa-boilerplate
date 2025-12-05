import { createAuth } from "../src/lib/auth.js";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle Better Auth routes
    if (url.pathname.startsWith("/api/auth")) {
      const authEnv = {
        BETTER_AUTH_URL: "VITE_BETTER_AUTH_URL" in env ? env.VITE_BETTER_AUTH_URL : undefined,
        BETTER_AUTH_SECRET: "BETTER_AUTH_SECRET" in env ? env.BETTER_AUTH_SECRET : undefined,
      };
      const auth = createAuth(env.DB, authEnv);
      return auth.handler(request);
    }

    // Handle other API routes
    if (url.pathname.startsWith("/api/")) {
      return Response.json({
        name: "Cloudflare",
      });
    }

    // Let the SPA handle other routes
    return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
