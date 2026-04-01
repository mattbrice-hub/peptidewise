import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_SOURCES = ["symptom-checker", "protocols"] as const;

export async function POST(request: NextRequest) {
  let body: { firstName?: string; email?: string; source?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const firstName = body.firstName?.trim();
  const email = body.email?.trim().toLowerCase();
  const source = body.source;

  if (!firstName) {
    return NextResponse.json({ error: "First name is required" }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }
  if (!source || !VALID_SOURCES.includes(source as any)) {
    return NextResponse.json({ error: "Invalid source" }, { status: 400 });
  }

  const { error } = await supabase
    .from("peptidewise_leads")
    .upsert(
      { first_name: firstName, email, source },
      { onConflict: "email,source", ignoreDuplicates: true }
    );

  if (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
