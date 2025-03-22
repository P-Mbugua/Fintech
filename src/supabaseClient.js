import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://pyovkurrigiuiqqobcfu.supabase.co";  // Replace with your actual Supabase URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5b3ZrdXJyaWdpdWlxcW9iY2Z1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1NTMzOTgsImV4cCI6MjA1ODEyOTM5OH0.gzwY22yn107WzhvvKWa10Rjm_bji9dD70RTn_VldCIE";  // Replace with your actual anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
