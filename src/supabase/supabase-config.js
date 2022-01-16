import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://kenfpilxndsfpukjnlyw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQyMzI0Mjc4LCJleHAiOjE5NTc5MDAyNzh9.5U56bUHggQ5-oIj7zedwaUw9uR_xSAj5PedGspnU3V0"
);

export default supabase;
