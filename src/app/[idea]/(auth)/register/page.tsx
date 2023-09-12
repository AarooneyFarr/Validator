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
import { v4 } from "uuid";

// export const metadata: Metadata = {
//   title: 'Sign Up',
// }

export default function Register() {
  const [source, setSource] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null)
  const [lastName, setLastName] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)

  // let source: string = '';
  // let firstName: string = '';
  // let lastName: string = '';
  // let email: string = '';

  async function updateProfile({ firstName, lastName, email, source }: {firstName?: string | null, lastName?: string | null, email?: string | null, source?: string | null}) {
    let subDomain = window.location.hostname.split(".")[0]
    

    try {
      //TODO: may need to change field names and the database name depending on the actual live table
      let { error } = await supabase.from('contacts').insert({
        id: v4(),
        idea: subDomain,
        first_name: firstName,
        last_name: lastName,
        email: email,
        source: source
      })
      // There's a weird "can't fetch" error that's occuring with an empty error code, so I'm filtering it out
      // because posting to the database still works if that error is present...
      if (error && error.code !== "") throw error
      alert('Thank you!')
    } catch (error) {
      console.error(error)
      alert('Error adding data')
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
          onChange={(e) => setFirstName(e.target.value)}
        //   onChange={(e) => firstName = e.target.value}
        />
        <TextField
          label="Last name"
          name="last_name"
          type="text"
          autoComplete="family-name"
          required
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          className="col-span-full"
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <SelectField
          className="col-span-full"
          label="How did you hear about us?"
          name="referral_source"
          onChange={(e) => setSource(e.target.value)}
        >
          <option></option>
          <option>Facebook</option>
          <option>Instagram</option>
          <option>Reddit</option>
          <option>Google</option>
          <option>Other</option>
        </SelectField>
        {/* <div className="col-span-full"> */}
        {source == 'Other' || 
        (source !== null && 
        source !== "" &&
        source !== "Facebook" && 
        source !== "Instagram" && 
        source !== "Reddit" && 
        source !== "Google") ? (
          <TextField
            className="col-span-full"
            label="Other source"
            type="text"
            onChange={(e) => setSource(e.target.value)}
          />
        ): null
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
