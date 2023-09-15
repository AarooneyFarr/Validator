'use client'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { SelectField, TextField, formClasses } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import { type Metadata } from 'next'
import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { supabase } from '@/lib/supabase/supabase'
import { toast } from 'react-toastify'
import { capitalize } from '../../../../lib/utils'

// export const metadata: Metadata = {
//   title: 'Sign Up',
// }

export default function Register({ params }: { params: { idea: string } }) {
  const [source, setSource] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null)
  const [lastName, setLastName] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)

  const siteName = params.idea.replace('.' + process.env.NEXT_PUBLIC_ROOT_DOMAIN, '')

  // let source: string = '';
  // let firstName: string = '';
  // let lastName: string = '';
  // let email: string = '';

  async function updateProfile({ firstName, lastName, email, source }: {firstName?: string | null, lastName?: string | null, email?: string | null, source?: string | null}) {
    // let subDomain = window.location.hostname.split(".")[0]


    try {
    if(!firstName || !lastName || !email || !source) throw new Error("All data fields must be defined")

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValidEmail = emailPattern.test(email)

      if(!isValidEmail) throw new Error("Please enter valid email")

      //TODO: may need to change field names and the database name depending on the actual live table
      const { error } = await supabase.from('contacts').insert({
        idea: siteName,
        first_name: firstName,
        last_name: lastName,
        email: email,
        source: source
      })


      if (error) throw error



      toast.success('Submitted!')

    } catch (error: any) {
      toast.error(error.message)
      // alert('Error adding data')
    }
  }

  return (
    <SlimLayout>
      <meta
  name="format-detection"
  content="telephone=no, date=no, email=no, address=no"
/>
      <div className="flex">
        <Link className='flex flex-row' href="/" aria-label="Home">
          <Logo className="h-10 w-auto" />
          <span className=' font-display font-bold text-3xl ml-2'>{capitalize(siteName) ?? "Taxpal"}</span>
          <span className='my-auto ml-2 h-min inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/20'>beta</span>

        </Link>
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        Sign up for beta now!
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        You know you want it
        {/* <Link
          href="/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign in
        </Link>{' '}
        to your account. */}
      </p>
      <div
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
      >
        <TextField
          label="First name"
          name="first_name"
          type="text"
          autoComplete="given-name"
          required
          onChange={(e) => setFirstName(e.target.value)}
          // onChange={(e) => firstName = e.target.value}
        />
        <TextField
          label="Last name"
          name="last_name"
          type="text"
          autoComplete="family-name"
          required
          onChange={(e) => setLastName(e.target.value)}
          // onChange={(e) => lastName = e.target.value}
        />
        <TextField
          className="col-span-full"
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          // onChange={(e) => email = e.target.value}
        />
        <div >
        {/* <laı */}
        {/* <input
          name="first_name"
          type="text"
          autoComplete="given-name"
          required
          onChange={(e) => setFirstName(e.target.value)}
          className={formClasses}
        /> */}
        </div>
        {/* <input
          name="last_name"
          type="text"
          autoComplete="family-name"
          required
          onChange={(e) => setLastName(e.target.value)}
          
          className={formClasses}
        
        /> */}
        {/* <input
          name="email"
          type="email"
          autoComplete="email"
          required
          onChange={(e) => setEmail(e.target.value)}

          className={formClasses}
        /> */}
        <SelectField
          className="col-span-full"
          label="How did you hear about us?"
          name="referral_source"
          onChange={(e) => setSource(e.target.value)}
          // onChange={(e) => source = e.target.value}
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
            // onChange={(e) => source = e.target.value}
          />
        ) : null
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
      </div>
    </SlimLayout>
  )
}
