import Link from "next/link";

import { AuthLayout } from "@/components/layout/auth-layout";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout title="Reset password" description="Enter your email and we will send a link to help you get back in.">
      <form className="grid gap-4">
        <Field label="Email">
          <Input type="email" placeholder="founder@company.com" autoComplete="email" />
        </Field>
        <Button type="submit" className="w-full">
          Send reset link
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Remembered it?{" "}
        <Link href="/login" className="text-indigo-200 hover:text-indigo-100">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
