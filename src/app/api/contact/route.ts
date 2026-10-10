import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

/**
 * OE BUSINESS — institutional contact reception.
 *
 * Messages submitted from the site are validated and PERSISTED to the
 * database (ContactMessage table), where Oscar & Eduardo can read them
 * (e.g. `bun run db:studio` in development, or any admin/CRM sync later).
 * To forward them to an inbox instead, set an email provider (Resend,
 * SES…) and call it right after the persistence step below.
 */

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z
    .string()
    .trim()
    .min(5)
    .max(120)
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Invalid email"),
  message: z.string().trim().min(10).max(2000),
  /** Honeypot: must stay empty. */
  company: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION" },
        { status: 400 },
      );
    }

    const { name, email, message } = parsed.data;

    // Silent accept for honeypot hits (pretend success, store nothing).
    if (parsed.data.company) {
      return NextResponse.json({ ok: true });
    }

    const saved = await db.contactMessage.create({
      data: { name, email, message },
    });

    return NextResponse.json({ ok: true, id: saved.id });
  } catch (error) {
    console.error("[/api/contact]", error);
    return NextResponse.json(
      { ok: false, error: "SERVER" },
      { status: 500 },
    );
  }
}
