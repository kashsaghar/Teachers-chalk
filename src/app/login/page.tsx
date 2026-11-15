import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Student Login | Teacher's Chalk",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const redirectTo = next && next.startsWith("/") ? next : "/my-courses";

  return (
    <div className="mx-auto max-w-md px-4 py-16 md:px-6">
      <h1 className="text-center text-3xl font-extrabold text-ink">Student Login</h1>
      <p className="mt-2 text-center text-sm text-slate">Sign in to watch your private class recordings.</p>
      <div className="mt-8">
        <Suspense>
          <LoginForm redirectTo={redirectTo} />
        </Suspense>
      </div>
    </div>
  );
}
