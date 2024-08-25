/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/pHJlBqGJjz3
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Arimo } from 'next/font/google'

arimo({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
"use client"

import Link from "next/link"
import { Label } from "@/app/components/ui/label"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import React, { KeyboardEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GithubIcon } from '@/app/components/icon/github';
import { MountainIcon } from '@/app/components/icon/mountain';

export function Login() {
  const [password, setPassword] = useState("")
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const onSubmit = async () => {
    setLoading(true);
    try {
      const ret = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      }).then((res) => res.json<{ pass: boolean, message: string | undefined }>());
      if(ret.pass) {
        await router.push("/");
        return;
      }
      alert(ret.message || "Login Failed")
      setError(ret.message || "Login Failed")
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      alert(e.message || "Login Failed")
      setError(e.message || "Login Failed")
    }
  }

  const handleKeyPress = async (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      await onSubmit();
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-xs flex-col items-center justify-center">
        <Link href="#" className="mb-8" prefetch={false}>
          <MountainIcon className="h-8 w-8 text-primary" />
        </Link>
        <div className="w-full space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              disabled={loading}
              placeholder="Enter your password"
              required
              onChange={onPasswordChange}
              onKeyPress={handleKeyPress}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading} onClick={onSubmit}>
            { loading ? 'Please wait' : 'Sign In'}
          </Button>
        </div>
        <div className="mt-4 flex w-full items-center justify-end">
          <Button variant="ghost" size="icon" className="ml-auto" asChild>
            <Link href="https://github.com/mx1700/cloudflare-image-share" target="_blank">
              <GithubIcon className="h-6 w-6" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
