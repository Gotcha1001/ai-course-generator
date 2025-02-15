import { eq } from "drizzle-orm";
import { db } from "@/configs/db";
import { Users } from "@/configs/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("POST request received for user verification");

    const requestBody = await req.json();
    const { user } = requestBody;

    if (!user) {
      return NextResponse.json(
        { error: "User data is missing" },
        { status: 400 }
      );
    }

    const userEmail = user?.primaryEmailAddress?.emailAddress;

    if (!userEmail) {
      return NextResponse.json(
        { error: "User email is required" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await db
      .select()
      .from(Users)
      .where(eq(Users.email, userEmail));

    if (existingUser.length === 0) {
      // Create new user with 5 default credits
      const newUser = await db
        .insert(Users)
        .values({
          name: user?.fullName || "Unknown User",
          email: userEmail,
          imageUrl: user?.imageUrl || "/default-avatar.png",
          credits: 5, // Default credits
        })
        .returning();

      return NextResponse.json({ result: newUser[0] });
    }

    return NextResponse.json({ result: existingUser[0] });
  } catch (error) {
    console.error("Error in user verification:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
