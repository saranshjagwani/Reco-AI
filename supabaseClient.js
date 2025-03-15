import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://hbscwhtqqqnviltmuojo.supabase.co";
const SUPABASE_ANON_KEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhic2N3aHRxcXFudmlsdG11b2pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzMTExMzYsImV4cCI6MjA1NTg4NzEzNn0.9QlX62-LFhNvGF4HzopEZJG5kUWJXFiIEL2DWmOUlP4";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
