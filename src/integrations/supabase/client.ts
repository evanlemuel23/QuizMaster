// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pmkodxqqvekzvsgbueqq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBta29keHFxdmVrenZzZ2J1ZXFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNTYyMzMsImV4cCI6MjA2MDgzMjIzM30.C8bYDqkdBE5I3t1hIFVrK0o_V4kJ2B_JKh6ZO0kweKM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);