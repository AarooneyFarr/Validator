'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import { Database } from '../lib/types/supabase-generated.types'
import { useRouter } from 'next/navigation'



const SignOutButton = ({ children, className }: { children?: string, className?: string }) => {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()

    const handleSignOut = async () => {
        console.log('signing out')
        await supabase.auth.signOut()
        router.refresh()
    }
    return (
        <button className={" " + className + ' '} onClick={handleSignOut}>
            {children}
        </button>
    )
}

export default SignOutButton