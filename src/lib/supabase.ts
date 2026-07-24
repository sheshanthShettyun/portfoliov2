import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cercocdzzwywjmpkjvgd.supabase.co";
const supabaseAnonKey = "sb_publishable_49jSUuX0m6dbQ5JrvPXnDQ_Z8E0h1zW";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
