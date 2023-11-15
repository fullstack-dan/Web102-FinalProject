import { createClient } from "@supabase/supabase-js";
const URL = "https://trgnuinzwoshdbmizyar.supabase.co";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyZ251aW56d29zaGRibWl6eWFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMDg1NjQsImV4cCI6MjAxNTU4NDU2NH0.BvFe73-xUEtkAtuZlQjmQcH9ACddnxyq_AayFwaU7ws";
const supabase = createClient(URL, API_KEY);
export default supabase;
