import Link from "next/link";

import { AuthLayout } from "@/components/layout/auth-layout";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AuthDivider } from "@/features/auth/auth-divider";
import { SocialAuth } from "@/features/auth/social-auth";

export default function LoginPage() {
  return (
    <AuthLayout title="Welcome back" description="Pick up where your idea left off.">
      <SocialAuth />
      <AuthDivider />
      <form className="grid gap-4">
        <Field label="Email">
          <Input type="email" placeholder="founder@company.com" autoComplete="email" />
        </Field>
        <Field label="Password">
          <Input type="password" placeholder="••••••••" autoComplete="current-password" />
        </Field>
        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-sm text-indigo-200 hover:text-indigo-100">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" className="w-full">
          Log in
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        New to Forge?{" "}
        <Link href="/register" className="text-indigo-200 hover:text-indigo-100">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
