import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Clean the Supabase URL (strip any trailing /rest/v1 or slashes)
const sanitizedUrl = rawUrl
  .replace(/\/rest\/v1\/?$/, '')
  .replace(/\/+$/, '')
  .trim();

const sanitizedKey = rawKey.trim();

export const isSupabaseConfigured = Boolean(
  sanitizedUrl &&
  sanitizedKey &&
  sanitizedUrl !== 'https://your-project.supabase.co' &&
  sanitizedKey !== 'your-anon-key' &&
  sanitizedKey !== 'your-anon-key-here' &&
  !sanitizedUrl.includes('your-project')
);

export const supabase = isSupabaseConfigured
  ? createClient(sanitizedUrl, sanitizedKey)
  : null;
