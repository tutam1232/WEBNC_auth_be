import { createClient } from '@supabase/supabase-js';

export const supabaseProvider = {
  provide: 'SUPABASE_CLIENT',
  useFactory: () => {
    const client = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY,
    );
    return client;
  },
};
