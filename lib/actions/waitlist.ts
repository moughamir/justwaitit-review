'use server';

import { after } from 'next/server';
import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';

const WaitlistSchema = z.object({
  email: z.string().email('Please provide a valid email address.'),
  full_name: z
    .string()
    .min(2, 'Name is too short.')
    .max(100, 'Name is too long.'),
  role: z.string().min(1, 'Please select your role.'),
  company: z
    .string()
    .max(100)
    .optional()
    .nullable()
    .transform((val) => (val?.trim() === '' ? null : val)),
  revenue_range: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val?.trim() === '' ? null : val)),
  aesthetic: z.string().optional(),
  source: z.string().default('home'),
});

/**
 * Fire-and-forget: create/update Brevo contact + send a welcome event.
 * Silently skips if BREVO_API_KEY is not set.
 */
async function triggerBrevoWelcome(
  email: string,
  firstName: string
): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn('[Brevo] BREVO_API_KEY is not set — skipping welcome trigger');
    return;
  }

  try {
    // Upsert the contact into Brevo
    await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email,
        attributes: { FIRSTNAME: firstName },
        // Add to the Anaqio waitlist list if BREVO_LIST_ID is configured
        ...(process.env.BREVO_LIST_ID
          ? { listIds: [Number(process.env.BREVO_LIST_ID)] }
          : {}),
        updateEnabled: true,
      }),
    });
  } catch (err) {
    // Non-fatal — Brevo failure must never block the user
    console.error('[Brevo] Failed to trigger welcome sequence:', err);
  }
}

export async function joinWaitlist(formData: FormData) {
  const rawData = {
    email: formData.get('email')?.toString().trim() ?? '',
    full_name: formData.get('full_name')?.toString().trim() ?? '',
    role: formData.get('role')?.toString().trim() ?? '',
    company: formData.get('company')?.toString().trim() ?? null,
    revenue_range: formData.get('revenue_range')?.toString().trim() ?? null,
    aesthetic: formData.get('aesthetic')?.toString().trim() ?? undefined,
    source: formData.get('source')?.toString().trim() ?? undefined,
  };

  const validatedFields = WaitlistSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.issues[0].message,
    };
  }

  const { email, full_name, role, company, revenue_range, aesthetic, source } =
    validatedFields.data;

  try {
    const supabase = await createClient();

    const { error } = await supabase.from('waitlist').insert({
      email: email.toLowerCase().trim(),
      full_name: full_name.trim(),
      role: role,
      company: company?.trim() ?? null,
      revenue_range: revenue_range ?? null,
      preferences: aesthetic ? { aesthetic } : {},
      source: source,
    });

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

    // Fire Brevo welcome sequence after response is sent
    after(() =>
      triggerBrevoWelcome(
        email.toLowerCase().trim(),
        full_name.trim().split(' ')[0] ?? full_name.trim()
      )
    );

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
