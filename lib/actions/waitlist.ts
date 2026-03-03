"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const WaitlistSchema = z.object({
  email: z.string().email("Please provide a valid email address."),
  full_name: z.string().min(2, "Name is too short.").max(100, "Name is too long."),
  role: z.string().min(1, "Please select your role."),
  company: z.string().max(100).optional().nullable(),
  revenue_range: z.string().optional().nullable(),
  aesthetic: z.string().optional(),
  source: z.string().default("home"),
});

export async function joinWaitlist(formData: FormData) {
  const rawData = {
    email: formData.get("email"),
    full_name: formData.get("full_name"),
    role: formData.get("role"),
    company: formData.get("company"),
    revenue_range: formData.get("revenue_range"),
    aesthetic: formData.get("aesthetic"),
    source: formData.get("source"),
  };

  const validatedFields = WaitlistSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return { 
      success: false, 
      message: validatedFields.error.issues[0].message 
    };
  }

  const { email, full_name, role, company, revenue_range, aesthetic, source } = validatedFields.data;

  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("waitlist")
      .insert({ 
        email: email.toLowerCase().trim(),
        full_name: full_name.trim(),
        role: role,
        company: company?.trim() || null,
        revenue_range: revenue_range || null,
        preferences: aesthetic ? { aesthetic } : {},
        source: source
      });

    if (error) {
      if (error.code === "23505") {
        return {
          success: false,
          message: "This email is already on the waitlist!",
        };
      }
      console.error("Waitlist insert error:", error);
      return {
        success: false,
        message: "Something went wrong. Please try again later.",
      };
    }

    return {
      success: true,
      message: "You're on the list! We'll be in touch soon.",
    };
  } catch (err) {
    console.error("Waitlist error:", err);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
