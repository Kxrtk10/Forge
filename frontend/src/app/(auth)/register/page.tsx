import Link from "next/link";

import { AuthLayout } from "@/components/layout/auth-layout";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AuthDivider } from "@/features/auth/auth-divider";
import { SocialAuth } from "@/features/auth/social-auth";

export default function RegisterPage() {
  return (
    <AuthLayout title="Create your workspace" description="Bring your idea in. Forge will help you sort it out.">
      <SocialAuth />
      <AuthDivider />
      <form className="grid gap-4">
        <Field label="Name">
          <Input placeholder="Maya Chen" autoComplete="name" />
        </Field>
        <Field label="Email">
          <Input type="email" placeholder="founder@company.com" autoComplete="email" />
        </Field>
        <Field label="Password">
          <Input type="password" placeholder="••••••••" autoComplete="new-password" />
        </Field>
        <Button type="submit" className="w-full">
          Create account
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-indigo-200 hover:text-indigo-100">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
