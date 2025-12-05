import { useSession, signIn, signUp, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export function AuthExample() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Sign In</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            const result = await signIn.email({
              email,
              password,
            });

            if (result.error) {
              alert(result.error.message);
            }
          }}
          className="space-y-2"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded"
          />
          <Button type="submit">Sign In</Button>
        </form>
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={async () => {
              const email = prompt("Email:");
              const password = prompt("Password:");
              if (email && password) {
                const result = await signUp.email({
                  email,
                  password,
                  name: email.split("@")[0],
                });
                if (result.error) {
                  alert(result.error.message);
                }
              }
            }}
            className="text-blue-600 underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Welcome!</h2>
      <p>Signed in as: {session.user.email}</p>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
}
