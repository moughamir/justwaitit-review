# Files

## File: app/auth/confirm/route.ts
````typescript
import { createClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      // redirect user to specified redirect URL or root of app
      redirect(next);
    } else {
      // redirect the user to an error page with some instructions
      redirect(`/auth/error?error=${error?.message}`);
    }
  }

  // redirect the user to an error page with some instructions
  redirect(`/auth/error?error=No token hash or type`);
}
````

## File: app/auth/error/page.tsx
````typescript
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";

async function ErrorContent({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      {params?.error ? (
        <p className="text-sm text-muted-foreground">
          Code error: {params.error}
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          An unspecified error occurred.
        </p>
      )}
    </>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Sorry, something went wrong.
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense>
                <ErrorContent searchParams={searchParams} />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
````

## File: app/auth/forgot-password/page.tsx
````typescript
import { ForgotPasswordForm } from "@/components/forgot-password-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
````

## File: app/auth/login/page.tsx
````typescript
import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
````

## File: app/auth/sign-up/page.tsx
````typescript
import { SignUpForm } from "@/components/sign-up-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
}
````

## File: app/auth/sign-up-success/page.tsx
````typescript
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Thank you for signing up!
              </CardTitle>
              <CardDescription>Check your email to confirm</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                You&apos;ve successfully signed up. Please check your email to
                confirm your account before signing in.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
````

## File: app/auth/update-password/page.tsx
````typescript
import { UpdatePasswordForm } from "@/components/update-password-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <UpdatePasswordForm />
      </div>
    </div>
  );
}
````

## File: app/globals.css
````css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 0% 3.9%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
  }
  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
````

## File: components/tutorial/code-block.tsx
````typescript
"use client";

import { useState } from "react";
import { Button } from "../ui/button";

const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export function CodeBlock({ code }: { code: string }) {
  const [icon, setIcon] = useState(CopyIcon);

  const copy = async () => {
    await navigator?.clipboard?.writeText(code);
    setIcon(CheckIcon);
    setTimeout(() => setIcon(CopyIcon), 2000);
  };

  return (
    <pre className="bg-muted rounded-md p-6 my-6 relative">
      <Button
        size="icon"
        onClick={copy}
        variant={"outline"}
        className="absolute right-2 top-2"
      >
        {icon}
      </Button>
      <code className="text-xs p-3">{code}</code>
    </pre>
  );
}
````

## File: components/tutorial/connect-supabase-steps.tsx
````typescript
import { TutorialStep } from "./tutorial-step";

export function ConnectSupabaseSteps() {
  return (
    <ol className="flex flex-col gap-6">
      <TutorialStep title="Create Supabase project">
        <p>
          Head over to{" "}
          <a
            href="https://app.supabase.com/project/_/settings/api"
            target="_blank"
            className="font-bold hover:underline text-foreground/80"
            rel="noreferrer"
          >
            database.new
          </a>{" "}
          and create a new Supabase project.
        </p>
      </TutorialStep>

      <TutorialStep title="Declare environment variables">
        <p>
          Rename the{" "}
          <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
            .env.example
          </span>{" "}
          file in your Next.js app to{" "}
          <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
            .env.local
          </span>{" "}
          and populate with values from{" "}
          <a
            href="https://app.supabase.com/project/_/settings/api"
            target="_blank"
            className="font-bold hover:underline text-foreground/80"
            rel="noreferrer"
          >
            your Supabase project&apos;s API Settings
          </a>
          .
        </p>
      </TutorialStep>

      <TutorialStep title="Restart your Next.js development server">
        <p>
          You may need to quit your Next.js development server and run{" "}
          <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
            npm run dev
          </span>{" "}
          again to load the new environment variables.
        </p>
      </TutorialStep>

      <TutorialStep title="Refresh the page">
        <p>
          You may need to refresh the page for Next.js to load the new
          environment variables.
        </p>
      </TutorialStep>
    </ol>
  );
}
````

## File: components/tutorial/fetch-data-steps.tsx
````typescript
import { TutorialStep } from "./tutorial-step";
import { CodeBlock } from "./code-block";

const create = `create table notes (
  id bigserial primary key,
  title text
);

insert into notes(title)
values
  ('Today I created a Supabase project.'),
  ('I added some data and queried it from Next.js.'),
  ('It was awesome!');
`.trim();

const rls = `alter table notes enable row level security;
create policy "Allow public read access" on notes
for select
using (true);`.trim();

const server = `import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data: notes } = await supabase.from('notes').select()

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}
`.trim();

const client = `'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [notes, setNotes] = useState<any[] | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('notes').select()
      setNotes(data)
    }
    getData()
  }, [])

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}
`.trim();

export function FetchDataSteps() {
  return (
    <ol className="flex flex-col gap-6">
      <TutorialStep title="Create some tables and insert some data">
        <p>
          Head over to the{" "}
          <a
            href="https://supabase.com/dashboard/project/_/editor"
            className="font-bold hover:underline text-foreground/80"
            target="_blank"
            rel="noreferrer"
          >
            Table Editor
          </a>{" "}
          for your Supabase project to create a table and insert some example
          data. If you&apos;re stuck for creativity, you can copy and paste the
          following into the{" "}
          <a
            href="https://supabase.com/dashboard/project/_/sql/new"
            className="font-bold hover:underline text-foreground/80"
            target="_blank"
            rel="noreferrer"
          >
            SQL Editor
          </a>{" "}
          and click RUN!
        </p>
        <CodeBlock code={create} />
      </TutorialStep>

      <TutorialStep title="Enable Row Level Security (RLS)">
        <p>
          Supabase enables Row Level Security (RLS) by default. To query data
          from your <code>notes</code> table, you need to add a policy. You can
          do this in the{" "}
          <a
            href="https://supabase.com/dashboard/project/_/editor"
            className="font-bold hover:underline text-foreground/80"
            target="_blank"
            rel="noreferrer"
          >
            Table Editor
          </a>{" "}
          or via the{" "}
          <a
            href="https://supabase.com/dashboard/project/_/sql/new"
            className="font-bold hover:underline text-foreground/80"
            target="_blank"
            rel="noreferrer"
          >
            SQL Editor
          </a>
          .
        </p>
        <p>
          For example, you can run the following SQL to allow public read
          access:
        </p>
        <CodeBlock code={rls} />
        <p>
          You can learn more about RLS in the{" "}
          <a
            href="https://supabase.com/docs/guides/auth/row-level-security"
            className="font-bold hover:underline text-foreground/80"
            target="_blank"
            rel="noreferrer"
          >
            Supabase docs
          </a>
          .
        </p>
      </TutorialStep>

      <TutorialStep title="Query Supabase data from Next.js">
        <p>
          To create a Supabase client and query data from an Async Server
          Component, create a new page.tsx file at{" "}
          <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
            /app/notes/page.tsx
          </span>{" "}
          and add the following.
        </p>
        <CodeBlock code={server} />
        <p>Alternatively, you can use a Client Component.</p>
        <CodeBlock code={client} />
      </TutorialStep>

      <TutorialStep title="Explore the Supabase UI Library">
        <p>
          Head over to the{" "}
          <a
            href="https://supabase.com/ui"
            className="font-bold hover:underline text-foreground/80"
          >
            Supabase UI library
          </a>{" "}
          and try installing some blocks. For example, you can install a
          Realtime Chat block by running:
        </p>
        <CodeBlock
          code={
            "npx shadcn@latest add https://supabase.com/ui/r/realtime-chat-nextjs.json"
          }
        />
      </TutorialStep>

      <TutorialStep title="Build in a weekend and scale to millions!">
        <p>You&apos;re ready to launch your product to the world! 🚀</p>
      </TutorialStep>
    </ol>
  );
}
````

## File: components/tutorial/sign-up-user-steps.tsx
````typescript
import Link from "next/link";
import { TutorialStep } from "./tutorial-step";
import { ArrowUpRight } from "lucide-react";

export function SignUpUserSteps() {
  return (
    <ol className="flex flex-col gap-6">
      {process.env.VERCEL_ENV === "preview" ||
      process.env.VERCEL_ENV === "production" ? (
        <TutorialStep title="Set up redirect urls">
          <p>It looks like this App is hosted on Vercel.</p>
          <p className="mt-4">
            This particular deployment is
            <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
              &quot;{process.env.VERCEL_ENV}&quot;
            </span>{" "}
            on
            <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
              https://{process.env.VERCEL_URL}
            </span>
            .
          </p>
          <p className="mt-4">
            You will need to{" "}
            <Link
              className="text-primary hover:text-foreground"
              href={
                "https://supabase.com/dashboard/project/_/auth/url-configuration"
              }
            >
              update your Supabase project
            </Link>{" "}
            with redirect URLs based on your Vercel deployment URLs.
          </p>
          <ul className="mt-4">
            <li>
              -{" "}
              <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
                http://localhost:3000/**
              </span>
            </li>
            <li>
              -{" "}
              <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
                {`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/**`}
              </span>
            </li>
            <li>
              -{" "}
              <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
                {`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL?.replace(
                  ".vercel.app",
                  "",
                )}-*-[vercel-team-url].vercel.app/**`}
              </span>{" "}
              (Vercel Team URL can be found in{" "}
              <Link
                className="text-primary hover:text-foreground"
                href="https://vercel.com/docs/accounts/create-a-team#find-your-team-id"
                target="_blank"
              >
                Vercel Team settings
              </Link>
              )
            </li>
          </ul>
          <Link
            href="https://supabase.com/docs/guides/auth/redirect-urls#vercel-preview-urls"
            target="_blank"
            className="text-primary/50 hover:text-primary flex items-center text-sm gap-1 mt-4"
          >
            Redirect URLs Docs <ArrowUpRight size={14} />
          </Link>
        </TutorialStep>
      ) : null}
      <TutorialStep title="Sign up your first user">
        <p>
          Head over to the{" "}
          <Link
            href="auth/sign-up"
            className="font-bold hover:underline text-foreground/80"
          >
            Sign up
          </Link>{" "}
          page and sign up your first user. It&apos;s okay if this is just you
          for now. Your awesome idea will have plenty of users later!
        </p>
      </TutorialStep>
    </ol>
  );
}
````

## File: components/tutorial/tutorial-step.tsx
````typescript
import { Checkbox } from "../ui/checkbox";

export function TutorialStep({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="relative">
      <Checkbox
        id={title}
        name={title}
        className={`absolute top-[3px] mr-2 peer`}
      />
      <label
        htmlFor={title}
        className={`relative text-base text-foreground peer-checked:line-through font-medium`}
      >
        <span className="ml-8">{title}</span>
        <div
          className={`ml-8 text-sm peer-checked:line-through font-normal text-muted-foreground`}
        >
          {children}
        </div>
      </label>
    </li>
  );
}
````

## File: components/ui/badge.tsx
````typescript
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
````

## File: components/ui/button.tsx
````typescript
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
````

## File: components/ui/card.tsx
````typescript
import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
````

## File: components/ui/checkbox.tsx
````typescript
"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
````

## File: components/ui/dropdown-menu.tsx
````typescript
"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      className,
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
````

## File: components/ui/input.tsx
````typescript
import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
````

## File: components/ui/label.tsx
````typescript
"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
````

## File: components/auth-button.tsx
````typescript
import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

export async function AuthButton() {
  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
````

## File: components/deploy-button.tsx
````typescript
import Link from "next/link";
import { Button } from "./ui/button";

export function DeployButton() {
  return (
    <>
      <Link
        href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&demo-title=nextjs-with-supabase&demo-description=This+starter+configures+Supabase+Auth+to+use+cookies%2C+making+the+user%27s+session+available+throughout+the+entire+Next.js+app+-+Client+Components%2C+Server+Components%2C+Route+Handlers%2C+Server+Actions+and+Middleware.&demo-url=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&demo-image=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2Fopengraph-image.png"
        target="_blank"
      >
        <Button className="flex items-center gap-2" size="sm">
          <svg
            className="h-3 w-3"
            viewBox="0 0 76 65"
            fill="hsl(var(--background)/1)"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="inherit" />
          </svg>
          <span>Deploy to Vercel</span>
        </Button>
      </Link>
    </>
  );
}
````

## File: components/env-var-warning.tsx
````typescript
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function EnvVarWarning() {
  return (
    <div className="flex gap-4 items-center">
      <Badge variant={"outline"} className="font-normal">
        Supabase environment variables required
      </Badge>
      <div className="flex gap-2">
        <Button size="sm" variant={"outline"} disabled>
          Sign in
        </Button>
        <Button size="sm" variant={"default"} disabled>
          Sign up
        </Button>
      </div>
    </div>
  );
}
````

## File: components/forgot-password-form.tsx
````typescript
"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {success ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Check Your Email</CardTitle>
            <CardDescription>Password reset instructions sent</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              If you registered using your email and password, you will receive
              a password reset email.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Reset Your Password</CardTitle>
            <CardDescription>
              Type in your email and we&apos;ll send you a link to reset your
              password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send reset email"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4"
                >
                  Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
````

## File: components/hero.tsx
````typescript
import { NextLogo } from "./next-logo";
import { SupabaseLogo } from "./supabase-logo";

export function Hero() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center">
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          rel="noreferrer"
        >
          <SupabaseLogo />
        </a>
        <span className="border-l rotate-45 h-6" />
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
          <NextLogo />
        </a>
      </div>
      <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        The fastest way to build apps with{" "}
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Supabase
        </a>{" "}
        and{" "}
        <a
          href="https://nextjs.org/"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Next.js
        </a>
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
````

## File: components/logout-button.tsx
````typescript
"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return <Button onClick={logout}>Logout</Button>;
}
````

## File: components/supabase-logo.tsx
````typescript
export function SupabaseLogo() {
  return (
    <svg
      aria-label="Supabase logo"
      width="140"
      height="30"
      viewBox="0 0 115 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_4671_51136)">
        <g clipPath="url(#clip1_4671_51136)">
          <path
            d="M13.4028 21.8652C12.8424 22.5629 11.7063 22.1806 11.6928 21.2898L11.4954 8.25948H20.3564C21.9614 8.25948 22.8565 10.0924 21.8585 11.3353L13.4028 21.8652Z"
            fill="url(#paint0_linear_4671_51136)"
          />
          <path
            d="M13.4028 21.8652C12.8424 22.5629 11.7063 22.1806 11.6928 21.2898L11.4954 8.25948H20.3564C21.9614 8.25948 22.8565 10.0924 21.8585 11.3353L13.4028 21.8652Z"
            fill="url(#paint1_linear_4671_51136)"
            fillOpacity="0.2"
          />
          <path
            d="M9.79895 0.89838C10.3593 0.200591 11.4954 0.582929 11.5089 1.47383L11.5955 14.5041H2.84528C1.24026 14.5041 0.345103 12.6711 1.34316 11.4283L9.79895 0.89838Z"
            fill="#3ECF8E"
          />
        </g>
        <path
          d="M30.5894 13.3913C30.7068 14.4766 31.7052 16.3371 34.6026 16.3371C37.1279 16.3371 38.3418 14.7479 38.3418 13.1976C38.3418 11.8022 37.3824 10.6588 35.4836 10.2712L34.1131 9.98049C33.5846 9.88359 33.2323 9.5929 33.2323 9.12777C33.2323 8.58512 33.7804 8.17818 34.4656 8.17818C35.5618 8.17818 35.9729 8.89521 36.0513 9.45725L38.2243 8.97275C38.1069 7.94561 37.1867 6.22083 34.446 6.22083C32.3709 6.22083 30.844 7.63555 30.844 9.34094C30.844 10.6781 31.6856 11.7828 33.5454 12.1898L34.8179 12.4805C35.5618 12.6355 35.8555 12.9844 35.8555 13.4107C35.8555 13.9146 35.4444 14.3603 34.583 14.3603C33.4476 14.3603 32.8797 13.6626 32.8212 12.9068L30.5894 13.3913Z"
          fill="currentColor"
        />
        <path
          d="M46.6623 16.0464H49.1486C49.1094 15.717 49.0506 15.0581 49.0506 14.3216V6.51154H46.4468V12.0542C46.4468 13.1588 45.7813 13.934 44.6263 13.934C43.4126 13.934 42.8643 13.0813 42.8643 12.0154V6.51154H40.2606V12.5387C40.2606 14.6123 41.5918 16.2984 43.9215 16.2984C44.9393 16.2984 46.0556 15.9108 46.5841 15.0193C46.5841 15.4069 46.6231 15.8526 46.6623 16.0464Z"
          fill="currentColor"
        />
        <path
          d="M54.433 19.7286V15.1162C54.9027 15.7558 55.8817 16.279 57.213 16.279C59.9341 16.279 61.7545 14.1472 61.7545 11.2596C61.7545 8.43021 60.1298 6.29842 57.3108 6.29842C55.8623 6.29842 54.7855 6.93792 54.3548 7.67439V6.51159H51.8295V19.7286H54.433ZM59.19 11.279C59.19 12.9845 58.133 13.9728 56.8017 13.9728C55.4708 13.9728 54.394 12.9651 54.394 11.279C54.394 9.59299 55.4708 8.6046 56.8017 8.6046C58.133 8.6046 59.19 9.59299 59.19 11.279Z"
          fill="currentColor"
        />
        <path
          d="M63.229 13.4495C63.229 14.9417 64.4818 16.3177 66.5375 16.3177C67.9662 16.3177 68.8865 15.6588 69.3758 14.9029C69.3758 15.2712 69.4149 15.7944 69.4737 16.0464H71.862C71.8033 15.7169 71.7449 15.0386 71.7449 14.5348V9.84482C71.7449 7.92622 70.6093 6.22083 67.5555 6.22083C64.9713 6.22083 63.5811 7.86807 63.4248 9.36033L65.7347 9.84482C65.8131 9.0115 66.4395 8.29445 67.5747 8.29445C68.6713 8.29445 69.1998 8.85646 69.1998 9.53475C69.1998 9.86421 69.0238 10.1355 68.4755 10.2131L66.1068 10.5619C64.5015 10.7945 63.229 11.744 63.229 13.4495ZM67.0854 14.3991C66.2438 14.3991 65.8325 13.8565 65.8325 13.2945C65.8325 12.558 66.361 12.1898 67.0268 12.0929L69.1998 11.7634V12.1898C69.1998 13.8759 68.1818 14.3991 67.0854 14.3991Z"
          fill="currentColor"
        />
        <path
          d="M76.895 16.0465V14.8837C77.4038 15.6976 78.4217 16.279 79.7531 16.279C82.4941 16.279 84.2951 14.1278 84.2951 11.2403C84.2951 8.4108 82.6701 6.25965 79.851 6.25965C78.4217 6.25965 77.3648 6.8798 76.934 7.55806V2.01546H74.3696V16.0465H76.895ZM81.6911 11.2596C81.6911 13.0038 80.6341 13.9728 79.3028 13.9728C77.9912 13.9728 76.895 12.9845 76.895 11.2596C76.895 9.51543 77.9912 8.56584 79.3028 8.56584C80.6341 8.56584 81.6911 9.51543 81.6911 11.2596Z"
          fill="currentColor"
        />
        <path
          d="M85.7692 13.4495C85.7692 14.9417 87.022 16.3177 89.0776 16.3177C90.5065 16.3177 91.4269 15.6588 91.916 14.9029C91.916 15.2712 91.9554 15.7944 92.014 16.0464H94.4023C94.3439 15.7169 94.2851 15.0386 94.2851 14.5348V9.84482C94.2851 7.92622 93.1495 6.22083 90.0955 6.22083C87.5115 6.22083 86.1216 7.86807 85.965 9.36033L88.2747 9.84482C88.3533 9.0115 88.9798 8.29445 90.1149 8.29445C91.2115 8.29445 91.74 8.85646 91.74 9.53475C91.74 9.86421 91.5638 10.1355 91.0156 10.2131L88.647 10.5619C87.0418 10.7945 85.7692 11.744 85.7692 13.4495ZM89.6258 14.3991C88.784 14.3991 88.3727 13.8565 88.3727 13.2945C88.3727 12.558 88.9012 12.1898 89.5671 12.0929L91.74 11.7634V12.1898C91.74 13.8759 90.722 14.3991 89.6258 14.3991Z"
          fill="currentColor"
        />
        <path
          d="M96.087 13.3913C96.2042 14.4766 97.2028 16.3371 100.1 16.3371C102.626 16.3371 103.839 14.7479 103.839 13.1976C103.839 11.8022 102.88 10.6588 100.981 10.2712L99.6105 9.98049C99.082 9.88359 98.7299 9.5929 98.7299 9.12777C98.7299 8.58512 99.2778 8.17818 99.963 8.17818C101.06 8.17818 101.471 8.89521 101.549 9.45725L103.722 8.97275C103.604 7.94561 102.684 6.22083 99.9436 6.22083C97.8683 6.22083 96.3416 7.63555 96.3416 9.34094C96.3416 10.6781 97.183 11.7828 99.043 12.1898L100.316 12.4805C101.06 12.6355 101.353 12.9844 101.353 13.4107C101.353 13.9146 100.942 14.3603 100.081 14.3603C98.9451 14.3603 98.3776 13.6626 98.3188 12.9068L96.087 13.3913Z"
          fill="currentColor"
        />
        <path
          d="M107.794 10.1937C107.852 9.32158 108.596 8.31381 109.947 8.31381C111.435 8.31381 112.062 9.24406 112.101 10.1937H107.794ZM112.355 12.6743C112.042 13.527 111.376 14.1278 110.163 14.1278C108.87 14.1278 107.794 13.2169 107.735 11.9573H114.626C114.626 11.9184 114.665 11.5309 114.665 11.1626C114.665 8.10064 112.884 6.22083 109.908 6.22083C107.441 6.22083 105.17 8.19753 105.17 11.2402C105.17 14.4572 107.5 16.3371 110.143 16.3371C112.512 16.3371 114.039 14.9611 114.528 13.3138L112.355 12.6743Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_4671_51136"
          x1="11.4954"
          y1="11.1486"
          x2="19.3439"
          y2="14.4777"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#249361" />
          <stop offset="1" stopColor="#3ECF8E" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4671_51136"
          x1="8.00382"
          y1="6.42177"
          x2="11.5325"
          y2="13.1398"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
        <clipPath id="clip0_4671_51136">
          <rect
            width="113.85"
            height="21.8943"
            fill="currentColor"
            transform="translate(0.922119 0.456161)"
          />
        </clipPath>
        <clipPath id="clip1_4671_51136">
          <rect
            width="21.3592"
            height="21.8943"
            fill="currentColor"
            transform="translate(0.919006 0.497101)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
````

## File: components/theme-switcher.tsx
````typescript
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const ICON_SIZE = 16;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"sm"}>
          {theme === "light" ? (
            <Sun
              key="light"
              size={ICON_SIZE}
              className={"text-muted-foreground"}
            />
          ) : theme === "dark" ? (
            <Moon
              key="dark"
              size={ICON_SIZE}
              className={"text-muted-foreground"}
            />
          ) : (
            <Laptop
              key="system"
              size={ICON_SIZE}
              className={"text-muted-foreground"}
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-content" align="start">
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(e) => setTheme(e)}
        >
          <DropdownMenuRadioItem className="flex gap-2" value="light">
            <Sun size={ICON_SIZE} className="text-muted-foreground" />{" "}
            <span>Light</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex gap-2" value="dark">
            <Moon size={ICON_SIZE} className="text-muted-foreground" />{" "}
            <span>Dark</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex gap-2" value="system">
            <Laptop size={ICON_SIZE} className="text-muted-foreground" />{" "}
            <span>System</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ThemeSwitcher };
````

## File: components/update-password-form.tsx
````typescript
"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/protected");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Reset Your Password</CardTitle>
          <CardDescription>
            Please enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleForgotPassword}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">New password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="New password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save new password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
````

## File: lib/supabase/client.ts
````typescript
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
````

## File: lib/supabase/proxy.ts
````typescript
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasEnvVars } from "../utils";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // If the env vars are not set, skip proxy check. You can remove this
  // once you setup the project.
  if (!hasEnvVars) {
    return supabaseResponse;
  }

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Do not run code between createServerClient and
  // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getClaims() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  if (
    request.nextUrl.pathname !== "/" &&
    !user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/auth")
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
````

## File: lib/supabase/server.ts
````typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Especially important if using Fluid compute: Don't put this client in a
 * global variable. Always create a new client within each function when using
 * it.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have proxy refreshing
            // user sessions.
          }
        },
      },
    },
  );
}
````

## File: lib/utils.ts
````typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
````

## File: .env.example
````
# Update these with your Supabase details from your project settings > API
# https://app.supabase.com/project/_/settings/api
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-or-anon-key
````

## File: components.json
````json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
````

## File: eslint.config.mjs
````javascript
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
````

## File: next.config.ts
````typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
};

export default nextConfig;
````

## File: package.json
````json
{
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint ."
  },
  "dependencies": {
    "@radix-ui/react-checkbox": "^1.3.1",
    "@radix-ui/react-dropdown-menu": "^2.1.14",
    "@radix-ui/react-label": "^2.1.6",
    "@radix-ui/react-slot": "^1.2.2",
    "@supabase/ssr": "latest",
    "@supabase/supabase-js": "latest",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.511.0",
    "next": "latest",
    "next-themes": "^0.4.6",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwind-merge": "^3.3.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.4.20",
    "eslint": "^9",
    "eslint-config-next": "15.3.1",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "tailwindcss-animate": "^1.0.7",
    "typescript": "^5"
  }
}
````

## File: postcss.config.mjs
````javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
````

## File: proxy.ts
````typescript
import { updateSession } from "@/lib/supabase/proxy";
import { type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
````

## File: README.md
````markdown
<a href="https://demo-nextjs-with-supabase.vercel.app/">
  <img alt="Next.js and Supabase Starter Kit - the fastest way to build apps with Next.js and Supabase" src="https://demo-nextjs-with-supabase.vercel.app/opengraph-image.png">
  <h1 align="center">Next.js and Supabase Starter Kit</h1>
</a>

<p align="center">
 The fastest way to build apps with Next.js and Supabase
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="#deploy-to-vercel"><strong>Deploy to Vercel</strong></a> ·
  <a href="#clone-and-run-locally"><strong>Clone and run locally</strong></a> ·
  <a href="#feedback-and-issues"><strong>Feedback and issues</strong></a>
  <a href="#more-supabase-examples"><strong>More Examples</strong></a>
</p>
<br/>

## Features

- Works across the entire [Next.js](https://nextjs.org) stack
  - App Router
  - Pages Router
  - Proxy
  - Client
  - Server
  - It just works!
- supabase-ssr. A package to configure Supabase Auth to use cookies
- Password-based authentication block installed via the [Supabase UI Library](https://supabase.com/ui/docs/nextjs/password-based-auth)
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Components with [shadcn/ui](https://ui.shadcn.com/)
- Optional deployment with [Supabase Vercel Integration and Vercel deploy](#deploy-your-own)
  - Environment variables automatically assigned to Vercel project

## Demo

You can view a fully working demo at [demo-nextjs-with-supabase.vercel.app](https://demo-nextjs-with-supabase.vercel.app/).

## Deploy to Vercel

Vercel deployment will guide you through creating a Supabase account and project.

After installation of the Supabase integration, all relevant environment variables will be assigned to the project so the deployment is fully functioning.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&demo-title=nextjs-with-supabase&demo-description=This+starter+configures+Supabase+Auth+to+use+cookies%2C+making+the+user%27s+session+available+throughout+the+entire+Next.js+app+-+Client+Components%2C+Server+Components%2C+Route+Handlers%2C+Server+Actions+and+Middleware.&demo-url=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&demo-image=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2Fopengraph-image.png)

The above will also clone the Starter kit to your GitHub, you can clone that locally and develop locally.

If you wish to just develop locally and not deploy to Vercel, [follow the steps below](#clone-and-run-locally).

## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Create a Next.js app using the Supabase Starter template npx command

   ```bash
   npx create-next-app --example with-supabase with-supabase-app
   ```

   ```bash
   yarn create next-app --example with-supabase with-supabase-app
   ```

   ```bash
   pnpm create next-app --example with-supabase with-supabase-app
   ```

3. Use `cd` to change into the app's directory

   ```bash
   cd with-supabase-app
   ```

4. Rename `.env.example` to `.env.local` and update the following:

  ```env
  NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=[INSERT SUPABASE PROJECT API PUBLISHABLE OR ANON KEY]
  ```
  > [!NOTE]
  > This example uses `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, which refers to Supabase's new **publishable** key format.
  > Both legacy **anon** keys and new **publishable** keys can be used with this variable name during the transition period. Supabase's dashboard may show `NEXT_PUBLIC_SUPABASE_ANON_KEY`; its value can be used in this example.
  > See the [full announcement](https://github.com/orgs/supabase/discussions/29260) for more information.

  Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` can be found in [your Supabase project's API settings](https://supabase.com/dashboard/project/_?showConnect=true)

5. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The starter kit should now be running on [localhost:3000](http://localhost:3000/).

6. This template comes with the default shadcn/ui style initialized. If you instead want other ui.shadcn styles, delete `components.json` and [re-install shadcn/ui](https://ui.shadcn.com/docs/installation/next)

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

## Feedback and issues

Please file feedback and issues over on the [Supabase GitHub org](https://github.com/supabase/supabase/issues/new/choose).

## More Supabase examples

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth and the Next.js 13 App Router (free course)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- [Supabase Auth and the Next.js App Router](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)
````

## File: tailwind.config.ts
````typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
````

## File: tsconfig.json
````json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
````

## File: app/protected/layout.tsx
````typescript
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { Suspense } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>anaqio</Link>
            </div>
            <div className="flex items-center gap-4">
              <Suspense>
                <AuthButton />
              </Suspense>
              <ThemeSwitcher />
            </div>
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          {children}
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-8">
          <p className="text-foreground/60">
            © 2026 anaqio. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}
````

## File: app/protected/page.tsx
````typescript
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { InfoIcon } from "lucide-react";
import { Suspense } from "react";

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return JSON.stringify(data.claims, null, 2);
}

export default function ProtectedPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          <Suspense>
            <UserDetails />
          </Suspense>
        </pre>
      </div>
    </div>
  );
}
````

## File: components/login-form.tsx
````typescript
"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/protected");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to anaqio</CardTitle>
          <CardDescription>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/sign-up"
                className="underline underline-offset-4"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
````

## File: components/next-logo.tsx
````typescript
type NextLogoProps = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

export function NextLogo({ className, width = 300, height = 68 }: NextLogoProps) {
  return (
    <svg
      aria-label="Next.js logotype"
      height={height}
      role="img"
      viewBox="0 0 394 79"
      width={width}
      className={className}
    >
      <path
        d="M261.919 0.0330722H330.547V12.7H303.323V79.339H289.71V12.7H261.919V0.0330722Z"
        fill="currentColor"
      />
      <path
        d="M149.052 0.0330722V12.7H94.0421V33.0772H138.281V45.7441H94.0421V66.6721H149.052V79.339H80.43V12.7H80.4243V0.0330722H149.052Z"
        fill="currentColor"
      />
      <path
        d="M183.32 0.0661486H165.506L229.312 79.3721H247.178L215.271 39.7464L247.127 0.126654L229.312 0.154184L206.352 28.6697L183.32 0.0661486Z"
        fill="currentColor"
      />
      <path
        d="M201.6 56.7148L192.679 45.6229L165.455 79.4326H183.32L201.6 56.7148Z"
        fill="currentColor"
      />
      <path
        clipRule="evenodd"
        d="M80.907 79.339L17.0151 0H0V79.3059H13.6121V16.9516L63.8067 79.339H80.907Z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <path
        d="M333.607 78.8546C332.61 78.8546 331.762 78.5093 331.052 77.8186C330.342 77.1279 329.991 76.2917 330 75.3011C329.991 74.3377 330.342 73.5106 331.052 72.8199C331.762 72.1292 332.61 71.7838 333.607 71.7838C334.566 71.7838 335.405 72.1292 336.115 72.8199C336.835 73.5106 337.194 74.3377 337.204 75.3011C337.194 75.9554 337.028 76.5552 336.696 77.0914C336.355 77.6368 335.922 78.064 335.377 78.373C334.842 78.6911 334.252 78.8546 333.607 78.8546Z"
        fill="currentColor"
      />
      <path
        d="M356.84 45.4453H362.872V68.6846C362.863 70.8204 362.401 72.6472 361.498 74.1832C360.585 75.7191 359.321 76.8914 357.698 77.7185C356.084 78.5364 354.193 78.9546 352.044 78.9546C350.079 78.9546 348.318 78.6001 346.75 77.9094C345.182 77.2187 343.937 76.1826 343.024 74.8193C342.101 73.456 341.649 71.7565 341.649 69.7207H347.691C347.7 70.6114 347.903 71.3838 348.29 72.0291C348.677 72.6744 349.212 73.1651 349.895 73.5105C350.586 73.8559 351.38 74.0286 352.274 74.0286C353.243 74.0286 354.073 73.8286 354.746 73.4196C355.419 73.0197 355.936 72.4199 356.296 71.6201C356.646 70.8295 356.831 69.8479 356.84 68.6846V45.4453Z"
        fill="currentColor"
      />
      <path
        d="M387.691 54.5338C387.544 53.1251 386.898 52.0254 385.773 51.2438C384.638 50.4531 383.172 50.0623 381.373 50.0623C380.11 50.0623 379.022 50.2532 378.118 50.6258C377.214 51.0075 376.513 51.5164 376.033 52.1617C375.554 52.807 375.314 53.5432 375.295 54.3703C375.295 55.061 375.461 55.6608 375.784 56.1607C376.107 56.6696 376.54 57.0968 377.103 57.4422C377.656 57.7966 378.274 58.0874 378.948 58.3237C379.63 58.56 380.313 58.76 380.995 58.9236L384.14 59.6961C385.404 59.9869 386.631 60.3778 387.802 60.8776C388.973 61.3684 390.034 61.9955 390.965 62.7498C391.897 63.5042 392.635 64.413 393.179 65.4764C393.723 66.5397 394 67.7848 394 69.2208C394 71.1566 393.502 72.8562 392.496 74.3285C391.491 75.7917 390.043 76.9369 388.143 77.764C386.252 78.582 383.965 79 381.272 79C378.671 79 376.402 78.6002 374.493 77.8004C372.575 77.0097 371.08 75.8463 370.001 74.3194C368.922 72.7926 368.341 70.9294 368.258 68.7391H374.235C374.318 69.8842 374.687 70.8386 375.314 71.6111C375.95 72.3745 376.78 72.938 377.795 73.3197C378.819 73.6923 379.962 73.8832 381.226 73.8832C382.545 73.8832 383.707 73.6832 384.712 73.2924C385.708 72.9016 386.492 72.3564 387.055 71.6475C387.627 70.9476 387.913 70.1206 387.922 69.1754C387.913 68.312 387.654 67.5939 387.156 67.0304C386.649 66.467 385.948 65.9944 385.053 65.6127C384.15 65.231 383.098 64.8856 381.899 64.5857L378.081 63.6223C375.323 62.9225 373.137 61.8592 371.541 60.4323C369.937 59.0054 369.143 57.115 369.143 54.7429C369.143 52.798 369.678 51.0894 370.758 49.6261C371.827 48.1629 373.294 47.0268 375.148 46.2179C377.011 45.4 379.114 45 381.456 45C383.836 45 385.92 45.4 387.719 46.2179C389.517 47.0268 390.929 48.1538 391.952 49.5897C392.976 51.0257 393.511 52.6707 393.539 54.5338H387.691Z"
        fill="currentColor"
      />
    </svg>
  );
}
````

## File: components/sign-up-form.tsx
````typescript
"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Join anaqio</CardTitle>
          <CardDescription>Create your account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="repeat-password">Repeat Password</Label>
                </div>
                <Input
                  id="repeat-password"
                  type="password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating an account..." : "Sign up"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
````

## File: public/logo.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" width="841.89" height="595.276" viewBox="0 0 841.89 595.276">
<defs>
<clipPath id="clip_1">
<path transform="matrix(1,0,0,-1,0,595.276)" d="M628.406 335.15C589.058 332.662 584.903 275.011 622.037 266.072L613.015 259.725C611.853 258.373 613.222 257.46 613.533 256.145 613.846 255.923 615.903 257.85 616.501 258.133 623.762 261.573 631.771 258.335 640.126 255.097 649.269 251.553 658.826 248.008 668.266 253.219 669.601 253.956 675.542 258.963 675.541 260.17 675.54 260.914 674.392 261.737 673.85 261.691 673.514 261.662 669.766 258.597 668.202 258.014 658.087 254.24 645.173 262.687 635.053 263.712 633.437 263.875 631.702 263.803 629.966 263.732 628.4 263.668 626.834 263.604 625.352 263.712 625.4 264.382 627.493 264.55 628.015 264.598 628.852 264.675 629.7 264.649 630.54 264.623 631.429 264.595 632.308 264.568 633.155 264.663 680.037 269.859 674.768 335.244 631.253 335.241 630.322 335.241 629.371 335.211 628.406 335.15M628.486 273.228C599.349 276.125 599.357 322.999 627.13 326.494 646.547 328.936 656.006 314.428 655.924 299.919 655.847 286.496 647.606 273.073 631.528 273.074 630.544 273.074 629.529 273.125 628.486 273.228"/>
</clipPath>
<clipPath id="clip_2">
<path transform="matrix(1,0,0,-1,0,595.276)" d="M471.89 334.638V282.293L432.682 334.638H423.89V265.638H433.89V317.983L473.098 265.638H481.89V333.924L481.177 334.638Z"/>
</clipPath>
<clipPath id="clip_3">
<path transform="matrix(1,0,0,-1,0,595.276)" d="M739.514 286.291C747.98 263.29 780.103 257.045 796.969 274.282 815.032 292.742 807.9 327.264 781.996 333.949 778.522 334.846 775.141 335.267 771.889 335.267 747.344 335.264 730.327 311.251 739.514 286.291M769.931 273.179C740.266 275.273 739.936 323.095 768.164 326.483 787.344 328.784 796.833 314.348 796.789 299.912 796.749 286.506 788.488 273.099 772.136 273.1 771.417 273.1 770.681 273.126 769.931 273.179"/>
</clipPath>
<clipPath id="clip_4">
<path transform="matrix(1,0,0,-1,0,595.276)" d="M540.947 334.579C539.357 334.504 537.877 334.429 537.052 334.602L508.293 265.638H518.044L525.363 283.422 557.46 283.638 564.898 265.638H575.362L547.258 333.816C546.771 334.494 545.295 334.662 543.581 334.662 542.731 334.662 541.822 334.621 540.947 334.579M542.059 324.271 554.368 291.638H528.814Z"/>
</clipPath>
<clipPath id="clip_5">
<path transform="matrix(1,0,0,-1,0,595.276)" d="M357.939 334.46 329.57 265.638H340.133L347.326 283.642 379.51 283.638 387.428 265.638H397.272L368.649 335.251C367.803 335.077 366.249 335.154 364.574 335.229 363.648 335.272 362.685 335.314 361.785 335.314 359.98 335.314 358.429 335.143 357.939 334.46M363.19 324.271 376.434 291.638H350.88Z"/>
</clipPath>
<clipPath id="clip_6">
<path transform="matrix(1,0,0,-1,0,595.276)" d="M696.89 334.638V265.638H706.121L705.89 334.638Z"/>
</clipPath>
<clipPath id="clip_7">
<path transform="matrix(1,0,0,-1,0,595.276)" d="M49.064 377.638C41.235 377.638 34.89 371.292 34.89 363.465V323.811C34.89 315.984 41.235 309.638 49.064 309.638H165.717C173.544 309.638 179.89 315.984 179.89 323.811V363.465C179.89 371.292 173.544 377.638 165.717 377.638Z"/>
</clipPath>
<clipPath id="clip_8">
<path transform="matrix(1,0,0,-1,0,595.276)" d="M171.063 254.638C163.236 254.638 156.89 248.292 156.89 240.465V201.811C156.89 193.983 163.236 187.637 171.063 187.637H287.716C295.545 187.637 301.89 193.983 301.89 201.811V240.465C301.89 248.292 295.545 254.638 287.716 254.638Z"/>
</clipPath>
<clipPath id="clip_9">
<path transform="matrix(1,0,0,-1,0,595.276)" d="M0 595.276H841.89V0H0Z"/>
</clipPath>
<clipPath id="clip_10">
<path transform="matrix(1,0,0,-1,0,595.276)" d="M259.806 383.941C259.281 383.563 256.828 381.592 256.515 381.22 254.908 379.305 255.879 377.159 255.582 375.05 255.413 373.846 254.844 373.503 255.022 371.785 255.202 370.054 256.456 369.262 256.648 368.222 256.775 367.539 256.757 365.177 256.513 364.559 254.771 363.013 253.642 360.507 251.878 359.084 246.674 354.886 244.016 356.664 242.759 348.257 240.599 333.821 242.642 318.216 247.214 304.492L246.252 296.7C246.367 296.115 249.921 295.852 250.611 295.672 250.872 293.803 251.499 291.977 251.737 290.104 252.371 285.127 252.93 278.449 253.105 273.442 253.311 267.55 251.815 261.972 251.471 256.233 250.85 245.872 253.291 234.9 253.934 224.555 255.158 223.223 254.097 222.622 253.931 220.993 253.852 220.216 253.793 217.575 253.981 216.95 254.164 216.344 256.54 215.266 257.143 215.169 257.616 215.093 257.965 215.239 258.252 215.384 258.514 215.517 258.726 215.65 258.935 215.615 259.337 215.547 260.441 214.467 261.025 214.158 264.294 212.423 268.715 212.033 272.374 212.394 274.04 212.558 275.524 212.919 274.918 214.931 274.513 216.273 269.71 218.631 268.414 219.499L269.414 220.833C272.062 220.478 274.119 218.467 276.781 218.157 278.417 217.966 286.16 217.814 286.875 219.218 288.331 222.077 281.303 222.75 279.894 223.181 276.942 224.082 276.064 226.471 273.882 228.373L274.328 228.59C277.401 241.975 281.587 255.069 285.331 268.225L280.308 298.143C280.902 300.267 281.51 303.115 281.189 305.335 280.771 308.224 278.317 310.384 277.222 312.842 276.043 315.484 273.911 323.853 273.643 326.749 273.015 333.526 274.297 341.085 273.331 348.29 272.704 352.97 270.921 353.169 267.744 356.091 267.574 357.44 265.116 359.888 265.812 361.002 266.017 361.331 267.222 361.664 267.92 362.719 270.198 366.156 270.281 369.808 270.95 373.623 271.33 375.788 272.342 377.105 271.902 379.643 271.352 382.814 267.183 384.993 263.549 384.993 262.14 384.993 260.811 384.666 259.806 383.941M256.689 375.092C255.935 376.275 256.487 379.752 257.476 380.807 258.014 381.381 258.83 381.468 259.386 381.901 259.89 382.295 260.027 382.849 260.719 383.302 264.294 385.638 272.222 382.145 270.871 377.114 270.406 377.135 270.508 377.836 270.184 378.198 269.601 378.846 268.365 378.807 267.241 378.769 266.728 378.751 266.239 378.733 265.846 378.781 264.422 378.952 260.892 380.594 260.084 378.746 259.758 378.002 260.093 377.201 259.887 376.484 259.694 375.817 257.955 374.901 258.298 373.564ZM259.602 374.59C259.889 375.158 260.769 375.37 260.961 376.223 261.13 376.971 261.007 377.73 261.033 378.481 262.929 378.787 264.822 377.671 266.64 377.636 266.937 377.631 267.257 377.694 267.575 377.758 268.388 377.921 269.198 378.083 269.635 377.104 269.811 376.712 270.067 375.014 270.065 374.53 270.06 373.495 269.65 370.486 269.438 369.398 269.212 368.234 267.164 362.918 266.338 362.389 264.46 361.19 260.114 364.173 259.162 365.818 258.599 366.79 258.632 368.777 258.171 369.202 257.802 369.542 257.299 369.361 257.008 369.536 256.207 370.019 255.598 372.889 256.117 373.836 257.406 374.312 257.442 371.876 257.77 371.662 257.899 371.577 258.019 371.539 258.13 371.539 259.039 371.54 259.358 374.109 259.602 374.59M257.617 363.452 257.758 365.911 261.495 362.413 264.475 361.013C264.729 360.674 264.263 358.016 263.906 357.997ZM261.777 355.332 256.389 362.907 263.099 357.164 262.397 354.987ZM263.882 344.309 257.785 352.723C257.627 353.331 258.392 353.779 258.525 354.361 259.042 356.623 256.164 355.713 255.545 356.53 255.438 356.67 254.274 359.636 254.259 359.812 254.21 360.368 255.088 361.359 255.443 361.815 256.072 361.966 259.765 356.655 260.328 355.783 264.394 349.479 267.25 342.414 268.685 335.047ZM261.215 296.572C260.518 297.424 259.481 298.361 259.135 299.41 258.843 300.301 258.96 301.202 258.725 302.005 256.591 309.29 252.749 317.253 253.111 325.072 253.498 333.427 256.342 341.178 253.575 349.58 252.784 351.982 251.266 355.224 248.462 355.536L253.651 359.084C253.953 358.278 254.381 356.393 254.891 355.812 255.51 355.106 256.837 355.29 257.475 354.578L256.527 352.8C260.435 347.841 263.678 343.008 266.462 337.328 267.304 335.612 269.896 330.586 270.254 329.1 270.536 327.919 270.168 325.472 270.33 323.985 271.112 316.803 271.723 310.286 270.247 303.028 269.241 298.078 267.905 296.419 263.753 296.419 263.004 296.419 262.162 296.473 261.215 296.572M264.89 358.811C266.327 357.699 266.026 356.213 264.89 354.986ZM269.316 336.899C267.961 341.073 267.238 344.677 265.369 348.801 264.209 351.36 261.868 353.148 263.771 356.079 264.731 355.442 264.263 352.491 265.126 351.836 266.652 351.484 264.949 353.45 266.224 353.893 267.121 350.531 268.61 347.316 269.158 343.848 269.564 341.28 269.394 338.7 269.779 336.139 269.757 336.136 269.736 336.134 269.716 336.134 269.387 336.134 269.404 336.629 269.316 336.899M270.601 334.633C270.456 338.159 270.623 341.398 269.974 344.935 269.306 348.574 267.59 351.94 266.777 355.532 267.237 355.207 267.835 354.452 268.067 353.956 268.777 352.436 269.734 349.297 270.191 347.611 271.475 342.867 271.516 338.55 270.871 333.68 270.85 333.678 270.83 333.676 270.812 333.676 270.413 333.676 270.614 334.315 270.601 334.633M243.256 325.881C242.925 331.808 242.628 347.609 244.982 352.591 247.584 358.1 251.521 352.604 252.639 349.191 255.44 340.636 252.334 333.247 252.019 324.799 251.893 321.443 253.12 316.186 254.005 312.859 255.038 308.981 256.696 305.316 257.755 301.451L250.105 298.44C248.024 307.255 243.76 316.811 243.256 325.881M279.484 299.538C279.123 299.903 278.723 300.233 278.409 300.643 275.687 304.209 271.067 322.137 271.133 326.722 271.175 329.688 272.079 333.238 272.238 336.277 272.558 342.384 271.777 347.783 269.237 353.347 270.977 352.271 271.774 351.373 272.172 349.317 273.607 341.886 272.106 333.124 272.823 325.656 273.086 322.915 275.078 315.439 276.129 312.843 277.863 308.561 280.57 308.109 280.165 302.404 280.131 301.927 279.837 299.538 279.486 299.538 279.485 299.538 279.485 299.538 279.484 299.538M266.364 295.435C267.033 295.571 268.612 296.778 269.1 297.346 271.849 300.55 272.076 309.907 272.24 314.151 272.253 314.482 272.037 315.167 272.512 315.102 273.754 309.244 274.963 302.681 279.283 298.238 280.433 291.094 281.537 283.944 282.707 276.802 283.103 274.383 284.052 271.356 284.234 269.041 284.494 265.754 282.43 261.897 281.456 258.772 278.437 249.079 275.794 239.248 273.606 229.326 270.666 229.825 267.573 230.196 264.982 231.787 264.744 232.166 266.713 239.302 266.963 240.475 267.948 245.092 268.5 249.989 269.588 254.516 270.345 257.662 273.651 264.827 273.268 267.37 272.513 272.385 269.318 278.374 267.879 283.31 268.24 285.437 268.785 287.581 269.436 289.633 269.781 290.724 271.254 293.648 271.302 294.324 271.336 294.772 270.983 294.888 270.738 295.157 268.727 291.747 267.669 287.632 266.854 283.746 263.631 268.375 261.753 251.439 261.583 235.75 262.484 232.215 263.155 228.622 263.218 224.96 260.561 224.819 257.854 223.967 255.214 224.677L254.971 225.057C254.241 232.617 253.107 240.193 252.563 247.769 251.875 257.376 254.383 266.232 253.939 275.915 253.751 280.038 253.313 285.178 252.833 289.286 252.58 291.45 251.946 293.541 251.743 295.707 252.347 295.81 252.289 295.661 252.425 295.175 253.132 292.633 252.708 289.019 255.204 287.285 257.644 285.591 264.862 283.291 261.581 288.877L262.966 288.997C263.947 289.675 261.706 294.264 261.581 295.435 262.25 295.527 263.065 295.472 263.878 295.417 264.374 295.383 264.869 295.349 265.329 295.349 265.703 295.349 266.054 295.372 266.364 295.435M247.367 297.075 247.919 301.716 249.411 297.612C249.686 297.325 250.049 297.38 250.375 297.434 250.818 297.508 251.194 297.583 251.194 296.802ZM252.184 298.186C252.417 298.373 257.52 300.546 257.746 300.351L258.027 299.54 252.016 297.348C252.038 297.671 251.872 297.934 252.184 298.186M255.578 288.206C253.741 289.719 253.87 294.386 253.105 296.525L258.296 298.713C258.824 297.445 259.96 296.638 260.54 295.35 260.795 294.784 262.3 290.191 262.125 289.972 261.335 289.953 261.124 291.057 260.971 292.162 260.811 293.317 260.714 294.474 260.082 294.341 259.441 294.206 259.942 292.059 260.021 291.554 260.304 289.744 261.014 288.187 261.308 286.421 261.238 286.352 261.101 286.321 260.916 286.321 259.662 286.321 256.158 287.729 255.578 288.206M263.481 231.909C263.111 233.221 262.41 236.135 262.391 237.401 262.202 250.396 264.841 263.033 266.547 275.858L267.591 281.228C269.373 276.281 271.339 271.354 272.366 266.167 268.687 257.782 267.767 249.028 265.869 240.203 265.384 237.946 264.017 234.398 263.811 232.392 263.75 231.807 264.01 231.5 264.038 230.967 263.515 231.061 263.587 231.537 263.481 231.909M264.044 229.188 264.62 230.387C264.848 230.551 266.118 230.066 267.477 229.581 268.844 229.092 270.301 228.604 270.873 228.778 270.716 228.393 269.654 227.824 269.315 227.746 268.949 227.662 268.604 227.624 268.274 227.624 266.709 227.624 265.493 228.47 264.044 229.188M272.381 228.443C274.694 226.43 276.256 223.357 279.285 222.3 280.967 221.712 283.018 221.764 284.605 221.061 285.247 220.776 286.104 220.342 285.908 219.495 282.805 219.14 279.912 218.676 276.785 219.254 274.97 219.59 269.489 222.59 268.401 221.828 268.1 221.617 268.169 220.83 267.731 220.592 267.49 220.591 264.613 223.761 264.46 224.147 264.323 224.497 263.931 227.806 264.044 227.962 265.484 227.095 266.822 226.626 268.121 226.626 269.559 226.626 270.95 227.2 272.381 228.443M260.935 222.641C261.849 223.324 262.624 224.008 263.297 223.826 263.688 223.721 267.023 219.48 268.01 218.68 269.167 217.742 273.489 215.626 273.828 214.653 273.922 214.381 273.938 214.059 273.857 213.781 270.172 213.19 265.329 213.051 261.944 214.802 261.021 215.28 259.834 216.559 258.913 216.721 258.444 216.803 258.171 216.656 257.942 216.508 257.757 216.391 257.601 216.272 257.395 216.274 256.855 216.276 255.839 216.967 255.183 217.004L255.297 222.771C256.021 222.796 256.243 222.045 256.859 221.742 257.311 221.519 257.742 221.426 258.153 221.426 259.203 221.426 260.124 222.034 260.935 222.641M256.663 223.185 260.214 223.588C259.839 222.852 259.075 222.474 258.305 222.474 257.7 222.474 257.09 222.708 256.663 223.185"/>
</clipPath>
<clipPath id="clip_11">
<path transform="matrix(1,0,0,-1,0,595.276)" d="M221.44 373.948C221.124 371.567 222.464 364.916 223.557 362.725 224.566 360.706 226.158 358.043 228.773 358.512 229.199 356.801 229.578 355.016 229.326 353.229 228.992 350.861 225.492 350.929 224.076 348.915 222.971 347.346 223.707 345.758 223.189 344.611 222.909 343.99 220.699 341.997 220.098 341.144 217.287 337.161 219.587 336.121 220.021 332.42 220.927 324.7 214.799 318.538 213.078 311.282 212.125 307.266 211.702 302.179 211.564 298.043 211.525 296.884 211.939 293.204 211.801 292.639 211.68 292.138 210.5 290.376 210.163 289.61 207.326 283.175 203.238 274.93 202.56 267.979 202 262.228 202.171 256.044 201.734 250.228 200.909 239.236 199.442 228.236 197.349 217.428 197.353 216.237 200.049 215.501 201.051 215.395 203.07 215.18 204.06 215.444 205.413 216.923L207.479 216.763C206.955 214.399 208.418 212.84 210.685 212.457 212.663 212.121 214.24 212.635 215.871 213.15 217.909 213.791 220.032 214.434 223.132 213.423 227.183 212.102 229.03 210.38 233.818 210.787 235.4 210.921 241.154 211.601 239.73 214.027 241.974 214.699 251.421 213.434 252.249 216.13 253.011 218.611 249.252 221.935 247.867 223.939 242.573 231.598 238.247 241.996 235.078 250.766 231.243 261.379 225.158 279.886 228.722 290.729L229.89 293.25V289.289C229.89 287.68 234.831 290.742 235.341 291.217 238.114 293.792 236.466 298.51 236.758 301.819 237.128 306.004 239.188 311.137 240.143 315.373 242.772 327.035 240.961 337.846 241.906 349.396 242.083 351.546 242.941 353.325 242.733 355.667 242.474 358.577 240.417 361.034 239.591 363.726 238.046 368.762 239.377 374.913 234.544 378.623 233.098 379.732 231.294 380.258 229.489 380.257 225.735 380.257 221.976 377.982 221.44 373.948M226.594 375.748C226.968 380.57 232.032 379.86 234.664 377.119 238.335 373.297 237.222 368.062 238.54 363.509 239.664 359.624 242.979 356.539 241.351 351.984L240.131 354.172C237.631 356.203 235.777 357.571 235.192 360.982 235.094 361.545 234.729 364.605 234.779 364.951 234.875 365.601 236.118 365.954 236.57 367.007 237.634 369.475 236.749 372.263 233.722 370.57 232.517 373.51 229.778 375.492 226.594 375.748M226.322 378.476C225.707 377.922 225.699 376.171 225.441 375.809 225.381 375.723 223.999 375.098 223.604 374.775 223.13 374.387 223.023 373.803 222.498 373.562 222.659 375.655 224.327 377.881 226.322 378.476M224.458 363.094C223.426 365.133 223.595 365.865 223.287 367.934 223.019 369.743 222.252 370.705 223.26 372.66 225.042 376.115 229.239 374.822 231.385 372.475 232.009 371.792 233.003 369.586 233.431 369.317 233.866 369.043 234.296 369.314 234.683 369.584 235.111 369.884 235.488 370.184 235.759 369.746 236.134 369.142 235.772 367.249 235.275 366.801 234.929 366.489 234.206 366.61 233.842 366.181 232.807 364.959 233.341 362.913 230.832 360.996 229.617 360.068 228.669 359.651 227.874 359.651 226.459 359.652 225.531 360.975 224.458 363.094M230.15 352.256C230.835 354.514 230.198 356.733 229.645 358.922 231.042 360.2 233.149 360.895 233.706 362.906L234.856 358.462 236.434 355.534C235.868 355.738 234.428 354.814 233.063 353.892 231.83 353.056 230.659 352.221 230.258 352.221 230.211 352.221 230.174 352.232 230.15 352.256M229.88 349.381C230.009 351.703 230.596 351.041 232.145 352.035 235.525 354.203 239.074 357.253 240.466 350.956 241.722 345.271 241.001 329.249 240.531 322.892 240.036 316.191 236.561 309.278 235.921 302.914 235.37 297.431 237.99 291.745 230.696 289.974 231.431 291.758 230.656 293.611 230.672 295.296 230.7 298.388 233.389 302.736 234.163 306.311 235.749 313.646 237.068 323.67 236.433 331.081 236.051 335.53 235.228 339.967 234.729 344.403L234.112 345.146C233.857 344.947 233.726 344.808 233.685 344.467 233.523 343.162 234.555 340.359 234.519 338.869 231.636 341.227 229.67 345.628 229.88 349.381M212.656 296.115C212.469 301.218 213.026 307.463 214.432 312.371 216.387 319.19 221.589 324.24 221.124 331.899 220.982 334.228 219.339 336.31 219.881 338.616 220.342 340.578 224.453 344.196 225.916 345.968 227.008 347.29 227.867 348.827 229.053 350.069 228.778 346.736 229.548 343.581 231.402 340.805 232.082 339.785 234.42 337.758 234.655 337.226 234.817 336.859 235.124 334.053 235.093 333.533 235.015 332.173 232.718 329.178 232.015 327.58 228.04 318.567 235.423 311.538 231.997 302.467 230.927 299.636 230.588 298.184 229.753 295.421 228.632 291.71 226.904 290.215 226.584 285.475 225.53 269.848 237.254 238.725 245.723 225.361 247.517 222.529 249.82 220.063 251.464 217.165 251.439 216.104 249.412 215.527 248.567 215.426 247.1 215.252 245.455 215.256 243.806 215.26 242.266 215.264 240.721 215.268 239.31 215.128 238.546 215.276 236.836 218.133 236.319 218.968 228.899 230.987 225.503 247.161 223.591 261.014L232.475 234.248C234.791 228.572 238.184 221.494 243.986 218.708 245.034 218.204 246.183 217.718 247.369 217.856L247.183 218.677C245.952 218.921 244.601 219.533 243.532 220.167 232.93 226.456 229.293 249.726 224.885 260.809 224.594 261.542 224.149 263.373 223.181 263.198 222.552 262.93 222.718 259.944 222.757 259.229 223.376 248.056 229.552 227.944 235.501 218.424 236.27 217.195 238.332 214.948 238.751 214.021 238.888 213.719 238.99 213.436 238.877 213.104 238.545 212.134 231.986 211.737 230.822 211.835 227.14 212.145 223.848 214.897 220.44 215.123 219.357 215.195 217.719 214.735 215.994 214.274 213.127 213.509 210.019 212.744 208.808 214.419 208.001 215.535 209.028 220.468 209.1 222.091 209.615 233.782 209.15 248.13 207.423 259.747 207.295 260.609 206.908 264.307 205.958 264.307 205.036 264.307 204.841 262.103 204.764 261.39 204.395 257.96 204.272 254.214 204.171 250.783 203.846 239.787 204.318 228.707 204.326 217.712 204.297 217.474 203.822 216.777 203.617 216.644 202.606 215.994 198.562 216.537 198.436 217.716 200.575 228.89 201.988 240.235 202.812 251.594 203.47 260.64 202.759 268.23 205.891 276.927 209.556 287.102 215.032 296.826 219.723 306.545L219.348 307.18 218.708 306.732 212.926 295.164C212.904 295.161 212.884 295.16 212.865 295.16 212.47 295.16 212.667 295.8 212.656 296.115M227.415 349.793 224.411 346.245C224.134 348.072 225.751 349.448 227.415 349.793M231.493 322.067 232.476 326.025 235.339 331.219C236.735 324.333 234.311 317.614 233.972 310.734ZM205.002 217.857 205.825 262.107C206.212 261.941 206.266 260.727 206.331 260.294 206.818 257.021 207.191 253.257 207.46 249.95 208.335 239.196 208.623 228.346 207.733 217.582Z"/>
</clipPath>
<clipPath id="clip_12">
<path transform="matrix(1,0,0,-1,0,595.276)" d="M67.249 340.949C68.401 339.993 69.837 339.792 69.62 341.708H78.001C77.726 341.25 77.121 341.199 76.874 340.58 76.671 340.072 76.822 339.296 76.499 339.02 76.281 338.835 75.462 338.684 75.008 338.365 74.511 338.015 74.325 337.46 74.073 337.26 73.006 336.409 70.307 334.459 69.124 333.72 66.904 332.333 63.643 331.583 61.592 330.294 60.133 329.377 59.51 324.617 59.157 322.847 56.752 310.758 55.531 298.421 53.749 286.228 53.9 285.584 56.408 285.127 57.071 285.029 57.724 284.934 60.057 284.575 60.38 285.167L63.815 307.987C63.971 306.211 64.019 304.509 63.815 302.728 63.591 300.775 62.637 298.244 62.542 296.465 62.293 291.83 61.154 287.606 60.837 283.154 60.722 281.546 60.842 281.651 62.266 281.202 64.752 280.417 70.226 279.054 72.563 280.025 73.593 280.453 74.073 281.525 74.901 281.77 75.806 282.038 79.358 282.211 79.957 281.486L80.58 253.757C80.607 253.319 80.9 253.264 81.224 253.112 84.11 251.764 87.982 252.112 90.904 253.147L93.476 287.368 93.932 285.036 96.269 284.793 98.788 253.27C98.902 252.926 99.099 252.899 99.393 252.8 100.159 252.543 103.481 252.113 104.324 252.129 104.924 252.139 108.41 253.001 108.737 253.322 109.157 253.734 108.901 256.969 108.938 257.846 109.501 271.23 109.661 284.815 109.815 298.207 109.924 307.77 109.433 314.635 108.113 324.014 108.04 324.53 108.239 326.565 107.729 326.683L105.721 326.781 107.463 327.19 107.659 328.821C108.548 328.539 111.24 326.352 111.083 328.479 110.959 330.175 109.237 330.922 107.949 331.583 105.731 332.722 101.245 334.12 99.621 335.716 98.428 336.889 97.984 338.962 95.857 339.151 95.309 339.832 97.5 341.708 97.664 341.708H114.749V244.2H100.888C98.528 244.2 95.193 240.613 95.193 238.293V234.964C96.172 234.712 97.389 234.553 98.329 234.943 98.911 235.4 98.531 237.291 98.626 238.084 98.854 239.988 100.672 240.814 102.396 240.974 107.084 241.411 112.116 241.22 117.149 241.029 121.695 240.856 126.243 240.683 130.54 240.974 131.861 241.16 134.304 239.355 134.304 238.079V234.964C135.262 234.755 136.715 234.433 137.528 235.072V238.722C137.528 240.885 133.953 244.2 131.833 244.2H118.187V341.708H139.247C139.158 341.267 138.584 341.21 138.379 340.909 138.031 340.4 138.004 339.037 137.928 338.945 137.868 338.874 136.765 338.621 136.232 338.171 135.335 337.412 134.942 336.103 133.978 335.27 133.193 334.592 131.357 333.711 130.366 333.294 127.615 332.137 126.681 332.057 124.217 330.204 123.275 329.495 122.13 327.922 123.23 326.941L126.353 328.178C126.644 325.338 127.493 322.417 126.685 319.577 126.476 318.843 125.954 318.361 125.807 317.879 125.374 316.467 127.623 309.647 127.973 307.567 128.659 303.494 126.751 299.344 125.813 295.319 122.935 282.959 121.316 270.354 119.243 257.836 119.307 256.594 122.008 255.945 123.049 255.824 123.91 255.724 126.415 255.919 127.007 255.484 127.389 255.204 126.96 254.296 128.45 253.705 131.092 252.656 137.329 252.222 140.225 252.351 141.641 252.414 149.091 253.289 149.67 254.294 150.222 255.251 149.264 255.577 151.393 255.794 153.463 256.006 156.199 255.495 157.685 257.453L153 286.938C154.794 287.378 156.789 287.258 158.545 287.735 160.739 288.332 162.113 290.135 164.292 290.754 164.694 289.824 166.008 288.931 166.416 288.212 166.803 287.535 166.774 285.922 167.551 285.688 168.16 285.504 171.76 286.248 172.329 286.629 173.24 287.24 172.263 288.533 172.345 289.403 172.382 289.779 172.813 290.117 172.943 290.527 174.689 296.005 171.525 305.555 170.475 311.385 169.628 316.093 169.133 320.969 168.191 325.64 167.664 328.256 167.743 329.62 165.316 331.141 161.404 333.592 159.006 333.731 155.675 337.4 155.393 337.711 154.931 338.277 154.615 338.488 154.075 338.848 153.734 338.777 153.369 338.961 152.051 339.623 154.375 341.387 155.048 341.703L163.318 341.709 163.344 340.448C167.395 339.478 167.735 346.223 164.065 346.234 162.746 346.238 163.939 344.876 162.574 344.704 161.501 344.569 155.317 344.606 154.64 344.956 153.792 345.395 153.941 346.072 152.462 346.022 151.011 345.973 150.783 344.852 149.873 344.732 148.674 344.575 141.179 344.582 140.456 344.956 140.047 345.168 139.776 345.744 139.26 345.907 137.128 346.579 136.691 344.864 135.498 344.704 130.53 344.776 125.547 344.746 120.566 344.716 112.846 344.669 105.13 344.624 97.476 344.956 96.629 345.953 95.442 346.356 94.173 345.841 93.614 345.613 93.356 344.841 92.717 344.72 90.774 344.852 88.716 344.77 86.659 344.689 84.397 344.599 82.136 344.51 80.033 344.705 78.54 344.844 78.656 345.967 77.036 346.023 75.35 346.081 75.331 344.888 74.45 344.72 73.87 344.609 69.682 344.648 69.499 344.915L69.405 346.219C69.27 346.236 69.138 346.245 69.009 346.244 66.343 346.244 65.11 342.722 67.249 340.949M164.178 345.359C166.382 344.56 166.488 341.745 164.176 341.277L163.853 342.567H154.935L155.149 344.072 163.639 344.07C164.337 344.135 164.18 344.822 164.178 345.359M67.601 341.731C66.485 342.977 66.968 344.666 68.44 345.354L68.76 344.069H74.349L74.226 343.425 74.882 343.21 75.208 344.071H78.646V342.567H69.082C68.629 342.427 68.945 341.041 68.489 341.041 68.322 341.041 68.051 341.228 67.601 341.731M94.334 344.822C94.807 345.31 96.169 345.384 96.482 344.717ZM139.46 344.927 137.313 344.717C137.713 345.501 138.811 345.089 139.46 344.927M75.854 344.927C76.504 345.089 77.602 345.501 78.001 344.717ZM153.644 344.927 151.498 344.717C151.92 345.415 153.029 345.119 153.644 344.927M136.652 343.975C136.816 344.091 137.011 344.058 137.195 344.082 138.54 344.254 140.641 344.452 140.107 342.567H117.65L117.328 342.245V243.34H132.048C133.531 243.34 136.669 240.426 136.669 238.937V235.608L135.163 235.607C135.374 238.112 134.747 240.623 132.161 241.521L101.121 241.603C98.239 240.963 97.448 238.291 97.772 235.607H96.052C95.778 238.181 96.419 240.818 98.645 242.36 99.006 242.61 100.546 243.34 100.888 243.34H115.286L115.609 243.662V342.245L115.286 342.567H97.771L98.108 344.079 135.81 344.069 135.687 343.425 136.345 343.21ZM93.689 343.963C94.017 344.167 94.879 344.12 95.65 344.073 96.095 344.046 96.509 344.019 96.774 344.04 97.312 343.864 97.101 343.03 97.127 342.567H79.505V344.071H92.615V343.21C92.715 343.181 92.802 343.167 92.878 343.167 93.393 343.167 93.403 343.784 93.689 343.963M140.967 344.071H149.777L149.778 343.21 150.52 343.198 150.985 344.045 153.938 344.04C154.475 343.864 154.264 343.03 154.291 342.567H140.752ZM145.627 333.795C144.76 334.257 143.766 334.62 143.013 335.27 141.95 336.186 141.561 337.738 140.432 338.488 139.539 339.081 138.357 338.729 138.981 340.15 139.081 340.379 140.323 341.708 140.43 341.708H153.431C153.301 341.25 152.641 341.02 152.469 340.629 152.267 340.171 152.417 339.256 152.087 338.968 151.913 338.815 151.032 338.657 150.53 338.27 149.848 337.744 149.635 336.931 149.118 336.46 148.89 336.252 148.492 336.196 148.286 336.004 147.849 335.595 146.111 333.794 145.642 333.794 145.637 333.794 145.632 333.794 145.627 333.795M79.183 341.708H96.268C96.179 341.267 95.6 341.209 95.398 340.91 95.086 340.444 95.11 339.462 94.87 339.132 94.712 338.915 93.572 338.612 93.118 338.197 92.296 337.441 91.874 336.11 90.788 335.265 90.329 334.908 86.911 333.161 86.527 333.172 85.333 333.205 82.788 335.728 81.727 336.519 81.235 336.885 80.654 336.965 80.284 337.224 79.531 337.75 79.071 339.163 77.582 338.926 76.927 339.612 78.968 341.708 79.183 341.708M87.675 332.58C87.689 332.807 91.024 334.306 91.643 334.84 93.189 336.176 93.299 338.547 95.921 338.257 97.568 338.075 97.78 336.636 98.636 335.592 100.862 332.882 106.857 331.838 109.741 329.616L110.129 328.393 95.709 335.693C94.361 335.828 90.158 332.771 88.538 332.356 88.43 332.328 88.283 332.306 88.14 332.306 87.894 332.306 87.663 332.37 87.675 332.58M150.328 336.755C151.336 338.035 152.588 338.772 154.151 337.81 154.763 337.433 156.772 334.759 156.007 334.191L152.839 335.654C152.021 335.813 150.342 334.286 149.861 334.21 149.806 334.201 149.756 334.197 149.71 334.197 148.677 334.197 150.017 336.36 150.328 336.755M74.358 334.627C73.432 335.285 75.507 338.896 77.965 338.13 78.725 337.893 80.067 336.352 80.149 335.569 80.292 334.198 79.313 334.686 78.352 335.173 77.853 335.426 77.359 335.678 77.029 335.672 76.495 335.66 75.086 334.586 74.514 334.586 74.451 334.586 74.398 334.599 74.358 334.627M129.713 332.014C131.112 333.082 133.421 333.495 134.873 334.912 136.069 336.077 136.372 338.232 138.496 338.231 140.493 338.231 140.656 336.778 141.617 335.592 143.013 333.866 145.556 332.764 147.601 332.017 147.634 331.721 147.819 331.039 147.312 331.188L138.496 335.678C135.623 334.557 133.069 332.73 130.293 331.435 129.981 331.289 129.727 331.226 129.549 331.226 129.137 331.226 129.125 331.565 129.713 332.014M73.871 328.236C73.559 328.766 72.733 330.345 72.641 330.874 72.454 331.943 72.384 334.448 72.788 335.429 72.884 335.665 73.022 335.943 73.271 335.695 73.513 333.562 75.127 332.073 76.289 330.432L74.237 327.964C74.162 327.949 74.104 327.942 74.061 327.942 73.859 327.942 73.956 328.092 73.871 328.236M77.79 330.432 79.553 332.533 81.329 335.692C81.924 335.408 81.751 331.754 81.642 331.089 81.474 330.07 80.59 328.987 80.362 327.963 80.334 327.942 80.302 327.933 80.266 327.933 79.716 327.933 78.283 330.195 77.79 330.432M156.975 335.049C157.196 334.715 157.932 334.269 158.059 333.97 158.417 333.126 155.396 328.863 154.076 328.823 155.356 330.755 156.522 332.731 156.975 335.049M148.382 335.049 149.132 332.473C147.176 332.744 146.776 333.805 148.382 335.049M89.696 331.594C89.472 331.708 89.29 331.482 89.392 332.04L95.52 334.813 106.762 329.431 106.799 327.747H105.722L105.714 329.242 103.359 329.251V327.748H94.118C93.988 330.39 91.59 330.628 89.696 331.594M74.994 333.64C75.033 333.815 76.836 334.767 77.069 334.787 77.344 334.811 77.7 334.593 78.076 334.375 78.481 334.141 78.91 333.907 79.291 333.974 79.633 333.584 77.628 331.314 77.219 330.985 77.209 330.983 77.198 330.982 77.187 330.982 76.633 330.982 75.197 333.103 74.994 333.64M129.808 330.305 138.366 334.725 142.9 332.685C143.102 332.417 139.578 330.865 139.261 330.633 137.038 329.004 137.202 323.405 136.451 320.873 131.952 321.773 130.836 326.47 129.808 330.305M150.207 333.334C150.222 333.615 150.527 333.675 150.708 333.798 152.878 335.28 152.881 334.706 155.149 333.758 155.185 333.341 155.18 333.346 155.035 333.352 154.984 333.354 154.914 333.355 154.823 333.339 154.046 333.195 153.312 333.13 152.58 333.13 151.805 333.13 151.031 333.203 150.207 333.334M82.334 329.284 82.516 334.62C84.842 333.661 85.464 331.049 85.926 328.847 85.278 328.44 84.834 328.28 84.454 328.28 83.792 328.28 83.328 328.767 82.334 329.284M68.313 328.953C69.009 331.158 69.472 333.463 71.663 334.619L71.95 329.283 69.943 328.192ZM158.159 331.617 158.793 333.241 164.827 330.43 165.003 330.046 164.604 328.606ZM149.992 332.685C150.269 332.793 150.484 332.473 150.529 332.473 152.025 332.473 153.551 332.403 155.042 332.473 155.059 332.473 155.551 332.99 155.362 332.37 155.239 331.969 153.848 329.753 153.508 329.696 153.031 329.781 149.687 332.419 149.992 332.685M86.826 326.367C86.636 326.626 85.684 327.203 85.309 327.322 85.126 328.075 86.752 328.217 86.826 328.534L85.738 332.472 91.931 329.555C91.57 327.422 91.144 325.281 90.897 323.128 90.335 318.231 89.771 312.566 89.608 307.664 89.52 305.033 89.642 302.392 90.252 299.829L86.821 299.408C85.934 304.048 86.633 308.709 87.025 313.358H86.383L85.729 305.742 86.18 299.313 84.763 298.761C84.529 297.946 84.805 294.976 85.67 294.714 86.874 294.349 89.281 295.129 90.582 295.261L90.795 295.114 92.641 282.31C92.335 281.967 89.625 281.393 88.963 281.246 84.345 280.217 80.519 279.302 79.176 284.999 78.269 288.847 77.893 299.478 78.857 303.16 80.121 307.985 82.922 312.824 84.336 317.657 84.774 318.163 88.172 318.103 89.027 318.554 89.717 318.917 89.377 320.806 89.033 320.887L85.307 320.448C85.711 321.615 87.526 325.414 86.826 326.367M64.273 299.965C64.072 300.565 64.644 302.541 64.686 303.361 64.965 308.794 64.173 316.12 63.6 321.625 63.323 324.29 62.922 326.964 62.382 329.586L68.76 332.471 67.324 328.709 69.189 327.641C68.811 327.058 67.103 326.488 67.136 325.801 67.204 324.445 69.098 319.843 69.674 318.244 71.708 312.584 75.639 305.053 76.032 299.258 76.285 295.531 75.914 285.977 74.244 282.856 71.854 278.39 65.424 281.415 61.66 282.356L63.605 295.318C64.687 295.187 67.421 294.33 68.339 294.549 69.535 294.836 69.781 297.746 69.521 298.761L68.102 299.313C68.612 303.228 68.596 307.159 68.09 311.076 67.997 311.787 67.994 312.801 67.575 313.356 67.075 313.466 67.233 312.908 67.248 312.599 67.339 310.68 67.819 308.54 67.899 306.589 67.997 304.18 67.804 301.786 67.46 299.409 66.862 299.414 64.442 299.465 64.273 299.965M140.563 330.512 143.704 332.007 145.693 331.18C145.806 330.678 145.62 330.836 145.417 330.703 144.285 329.961 142.23 329.311 140.97 328.606ZM129.156 304.991C128.965 306.365 128.745 307.749 128.435 309.102 128.003 310.997 126.483 315.505 126.554 317.114 126.589 317.877 127.364 318.834 127.547 319.789 127.95 321.897 127.688 324.405 127.394 326.533 127.262 327.488 126.486 329.979 126.563 330.649 126.629 331.224 127.94 331.687 128.5 331.829 129.82 327.15 131.047 320.523 136.984 320.008 138.04 319.917 139.715 319.947 140.763 320.112 146.298 320.983 147.144 327.435 148.49 331.828L150.32 330.971C150.578 330.551 149.427 325.697 149.35 324.631 149.236 323.035 149.224 320.481 149.712 318.984 149.918 318.353 150.528 317.717 150.53 317.203 150.54 315.553 149.017 311.044 148.594 309.064 148.31 307.739 148.128 306.4 147.858 305.074L144.191 304.768C144.265 307.486 145.606 310.505 145.886 313.06 145.92 313.368 146.108 313.887 145.59 313.785 144.326 310.891 144.124 307.643 143.523 304.575 140.153 304.353 136.789 304.174 133.431 304.645 132.818 307.407 132.79 310.432 131.791 313.101 131.68 313.4 131.612 313.815 131.191 313.789L132.799 304.768ZM154.076 308.525C154.156 308.807 155.965 310.381 156.172 311.154 156.521 312.459 155.498 314.001 155.838 315.138 156.078 315.94 157.851 316.208 157.957 317.764 158.131 320.311 155.484 325.363 154.525 327.815L157.832 331.132 159.002 330.411 157.945 327.105C158.272 326.709 158.701 327.948 158.771 328.102 158.95 328.496 159.376 330.034 159.451 330.109 159.569 330.226 159.902 330.269 159.83 329.84 159.726 329.222 159.007 326.519 159.12 326.243 159.317 325.765 159.345 326.017 159.497 326.299 159.995 327.224 160.132 328.629 160.309 329.68 160.72 330.122 161.167 328.474 161.167 328.285V325.063C161.167 325.026 161.456 324.725 161.595 324.741L161.383 329.25 164.191 327.82C163.578 324.851 163.397 321.873 163.534 318.837 163.582 317.749 163.982 316.523 163.977 315.394 163.965 311.632 163.178 308.483 163.534 304.447 163.901 300.28 165.141 296.196 165.263 292.011 162.805 291.563 160.972 289.389 158.707 288.647 157.217 288.159 155.615 288.231 154.076 288.013ZM147.184 330.191 146.767 328.392C145.874 329.087 145.487 331.46 147.184 330.191M151.102 329.071 151.068 330.109C151.284 330.365 153.653 328.819 153.213 327.963ZM125.602 330.105C125.975 329.854 126.005 329.47 125.896 329.061L123.777 327.963C123.705 329.157 124.79 329.549 125.602 330.105M144.873 329.534C144.96 329.821 145.183 329.952 145.477 329.895 145.488 329.134 146.29 328.046 146.333 327.412 146.43 325.97 143.9 321.529 142.042 321.521 142.051 323.693 141.757 325.864 141.186 327.949L144.189 329.25C144.441 328.97 143.725 326.362 144.617 326.029 144.669 327.019 144.594 328.612 144.873 329.534M137.403 320.861C137.281 321.023 137.317 321.196 137.325 321.379 137.381 322.778 138.42 328.2 139.153 329.237 139.33 329.486 139.573 329.679 139.785 329.894 140.904 328.28 139.408 327.113 139.463 325.386 140.163 325.267 140.187 326.565 140.318 327.002 140.41 327.309 140.184 327.38 140.75 327.319 141.022 325.264 141.563 323.21 141.367 321.119 140.865 320.952 139.35 320.628 138.332 320.628 137.881 320.628 137.527 320.691 137.403 320.861M165.893 325.386C166.178 327.006 164.484 328.457 165.787 329.891 166.649 329.138 166.862 327.98 167.117 326.928 168.296 322.049 168.703 316.588 169.616 311.6 170.542 306.536 173.637 296.448 172.498 291.831 172.324 291.126 171.913 289.796 171.053 289.733 171.571 291.223 171.514 292.682 171.481 294.241 171.206 294.605 171.091 294.214 171.054 293.922 170.949 293.081 170.82 289.776 170.196 289.408 169.814 289.182 168.717 289.204 168.364 289.515 167.887 289.934 167.603 291.66 167.396 292.309 166.552 292.498 167.13 290.955 167.244 290.543 167.415 289.926 168.179 289.308 167.494 288.877 166.666 288.706 165.191 290.476 165.236 291.115 165.251 291.315 166.141 291.159 166.126 292.632 166.07 298.228 163.888 303.835 164.167 310.037 164.335 313.766 164.389 315.731 164.179 319.482 164.032 322.114 164.189 324.764 164.823 327.316 165.504 327.089 165.042 325.382 165.829 325.382 165.849 325.382 165.871 325.384 165.893 325.386M76.254 286.86C77.196 293.737 76.484 300.797 76.505 307.657 76.529 314.875 76.432 322.104 76.541 329.314 76.842 329.946 77.261 330.103 77.675 329.462 77.836 320.723 77.837 311.91 77.796 303.145 77.793 302.532 77.566 302.005 77.562 301.446 77.526 295.222 77.255 288.616 79.076 282.644H75.208C75.649 284.033 76.055 285.404 76.254 286.86M54.572 286.408C56.079 297.05 57.276 307.755 59.157 318.337 59.582 320.726 59.979 323.203 60.526 325.561 60.809 326.785 61.04 328.601 61.881 329.466 62.31 326.15 62.886 322.813 63.172 319.477 63.635 314.075 63.308 311.364 62.564 306.127 61.595 299.305 60.587 292.486 59.735 285.65ZM90.681 312.178C91.337 317.593 91.139 323.628 92.403 328.93 92.48 329.256 92.255 329.307 92.826 329.251 96.299 315.181 97.69 300.635 99.706 286.296L94.547 285.65ZM82.405 328.82 86.29 325.815 86.355 325.534 79.502 306.916ZM67.922 325.72C69.302 326.659 70.708 327.607 71.878 328.82L74.99 306.915ZM104.219 325.385V328.607H105.077C105.177 327.518 104.729 326.483 104.863 325.384ZM78.43 328.392C79.206 328.09 79.675 326.177 80.689 327.102 80.96 327.348 81.024 328.404 81.442 328.282L78.43 307.559ZM75.852 328.392V307.773L72.84 328.281 73.584 327.093 74.21 326.691ZM150.639 328.177C151.246 327.981 150.978 327.569 150.849 327.105L150.639 327.104ZM149.984 322.922C150.079 324.576 150.34 326.034 151.709 327.103L150.205 322.165C150.188 322.162 150.172 322.161 150.157 322.161 149.857 322.161 149.971 322.698 149.984 322.922M153.863 326.888C154.697 326.204 155.118 324.749 155.526 323.72 156.065 322.364 157.252 319.284 157.223 317.935 157.196 316.728 156.175 316.563 155.367 315.935 155.102 317.473 155.146 319.325 154.75 320.807 154.651 321.178 154.903 321.404 154.291 321.303L155.551 311.734 154.077 309.706 153.648 324.74 154.128 322.967 154.723 322.703ZM94.863 325.8C94.34 325.859 94.367 326.423 94.333 326.888H103.359L103.361 326.245C102.097 326.305 100.777 326.15 99.455 325.995 98.335 325.864 97.213 325.733 96.122 325.733 95.697 325.733 95.276 325.753 94.863 325.8M151.919 292.624C151.351 299.806 151.938 308.578 152.15 315.819 152.251 319.259 152.352 322.698 152.356 326.14L152.785 326.46C153.139 323.935 152.891 321.372 152.992 318.826 153.013 318.317 153.206 317.848 153.225 317.34 153.579 307.52 153.381 297.645 153.43 287.797H152.787C152.772 289.44 152.047 291.003 151.919 292.624M105.63 324.726 105.722 325.815H107.229V323.881L102.283 323.451 102.284 325.386 103.331 325.354 103.706 324.552ZM101.018 325.03 101.639 325.384 101.854 322.164 101.211 322.162ZM94.764 324.954 100.567 325.171 100.44 323.213 95.495 322.817C94.766 322.826 94.956 324.426 94.764 324.954M150.661 318.857C149.811 321.01 151.105 322.824 151.604 324.958L151.494 317.654C151.187 317.806 150.779 318.559 150.661 318.857M105.726 322.717 105.729 323.012 107.414 323.208 108.729 314.432ZM102.507 322.8 105.076 323.023C105.635 320.891 106.249 318.754 107.008 316.683 108.271 313.242 109.147 312.345 109.169 308.32 109.174 307.382 108.938 306.529 108.938 305.742 108.93 288.502 108.304 271.302 108.198 254.075L104.65 253.006 102.498 308.204 101.856 308.203 103.893 253.002 99.479 253.783 96.908 284.891C96.897 285.269 100.554 285.15 100.465 286.393L95.193 322.161C95.818 322.149 96.524 322.231 97.242 322.312 98.286 322.431 99.355 322.55 100.246 322.381 100.87 322.261 100.759 321.544 101.3 321.524 101.32 321.523 101.34 321.523 101.359 321.523 102.09 321.523 102.675 322.027 102.507 322.8M85.12 319.774 88.745 320.229C88.743 319.81 88.884 319.125 88.394 318.971L84.663 318.514ZM151.174 316.152C151.576 314.146 150.923 312.154 151.066 310.137 148.729 310.842 151.138 314.449 151.174 316.152M148.695 305.098 149.564 310.135C149.691 310.281 151.282 308.852 151.282 308.74V295.531ZM92.646 288.152C92.018 290.907 91.934 293.731 91.742 296.465 91.597 298.513 90.635 300.994 90.469 303.159 90.354 304.656 90.544 306.264 90.467 307.772L93.177 290.447 93.042 287.371C93.034 287.37 93.027 287.37 93.02 287.37 92.695 287.37 92.7 287.915 92.646 288.152M120.22 257.733 120.132 258.234C122.549 273.705 124.735 289.246 128.933 304.338 135.229 303.385 141.752 303.395 148.05 304.333 151.37 292.685 153.479 280.731 155.329 268.755 155.903 265.039 156.532 261.279 156.832 257.55 154.581 256.331 152.014 256.752 149.562 256.441L146.338 287.157 145.696 287.156 148.823 254.711C142.147 252.653 134.77 252.744 128.091 254.744L131.514 287.034 130.973 287.158 127.426 256.226C125.113 257.125 122.247 256.055 120.22 257.733M85.84 295.525 85.307 298.322 90.456 298.958C90.345 298.328 91.239 296.416 90.69 296.057L86.253 295.327ZM63.936 295.971C62.752 296.257 63.977 298.111 63.826 298.958L68.976 298.322C68.803 297.723 68.733 295.507 68.194 295.331 66.846 295.614 65.246 295.654 63.936 295.971M167.399 288.228 171.696 288.873 171.7 287.262 167.625 286.523ZM86.43 279.267C86.514 279.598 86.619 279.878 86.966 280.021 88.263 280.553 90.932 280.686 92.398 281.14L90.044 253.788 85.523 253.005ZM81.425 253.994 81.011 280.281C82.664 279.72 84.205 279.373 85.951 279.851L84.775 253.009Z"/>
</clipPath>
</defs>
<g inkscape:groupmode="layer" inkscape:label="Layer 1">
<g clip-path="url(#clip_1)">
<image x="584" y="260" width="97" height="88" xlink:href="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAGEAAABYCAYAAADlc5nGAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAC9klEQVR4nO2ba1PTQBSG+VvKMIzD4A1FtDZtaYuIIIo3vP0jQNEf
uZ60CdaYtE26m5zdPB/eD83XZ/bZfc+crt06+G2q5HaS9fE0G+NfZmP0N5uja7M5
vDZ34uz/nGQrziDOD7Mdpz/Nvd7VJA+iNJfmYffS7EgeSR4neSLf9yRPJc8kHfn2
XNKVRJKepC/fB5J9yUgy7l6YA8kLyaHkpeQoujCvJMeSE/n9WnIqeTOTt0nOJO+S
vI+m+ZDko+RTkvMkn5N8kXyVfJvJ94KsuYCQApgLIQFw9z8IAiAHwm60HIQUwNAy
hBRAeyB0y0PInoIshMMcCCfRFECQEGzqaGdGRymIGwjRfB0NS56E0zkQvNPRBMKi
kzBwo6O+Ix15B0GjjoogBKujKhDu9/JVVAShsySEWQBl74SzJSGca4Swmo6uVtbR
AB0190StoiOeqHPuhEU6KnMnVNWR1xBozAog0JhDgEBj1quj3SwEGnO7GrN3J0Gj
jmjMlhtzqqKFEDIAaMw16ojG7FljRkcrNGYGeE51ZGeAR2OmMQcAwfITlQEejdnH
O4HGHKSOGOBZ1lF25aWzQEd5rfmfkxChIxpzm3REY3YAgcbsVEc0Zh0noSIEVl4U
3wk0ZpcrLzRmfTpigKdYRzRmxwM8GrOTJyqNOVgd5UEIWkdqGnOOivIgZFVEY7ak
IxqzR40ZHdVwJzDAa3iAR2OmMXsOgQGeJR0pGeDRmANaefEOgjYdtXKAR2NWAKFp
HdGYG3qisvKi9U5ARzRmv08CjVkBBAZ4YemotY25SR3xJxGFOmKAp3SAF4MIXkca
GjMDPE8ac9A6UnMnFKiIxqx4gBfUncDKSwgQam7M6KjmAR6NmQGeRxBozJZ0RGNW
AIGVF3TEyosWCAUq4olKY/bkJNCYFUCgMYejo6VWXgpAoCMaswIIShpzi3XkfuWl
FY05xJWX9kGgMVvSkfIB3lEJHWVB+AOBlRfPdVRTYw5aR5ruBBozAzyPT0LLGvMf
8uZx7H6HYEsAAAAASUVORK5CYII="/>
</g>
<g clip-path="url(#clip_2)">
<image x="423" y="260" width="59" height="70" xlink:href="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAADsAAABGCAYAAABymeysAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAACV0lEQVR4nO2a7VKCQBSGva1qGsdx1FJLs0BRsLKstMw+70hT8yK3
gywNbUDgEuzXj2dG/ffOeZg972Jup79GNrvAnmXzifZNh7y5QvneChVsuktUtDGW
qGQsUKmzQJX2x4ZD3WaOqtoc1YAj4Bi+N4AToAWcwm8a0AY68L0L9ABTm6E+cAFc
AgN9hq6AIXy+AW6BO8wIGAP3wIPuMAEegSnwhHkGXoBX4A3zDuR8w1r+YQs4bBGH
dQMf4MBV3Qlb9wRu4sB22DNAx4ENHNgE7LDnnsCbsHrGYcnJlnFYcrJu2AYO2yLC
2pM13MkSYb8ny0vYKBobPhr/CJuOxmsqjatBGuvOZDWlsaAa/wobpHE6YdPX2GJZ
4yKlxmHPLHca1z0aN0XTuEJoXJNRY7VBBWic0TObrMbe48ersbcM+Gl8zcpkSY2d
oyeaxmqDyvToUX2WUmNVBFjQWJ4+G/1apkwWgS01ZnqDotVYqCLAUZ+luF0M0Zjb
DSquxsIXgbh9lrlnluaSXEqN1QaVqcYpFgFL46wIRLqWkXWDkk5j5ouA0lgVAQGK
QJLXMsJuUHE05vKZVRpH1HigNGY4bOQ+y/rRk8Tt4l9lIEzjMWuTDdJYug2KLY3V
i63/u5YReoNiS2P1Ymv7P32F9Vnhi4A7WSE2KKH7LM21zDZFgJsNSugiEFVjZo+e
JDSm6bOkxpOsJyulxoL2WTqN/frs0CfsKETjaVaTjaMx9xuUn8ZsFgHVZ9PTWKgN
Kkxj7o6eRPosL2Fpr2WE2qBUn5VB47hFgAzM/AaVlcZfed6E9SsAgwUAAAAASUVO
RK5CYII="/>
</g>
<g clip-path="url(#clip_3)">
<image x="730" y="260" width="86" height="79" xlink:href="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAFYAAABPCAYAAABxjzKkAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAC0klEQVR4nO2c6U7jMBRGeS0GITSqWGbKDgmEtlD2fZ95I5hheUhz
o7riqkqaOGni6/j78UmoP4+io+M6dGp6/1ON2w+9md6nmu19DNb9UHPddzXXGexn
vL031YoXxfuv5ncHW6At7vxTS7RfYbxX9Tt4VW3aMm2FtkqfrdE2aJu0LfpsmxbQ
dmi79FlE26N1ab3gRe3T+nqHtOPwRZ3QTunvM9o57YLtknZFu6bdhN+7pd3R7vUe
9B5pT3rPtD96f3NuygTsDAPL4Q7BcrjzDG4MdnEE7CjcGOx6AtyQwY3BdjTcGOwB
A3sUDuCehuPBjsIdgr0TBbaTDXYhBWzSEzsEu6XBBgxsxMHqJ3aSYK0+sbN5wA5V
EJmrYD2HCjpMBaNgoYIUuEkqCEqo4NzgiZWlghKObeutjHFsnSqQBTZVBeUdu83A
GqkgA+y1dMcit4SqIK9jy+SWu46tUAXILeSWIBUUzK2oIhVwuDLAljx5tVNUkORY
5FYNuZUGFrmF3LJ78kJuTVgFNo60YlSA3BKqgrK51UNuFVdBqmORW/XmVh6wyC3D
3IJjDXPLzxsE5Ja7ueXFDQJyq+m5ldOxyC3kFnJLvGOL5JbfNwi4TERuiQFbRW4V
VQHPrb4XKhCUW84caWtTAXLLbm419wahhvcKkFuO55Zox7aQW/Zzq+jJi3s2KbdO
oALkVqNyS/yR1lZu+fHCRs0nL79vEJBbyC25KkBuuaWCpPcKkFvILeSWGLBSc8uP
GwTklhu5ZayCDLDIrRS4XAX8pY08uZXkWe9VUGVuWQeL3GpwbuEyseIvunGkncBr
nEVzqzFHWuSWEBWY/F5BVm7x/wA/S/AscivPyQu5hdxCbvmgAuQWcsuP3HL2/Vjb
J69xX3Rn/eAOcgu51azcEgMWueWgCkzfK8ANgtDcsg626twq+14Bcgu5hdwSoQLk
FnLLQccKyS3bjv0CXkLe4Ce3kJUAAAAASUVORK5CYII="/>
</g>
<g clip-path="url(#clip_4)">
<image x="508" y="260" width="68" height="70" xlink:href="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAEQAAABGCAYAAAB12zK5AAAACXBIWXMAAA7EAAAO
xAGVKw4bAAACQklEQVR4nO2b6VLCMBRGfS11HMZxcEFckWBZFEURcd/eSHF7yPhV
okZsSqEBS/P9ODNMf57JYcm9TE3vvUufGTBb6zJXe5Nz1S6Z6qvMVF7lvE/55ZMF
H+9FZr1nmd19lotgqdSRy2BFdGROPMlc8UmugjxYAxt4tgm2wDYo4FkRCFACHp6V
QQVUi49yD+yDOjgAh+JRHoFjvG6CE9BSnCra4Ayciy4XiktwBa4VN4pbcAfuFQ9g
aighnk9Xhi7El7GiyVhVMtbFbyEFsKMJ2RU/QqqgpoTUNSENJaRpSchtXCGZkBOS
VUKCpOR7pOgn5EtKSUmJdEJEEk8IkzEk49lPpsJkApIBQSekYUimZRBybhCiSxlL
MiYhTieTS3syYR+7NnLxtFxq2umoG3LpFdL+VyGWktlJVzJ/hXzLEEyGyTCZyMl0
mIyTyYR9U2UyBiFMhskwmdj3IWsB9yFMRnsPCUum3CeZLyFMhsmYk7ElZKTJmK4Q
mUyMZCLfuk96MkG37gXx+wqRybiSTD8pTCZmMrqQVCQT9OOOyTCZwWe76UlmiEEV
k7GdjGAyDiQjmAyTcTAZO7NdJhPy0ZvaDaK4S3dMhskwGZeTGWy263Qyzu6purfa
bXEdwpSMfuvOZNKWTJAQJ5MxzXbj/oGIybiQDNchisOtQ0xMMuMYVA2SS1Qhl2MR
wmSYzMj+hMhkmIz9DaIoySTgPsT+oCpotTuxyXBPNUHJ9K52Mxkm41gyUWe7E5bM
eAZVTIbJMJlEJ/MB0C9Bq3xvjQwAAAAASUVORK5CYII="/>
</g>
<g clip-path="url(#clip_5)">
<image x="329" y="259" width="69" height="71" xlink:href="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAEUAAABHCAYAAABRRYoiAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAACNElEQVR4nO2b207CQBRF/S00hhgDRkREkeFWLooiKqKi/hF4gY8c
T9NBxqZIKy2d6eyHlZA+rsyi5fSwlWrN+LZgpznju82pgzXlaeuLpxsOezb1T75v
U7P54JmqQ5Y4qLzzQ+aQYxOeK0/4EZEnjokTulYkTokzokTXygQjKkSNrtWJBmGV
x7xFtIkOcUFcsjG/Iq7pc4+4IfqCW8EdcU8MmMODYEg8Ek+CZ8GIeCFeBW+CrZQk
5EeKFUyKLWQhZSHkSAgpsN9SSsS5JKXKFlIsoimkdCQpXSGlF5KUUShSSIYsJeND
St4lRT4lcykVSUpDktKWpNinxJZyzRZC3FLuopCCfBTOp4F8DM+n4JHPOfJBPp75
FFfkU1+Rz1wK8kE+yAf5IB8f+ZR85CNL6YYsBfnomk/VhHxyyCf8fORbMvIxNR/3
PAX56JTPf6VkA0jxO0/xSieWeUqU+QQdR2qbj58n2qX5sPDzUUIK8tlwPvrckpFP
vPk0PU4J8tEmn3/MU8LKxz2OVD6fqF+GGZePkeNIr3wwzUc+yAf5GLuKEXc+Rowj
kQ/yQT6x5qPdOBL5qJQPQz7Jz0e7VYxQTwpbMx/mb6Lf9xAjSxkskSKLQT7IB/mY
mY+aT7RYxdj8y7Cg6fiVMlTmO2XNfPT5QYh8krOKoVU+fy0CIp+Q8lHqiRb5bOhf
HMjHRz7arWIgn4jy0fddskL5JGqeYvwqRhT5qDdPiXGPNtHjSOSDfJBP4vP5Bj17
jccpUp+5AAAAAElFTkSuQmCC"/>
</g>
<g clip-path="url(#clip_6)">
<image x="696" y="260" width="11" height="70" xlink:href="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAAsAAABGCAYAAAAaam6UAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAABhUlEQVR4nNXV607CQBCGYW7LGELMBhU8gOIubSl4wBOeNfGOoFS4
yGFWt3SzbXe2BiL+mPDDN8F8D4XK1mAO1XAGzI+hISbQxvPxLvkY7vGexBje8D7x
KjLe7s+hFn5B3ZvCAZ/AGd4Aw1u8R56JZ1Dr/cSHWnyXF1dVvKtirsWZf0PGOxjv
dSM4UvG5NQ7iZSyscZjGx7hEF+MLW8wCOV0ELS3OnS7dOfre2RNOsQOKjOv+FJr4
9idkrKZzEkymcxaUsRSkUcKSKGztKK2VozBnFE3wFMMA70rYBNXOtKC2sylIopCC
cud9hSJcUdwE14gSQ1M4ojBnFE2wg9fDeGiL9Z1JQWagWAVNFFLQfFL+CKWhUMid
dZRemTikUJiB0qdQkp25i2Dy4f+PKD69c/pYBeTOhuA1/nGE8TO+vhfFHSV4Y41X
gZIf+xuF0nZFMR8rcucEZVgmloIPZQRl/FIkqP9MbACKVxblV991BdNlH6tR4XQF
gjL+oOIE5dUWLwV5Nl4ARxYAI/2b8YIAAAAASUVORK5CYII="/>
</g>
<g clip-path="url(#clip_7)">
<image x="34" y="217" width="146" height="69" xlink:href="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAJIAAABFCAYAAAChQL8ZAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAADEUlEQVR4nO2d207bQBgGea22qiqEKD0AhVI7gQQI0AA9Aj28UQ+0
fciwJmuy2SzNxrbsf9dzMXe+HH3/RNhi6cHBv1HOQ4tH+yZ/R49z+tM86f8Z05uw
nLN3fcdKzm7O71tWM7oTnirWOr+meJ6a/By9yEjGvDRYV2wYbKrnXmm2NNuK15qd
DPXcG02iSRUdTVc9s6vZ0/QU/Yzkx2hfcaA51Aw0R5rjdMyJ4q1mqDhNJpxpzh28
M3hv8EHzMZ3lk8FngwvNpYMrgy8GXzXfHHxXLDUt0qqHSM860xLdJ9K6JVImkS3S
ti1SMitSaoiUSWSL1Jsj0sBDpKEl0llNIl2kEYi0PCPSdWOLlMu0Y8m08CIp/rdI
A4dIpky+i3ReQCRTJt9FMmUSK1LRRVqreZFMkWJbpChO2yKL5HXeksVkKrNI3XR2
kXKZyizS0LFI82RyiTRPpugXqcrT5rNIxHYEixRSbLvWqPLTVmCNiG1im9huepGI
bU5bLbFtLxKx3cJFIraJ7epOW5fYJrZLiURsE9vENrHdlEh1xba9SMR2CxaJ2Ca2
ie0FT1sVa0RsC3+xjdgO/LQR28R2rX9rKxPbVfz8J7YFiURsE9vENrEtWyQpsV14
kYhtGSJJjO2YvyKJ4rRV+WIbsU1sE9sFThuLJCS2XWtEbEckErFNbBPbxHb4sV33
i23EtiCRiG1im9j2OG33rRGxHdgiEdstPm3ENrFNbBPbLFKZF9uIbakiEdvEtqTY
buTnP7EtQySJp43YDk4kYpvYjniRiO1QRQoktl1rRGwLEYnYJrajPW0xxzaL1PAn
28S2cJEkLhKxHapIxDanTdJpI7Y5beI+2Sa2AxNJSmzPWyRiW7hIxDaxTWwT23JE
IraJbWKb2JYjUiix7VokYluQSDHGts8iEdt8RSIquH0Xqch5EysSsU1sE9vEtmyR
iG1im9gmtoltYpvYJrY9F4nTJiC2a/mftimxLXKR2hLbRU6ba5GiOm0hxnYVi0Rs
88m2c5GI7YhOG7Hd9tiu4cU2kbFdco0kxfYNcheFRcq29LEAAAAASUVORK5CYII="/>
</g>
<g clip-path="url(#clip_8)">
<image x="156" y="340" width="146" height="68" xlink:href="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAJIAAABECAYAAABqHGy8AAAACXBIWXMAAA7EAAAO
xAGVKw4bAAADNElEQVR4nO2caXLTQBQGcy2gKCqVYjFhD5KzOHEgOOyE9UaE9ZBm
jGaSsTLRbunNTP/oG3R9r12WtHbl4O/ccDXHtX2bP/PrhskyNya/M/bOWTfs/jpj
w7Bj+Pmfmwu2z7mluD3+scQotTmd312QZGxq7mnuax6kGQ81jzSPFU80W0nGU02i
SRVjxXaasaPZ1ewpJguS7/N9xYFmqji0eKZ5nmYcKV5oZorjJOOlxSsHry3eWLzV
vEsv8t7ig8WJ5qODTxafLb5ovjr4plgbWqS8RC6R7oyXJRpZElUVyZaoTCQjUV4k
WyKXSNMSkY4skRYSzZL+RTpJAxWpy0XazIlkZCpcpLR4kYxMdRZpeolIRYt03JNI
YS9SLZFOW522qotUdNouW6Q6p2020GkLYpHWL4jkPm9VFmnkEKnOIhmZtnIy1Vkk
I1PRIh06RLJlci1SmUxVRbJlqrpItkxiRfJlkcpi2+dFCuK01VmkvoK76iIVBXeb
RWoS3C6RymQKfpFW+fOf2A50kZqeNucaEdvEdhex3fbnP7Ed2GkjtoltMbGdXyRi
O8JFGvy/NmLbv0XyKbZda9T5aWuwRsS2UyRim9gmtontoUTqK7bzi0RsR7BIxDax
PeyDbR7GNg+2ebJIbR5saxLbkxXFtkskYpvYJrYl/dfWJra7+PlPbAsSidgmtolt
Ylu2SFJiu/EiEdsyRCK2ie2o3iIhtgWJRGwT297HdhevbBPbgkUitontYGM75LdI
gjhtPr9FQmwLEonYJraJ7Qqnje8jBbpIxHZEp43YJrajeouE2BYtksxFavsxUmKb
2OZjpL6K5P3Pf2JbhkgST1vIsR3oIhHbxHbAi0Rs+yoSsc1pI7aLT5trkYjtiL6P
RGx7JpIvD7YR28JFCjG2qywSsS0lthNim9NGbBPbxDaxLVIkX2J7VR8jJbaJbWJ7
KJFCfYtkyOBus0hlMokVidgmtqOL7V6+/J8S2yIXidhmkaKPbd4iIba9iO0m502s
SMQ2sS3vv7YQYrvlGhHbgbyyTWwLEklibPfxXxuxzVskzkUitgM+bcR2bKctktjm
wTYWidiWLhKxHUZs/wOmEzHHLRJ4bwAAAABJRU5ErkJggg=="/>
</g>
<g clip-path="url(#clip_9)">
<path transform="matrix(1,0,0,-1,282.2168,400.13819)" d="M0 0H-120.654C-128.481 0-134.827 6.346-134.827 14.173V197.827C-134.827 205.654-128.481 212-120.654 212H0C7.828 212 14.173 205.654 14.173 197.827V14.173C14.173 6.346 7.828 0 0 0" fill="#ffffff"/>
<path transform="matrix(1,0,0,-1,282.2168,400.13819)" stroke-width="1" stroke-linecap="butt" stroke-miterlimit="10" stroke-linejoin="miter" fill="none" stroke="#7557a4" d="M0 0H-120.654C-128.481 0-134.827 6.346-134.827 14.173V197.827C-134.827 205.654-128.481 212-120.654 212H0C7.828 212 14.173 205.654 14.173 197.827V14.173C14.173 6.346 7.828 0 0 0Z"/>
<path transform="matrix(1,0,0,-1,177.2168,375.13819)" d="M0 0H-120.654C-128.481 0-134.827 6.346-134.827 14.173V135.827C-134.827 143.654-128.481 150-120.654 150H0C7.828 150 14.173 143.654 14.173 135.827V14.173C14.173 6.346 7.828 0 0 0" fill="#ffffff"/>
<path transform="matrix(1,0,0,-1,177.2168,375.13819)" stroke-width="1" stroke-linecap="butt" stroke-miterlimit="10" stroke-linejoin="miter" fill="none" stroke="#7557a4" d="M0 0H-120.654C-128.481 0-134.827 6.346-134.827 14.173V135.827C-134.827 143.654-128.481 150-120.654 150H0C7.828 150 14.173 143.654 14.173 135.827V14.173C14.173 6.346 7.828 0 0 0Z"/>
</g>
<g clip-path="url(#clip_10)">
<image x="240" y="209" width="49" height="175" xlink:href="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAADEAAACvCAYAAABU8DYvAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAADYElEQVR4nO3ca1PTQBgFYP6WOgzDdKqCN9AmBVKoiIiKF7z9I7CC
PzKe0GRc0yTmtpt3d8+HM9MOH+iZ5n0muxtYu3P0O05yF7l3uMz67OY2G9F1vJnk
4Fc82k+yiMd7i/jB9Gf8ENkKr+Lt4Cp+hDxBnuH9LvICmeB9iOzh9QEyQ46Cy/gl
coychJfxKfIGr9+meYe8R86RD/jZR+QT8hm5QL4gX5FvyHfkR5q11RI3pSXGSomt
8G+Jxx1KnPVdIiuynhbZmF0vi6BEWZHtcPlNJEWe4vUO8jwpgvcBMkX28T5CDvHh
5mmRV/jlr9Nv4sxUiVFWAgXuqyWUy6luieO0xKmRElH7EpO0RHY5RenlNA9WZ0J7
ic1/SixyJVYHWy0x4GBTJ+pEnerrlB/sap1CyTolBZzTSdRgO6/TyFqdOtx2ZCWS
b4I69TrYNXXala7T2CudgmWJ6f9KBMUlkgLabzuo0xA6VS+KmutUNNjUiTpRJ+pE
nWpv2VAn6tR2sO3Tqf5gW6uT/C0bF3USu2XTRid1qKmTlMEuO+7KSqhbNtSpy2Bb
dNxluU5tFkV5oXYUocQMNnUaQqc+tmys1UnUYLupU8vBFq5T+WC30UnkbQd1ok46
dHJhUWStTk0eFbJSp6LDeNE6id+yoU7UaaDB9kInEcdd1Ik6USdPdRL/IKO1x13e
6aTOw20JfDAhOvW7ZUOd+hjspls2fFSIOvmmU5vBpk7UyfbD+KY6DbIoclYnnYNN
nYbQSfxgd9HJ+G2H1zpFqU5zEyWoU8GWzSCPWXutk7WLosoSgQc6JfNwkpsH6kSd
Sm47qJNonQJDiyKdOuWHmjpRJ+pEnaiTfTqZ2FAWpROPu6QMdl2djG8om9QpP9Qi
dZq0KEKdqJOvOmm97aBODRZFzujk1GG8+OMu6jSETvl/PkKdpOpUddtBnbzXqe4f
gag6GdmykaDTedcS1KnDoshcCV8fFbJep6IHGb3QSb2U1BIXpgfbqi0b5467nNbJ
qUeFinTStigaUqf8pUSdvNWp78N4rTNBnWrq1HlRJFGnrAB14nGXxMGmTjV00n/b
QZ0sPO6iTtRJ82F8W536HWzqJGVDWZNO4rdsROrU92PW4hZF1EmaTrKPu3gYT53M
DTZ1qjEPVSX+AGby8O1e7wAWAAAAAElFTkSuQmCC"/>
</g>
<g clip-path="url(#clip_11)">
<image x="197" y="214" width="57" height="171" xlink:href="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAADkAAACrCAYAAADctjTNAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAAD0UlEQVR4nO2cXVPTQBSG+VvqMAzDVBQQFE1aaIsoav0GUf8RHyI/
Mp7Q7EyIaZNNTjbn7L4X70W54h12n9l9zpaVB0e3SZqHlEfT22R1+jdZncyzNr65
y/rhn7tsHKS5Tgaj6+QxZXN4lTyN01wmW9Flsk15Rtmlz3uUF5SXlFf0s4gypBzQ
50PKhHIUXSSvKceUt/FFckJ5T/lAn2eUj1k+UT5TvlC+xvN8o3ynnFLOspxTflJ+
ZfmdZcW25KBmyedNS0b1S55ylVzPSm4USqYFTcmtrOROWcloXjKmjOJ5yXGu5HFJ
yZmrkmuTG6uS27mSe1nJ/WUl6Rc2Jd9kJd/lSuYLmpL5gsWSPxr/JUuLzkuaok+G
95frTmFPmqJmuY5yy3WaW65pUY49ec6xJ23Bsw/wtAMPe0kvwWNLVxfgMSUBHoCH
uaR34DElq8BjSgI8LsGz8Fj3H3Su7kGnrGRkUXLRUl10rDtrUxLg6RI8fZYs7sna
JSvAo+o+md+Tu3F78MwiZeCxKakCPGXHOjV7EiKrBl2DB48p6Rw8dUr6AZ7J4j05
AHgAHnkGvTORpQU8m47A48agtwQPRJZP4BE9ugN4QgEPDLpW8ARl0PMlMbpTAx5T
tCZ4TNFl4BkDPABPv8c6teCpe6zT+1iJ6VhXNrqbWtAVBl0leCSUdDG6Cxo8ou+T
AI/EPQmDvoSuokd3TUSWn+CpoKt3j5WCFFkqwdP0WKdydFfnPin+sRLnsQ7g8QE8
Xh/rVI7u2EVWJGh0B/C0AA8MOsCjyaD7Bh7ZryQZ75NV0LEtWVyq+PILwMNs0NWN
7uo8jNDxZoDxWFcGnjZ0FQ0eL++TKkVWsODhFFkAjxTwBCmyVIKHw6CLfTPQ5D4Z
HHjiEMEDkeUDeII06L2/kuR4GAHwADzKwOPN6M7qPtkAPM4NeluRBfAAPIGBR77I
ihSM7treJ0WCp+vR3UlFyaqlKsqg5/ekeroG++UX8eDpU2Q5e6zUhcjyFjww6FLA
w23QRY3uXIks0eCp+w0fgAfgUQwedaM7DpElCjwcIsvmlaQo8EBk+Q4eGHQN4HEh
sgAegAfgkQMeZ28G+hZZAI8W8KgsqXp016XI6v2xUt8iywl4XIisNvtRlMjC6I6h
pHrwiBzdqQcP94ssrwy6V+CBQa841ol+M+BSZDkHT3AiC6M738Fjc58EeFzsSYis
UMHj2qDruE9GgRp00eBRd5+EQQd4FIKnD5EF8HCWhMhiAI9KusKgM4Cn039i29ex
rnfwQGT5DJ4gRRaHQQd4XJWEyCrZk67uk/8A44ikEL57utcAAAAASUVORK5CYII="/>
</g>
<g clip-path="url(#clip_12)">
<image x="53" y="248" width="122" height="113" xlink:href="data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAAHoAAABxCAYAAAAanrcnAAAACXBIWXMAAA7EAAAO
xAGVKw4bAAADLElEQVR4nO3d21ITQRSFYV4LLYqyKE8YEIQZQg4IKiAewOMbKSo+
ZOzU7CFt0zMZJkymd+e/WDfkctX6LqjsztLywd9RnntW7g8nWRleZRlMsjr4k6Wf
5UGe3u/rrI2zn+fX6OE43UkemTzeu7zO0zTPz9H6OEmWZ5KOyYZk03z+XLJlsm3y
QrKTZNk1SSR7kq75fF/SM+lLBsmP0dDkwOSl5FByZPIqzfLa5I3J8Tjm7yeSU8lb
J2eSd1beSz6k/+ej5FxyIfnkyWfJF8lXyTcn3yVL04u+Ki66X79ot+QnbtGekjtW
yZtWyb6id62iU0/RPavogafowwpFuyUrL7raolfveNFFZW8UlL1tlb2T3lx0ahXd
9S3aJC/aLfvIKrvuos9mKNpXdmtFz0r3jUVDN3RDN3RDt3a6O56ioRu6oRu6oRu6
a9IdyaKhG7qhG7qhW92ioRu6G6S7yr9Am6Lbt2johu5YFl2P7jXo1lY0dEN3JHT7
Fg3dgdNtrxm6I6HbXTR0LzjdvkVDN3RDN3RDN3TrXzR0Qzd0Qzd0q1s0dEM3dEM3
dKtbNHRDN3RDN3SrWzR0N0G3W3IARUM3dEM3dIdIt7tm6G5h0dAN3dAN3dCtbtHQ
3TrdJYueA92+RdtFF11qQDd0Q/ei0O09soNu6IbuyOj2PWsB3SHTnUA3dEM3dEM3
dEM3dEN3TbqLH5ODbuiGbuiGbuiGbuiGbuiOlW7dzzjfhu+qzziX8a140dAN3dAN
3dCtbtHQDd0LTjf30XNaNHRDN3RDN3RDN3RDN3RDN3SHcKkB3YHRPe0+ukrRZT+e
At3QDd0x0D3tPhq6oftO6Vaw6OboLr3UaJjutu+jAywauqEbuqEbutUVDd2FdN9i
0dBdke5Zf20WuiOlO/RnnAMsGrqhG7qhG7rVFR033b5FQzd0Qzd0qy8auqEbuqEb
utUVDd3QrYjusu+MQTd0Q3fQlxrQHW7R0N36oqEbuqEbutXRnZRfakA3dPMWKHRD
tzq6yx6Ug27ohm7ohm7oXii6PWuG7ggWPc9XiaAbuqEbuqEbuqE7DLqnvUoE3dAN
3dCti+5/kNlMWafvYykAAAAASUVORK5CYII="/>
</g>
</g>
</svg>
````

## File: .gitignore
````
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
package-lock.json
bun.lock
````

## File: app/layout.tsx
````typescript
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "anaqio",
  description: "anaqio - Secure authentication and user management",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
````

## File: app/page.tsx
````typescript
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-between">
      {
        /**
               <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
              <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                  <Link href={"/"}>anaqio</Link>
                </div>
                <div className="flex items-center gap-4">
                  <Suspense>
                    <AuthButton />
                  </Suspense>
                  <ThemeSwitcher />
                </div>
              </div>
            </nav>
         */
      }

      <div className="flex-1 flex items-center justify-center w-full">
        <div className="flex flex-col items-center gap-8">
          <Image
            src="/logo.svg"
            alt="anaqio logo"
            width={300}
            height={300}
            priority
            className="w-auto h-auto"
          />
        </div>
      </div>

      <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-8">
        <p className="text-foreground/60">
          © 2026 anaqio. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
````