import { createClient } from '@supabase/supabase-js'
import { secret } from '$lib/server/secrets'

const supabaseUrl = 'https://hykrtxkdrrgsabjsuavx.supabase.co'
const supabaseKey = secret
export const supabase = createClient(supabaseUrl, supabaseKey)
