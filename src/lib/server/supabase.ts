import { createClient } from '@supabase/supabase-js'
import { secret } from '$lib/server/secrets'
import type { Database } from '$lib/db/types'

const supabaseUrl = 'https://hykrtxkdrrgsabjsuavx.supabase.co'
const supabaseKey = secret
export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
