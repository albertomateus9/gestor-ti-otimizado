export const env = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'missing-anon-key',
}

export const hasSupabaseEnv = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY,
)
