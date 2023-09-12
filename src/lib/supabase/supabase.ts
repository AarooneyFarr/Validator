
import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/supabase-generated.types'

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    {
        global: {
            fetch: fetch.bind(globalThis)
        },
        auth: {
            persistSession: false
        }
    }
)