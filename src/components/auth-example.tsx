import { useState } from "react";
import { useSession, signIn, signUp, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export function AuthExample() {
  const { data: session, isPending } = useSession();
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (isPending) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="w-full space-y-6 rounded-lg border bg-card p-6 shadow-sm">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold">
            {isSignUp ? "Create Account" : "Sign In"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {isSignUp
              ? "Enter your details to create a new account"
              : "Enter your credentials to access your account"}
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setError(null);
            setIsLoading(true);

            const formData = new FormData(e.currentTarget);
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            const name = formData.get("name") as string;

            try {
              if (isSignUp) {
                const result = await signUp.email({
                  email,
                  password,
                  name: name || email.split("@")[0],
                });

                if (result.error) {
                  setError(result.error.message || "Failed to sign up");
                }
              } else {
                const result = await signIn.email({
                  email,
                  password,
                });

                if (result.error) {
                  setError(result.error.message || "Failed to sign in");
                }
              }
            } catch (err) {
              setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
              setIsLoading(false);
            }
          }}
          className="space-y-4"
        >
          {isSignUp && (
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading
              ? "Please wait..."
              : isSignUp
                ? "Sign Up"
                : "Sign In"}
          </Button>
        </form>

        <div className="text-center text-sm">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
            }}
            className="text-primary underline-offset-4 hover:underline"
          >
            {isSignUp
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 rounded-lg border bg-card p-6 shadow-sm">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Welcome!</h2>
        <p className="text-sm text-muted-foreground">
          You are signed in as <strong>{session.user.email}</strong>
        </p>
      </div>

      <div className="space-y-2">
        <div className="rounded-md bg-muted p-3 text-sm">
          <div className="font-medium">User ID:</div>
          <div className="text-muted-foreground">{session.user.id}</div>
        </div>
        {session.user.name && (
          <div className="rounded-md bg-muted p-3 text-sm">
            <div className="font-medium">Name:</div>
            <div className="text-muted-foreground">{session.user.name}</div>
          </div>
        )}
      </div>

      <Button onClick={() => signOut()} className="w-full" variant="outline">
        Sign Out
      </Button>
    </div>
  );
}
