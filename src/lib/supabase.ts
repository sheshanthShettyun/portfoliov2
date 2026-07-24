import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zupkumarttmrypaoqtvc.supabase.co";
const supabaseAnonKey = "sb_publishable_p6k8gc3E8_GUQdF1463NZQ_uApUKP_z";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
