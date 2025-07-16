import { createClient } from "@supabase/supabase-js";



const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
