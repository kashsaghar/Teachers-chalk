import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");
  const redirectTo = next && next.startsWith("/") ? next : "/my-courses";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      if (process.env.NODE_ENV === "development" || !forwardedHost) {
        return NextResponse.redirect(`${origin}${redirectTo}`);
      }
      return NextResponse.redirect(`https://${forwardedHost}${redirectTo}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=oauth`);
}
