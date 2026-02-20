import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";
import { welcomeEmailHtml } from "@/emails/welcome.html";

export const runtime = "nodejs"; // important: ensures Node runtime

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        {
          error:
            "Missing RESEND_API_KEY (check .env.local and restart dev server)",
        },
        { status: 500 },
      );
    }

    const result = await resend.emails.send({
      from: "Selfinity <no-reply@selfinity.ai>",
      to: ["liuyuqi1012@gmail.com"],
      subject: "Thank you for applying to Selfinity",
      html: welcomeEmailHtml("Yuqi Liu"),
    });

    if (result.error) {
      return NextResponse.json(result.error, { status: 400 });
    }

    return NextResponse.json(result.data);
  } catch (e: any) {
    console.error("Send email crashed:", e);
    return NextResponse.json(
      { error: e?.message ?? "Unknown server error", stack: e?.stack },
      { status: 500 },
    );
  }
}
