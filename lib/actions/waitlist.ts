'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';

const WaitlistSchema = z.object({
  email: z.string().email('Please provide a valid email address.'),
  full_name: z
    .string()
    .min(2, 'Name is too short.')
    .max(100, 'Name is too long.'),
  role: z.string().min(1, 'Please select your role.'),
  company: z.string().max(100).optional().nullable(),
  revenue_range: z.string().optional().nullable(),
  aesthetic: z.string().optional(),
  source: z.string().default('home'),
  // UTM attribution fields
  utm_source: z.string().max(100).optional().nullable(),
  utm_medium: z.string().max(100).optional().nullable(),
  utm_campaign: z.string().max(100).optional().nullable(),
  utm_content: z.string().max(100).optional().nullable(),
  utm_term: z.string().max(100).optional().nullable(),
  referrer: z.string().max(500).optional().nullable(),
});

export async function joinWaitlist(formData: FormData) {
  const validatedFields = WaitlistSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.issues[0].message,
    };
  }

  const {
    email,
    full_name,
    role,
    company,
    revenue_range,
    aesthetic,
    source,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term,
    referrer,
  } = validatedFields.data;

  try {
    const supabase = await createClient();

    const payload: any = {
      email: email.toLowerCase().trim(),
      full_name: full_name.trim(),
      role: role,
      preferences: aesthetic ? { aesthetic } : {},
      source: source,
    };

    const trimmedCompany = company?.trim();
    if (trimmedCompany) {
      payload.company = trimmedCompany;
    }

    if (revenue_range) {
      payload.revenue_range = revenue_range;
    }

    const { error } = await supabase.from('waitlist').insert(payload);

    if (error) {
      if (error.code === '23505') {
        return {
          success: false,
          message: 'This email is already on the waitlist!',
        };
      }
      console.error('Waitlist insert error:', error);
      return {
        success: false,
        message: 'Something went wrong. Please try again later.',
      };
    }

    return {
      success: true,
      message: "You're on the list! We'll be in touch soon.",
    };
  } catch (err) {
    console.error('Waitlist error:', err);
    return {
      success: false,
      message: 'Something went wrong. Please try again later.',
    };
  }
}
