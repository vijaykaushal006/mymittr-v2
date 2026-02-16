import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase
      .from("contact_enquiries")
      .insert([
        {
          name: body.name,
          email: body.email,
          phone: body.phone,
          role: body.role,
          subject: body.subject,
          message: body.message,
        },
      ]);

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Thank you! We have received your message and will contact you within 24 hours.",
    });

  } catch {
    return NextResponse.json(
      { success: false, message: "Server error occurred." },
      { status: 500 }
    );
  }
}