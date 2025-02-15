import { db } from "@/configs/db";
import { Users } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const email = req.headers.get("email");
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const userData = await db
      .select()
      .from(Users)
      .where(eq(Users.email, email));

    // Return the actual credits (no fallback to 5 if zero)
    return NextResponse.json({
      credits: userData[0]?.credits || 0, // No default fallback here
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch credits" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { credits, email } = await req.json();

    if (!email || credits === undefined) {
      return NextResponse.json(
        { error: "Email and credits are required" },
        { status: 400 }
      );
    }

    const updatedCredits = Math.max(credits, 0); // Prevent going below zero
    await db
      .update(Users)
      .set({ credits: updatedCredits })
      .where(eq(Users.email, email));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update credits" },
      { status: 500 }
    );
  }
}
