/**
 * One-time bootstrap: creates (or promotes) the first admin account.
 * Run after supabase/schema.sql has been applied.
 *
 * Usage: node --env-file=.env.local --import tsx scripts/create-admin.ts <email> <password>
 */
import { createClient } from "@supabase/supabase-js";

const [, , email, password] = process.argv;

if (!email || !password) {
  console.error("Usage: npm run create-admin -- <email> <password>");
  process.exit(1);
}

async function main() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { data: existing } = await supabase.auth.admin.listUsers();
  const already = existing?.users.find((u) => u.email === email);

  let userId: string;

  if (already) {
    userId = already.id;
    console.log(`User already exists (${userId}), promoting to admin...`);
  } else {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (error) throw error;
    userId = data.user.id;
    console.log(`Created user ${userId}`);
  }

  const { error: updateError } = await supabase.from("profiles").update({ role: "admin" }).eq("id", userId);
  if (updateError) throw updateError;

  console.log(`${email} is now an admin. Log in at /login.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
