// https://supabase.com/docs/reference/javascript/installing?queryGroups=platform&platform=pnpm
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// データベースとの対話用に単一のsupabaseクライアントを作成
const supabase = createClient(supabaseUrl!, supabaseKey!);

export default supabase;
