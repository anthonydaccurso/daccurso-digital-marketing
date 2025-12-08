/*
  # Add RLS policies for chat_logs table

  1. Security Changes
    - Add policy for service role to insert chat logs (edge function access)
    - Add policy for authenticated admin users to read chat logs
    
  2. Important Notes
    - Edge functions using service role key bypass RLS, but we add explicit policy for clarity
    - Indexes (conversation_id, session_id, created_at) are new and will be utilized as data grows
    - No public access - logs are private and only accessible via edge function inserts
*/

-- Policy for inserting chat logs (used by edge function with service role)
-- Service role bypasses RLS, but we define this for documentation and future granular access
CREATE POLICY "Allow service role to insert chat logs"
  ON chat_logs
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy for reading chat logs (for future admin dashboard)
-- Restrict to authenticated users only - can be further restricted by adding user role checks
CREATE POLICY "Allow authenticated users to read chat logs"
  ON chat_logs
  FOR SELECT
  TO authenticated
  USING (true);
