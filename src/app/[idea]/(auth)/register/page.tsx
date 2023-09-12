'use client'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import { type Metadata } from 'next'
import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { supabase } from '@/lib/supabase/supabase'

// export const metadata: Metadata = {
//   title: 'Sign Up',
// }

export default function Register() {
  const [source, setSource] = useState<string | null>(null);
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [email, setEmail] = useState(null)

  async function updateProfile({ firstName, lastName, email, source }: {firstName?: string, lastName?: string, email?: string, source?: string}) {
    let subDomain = window.location.hostname.split(".")[0]
    try {
      let { error } = await supabase.from(subDomain).insert({
        firstName: firstName,
        lastName: lastName,
        email: email,
        source: source
      })
      if (error) throw error
      alert('Thank you!')
    } catch (error) {
      alert('Error adding data')
      console.error(error)
    }
  }

  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" />
        </Link>
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        Get started for free!
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Already registered?{' '}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign in
        </Link>{' '}
        to your account.
      </p>
      <form
        action="#"
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
      >
        <TextField
          label="First name"
          name="first_name"
          type="text"
          autoComplete="given-name"
          required
        />
        <TextField
          label="Last name"
          name="last_name"
          type="text"
          autoComplete="family-name"
          required
        />
        <TextField
          className="col-span-full"
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <SelectField
          className="col-span-full"
          label="How did you hear about us?"
          name="referral_source"
          onChange={(e) => setSource(e.target.value)}
        >
          <option>Facebook</option>
          <option>Instagram</option>
          <option>Reddit</option>
          <option>Google</option>
          <option>Other</option>
        </SelectField>
        {/* <div className="col-span-full"> */}
        {source == 'Other' &&
          <TextField
            className="col-span-full"
            label="Other source"
            type="text"
          />
        }
        {/* </div> */}
        <div className="col-span-full">
          <Button type="submit" variant="solid" color="blue" className="w-full"
          onClick={() => updateProfile({firstName, lastName, email, source})}>
            <span>
              Sign up <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form>
    </SlimLayout>
  )
}
