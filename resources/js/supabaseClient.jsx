import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fowjvavipjvabvbxfd.supabase.co';
const supabaseAnonKey = 'sb_publishable_w9BRtgrcz08ZQtUd9EXynQ_x20pcRb_';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Peringatan: VITE_SUPABASE_URL atau VITE_SUPABASE_ANON_KEY belum diatur di file .env');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);