import { hasSupabaseEnv } from '@/lib/env'

export function ensureSupabaseConfigured() {
  if (!hasSupabaseEnv) {
    throw new Error('Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY para conectar ao Supabase.')
  }
}

export function throwIfError(error: { message: string } | null) {
  if (error) {
    throw new Error(error.message)
  }
}

export function asArray<T>(data: T[] | null): T[] {
  return Array.isArray(data) ? data : []
}
