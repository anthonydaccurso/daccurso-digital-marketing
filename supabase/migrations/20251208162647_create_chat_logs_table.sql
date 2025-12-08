/*
  # Create chat_logs table

  1. New Tables
    - `chat_logs`
      - `id` (uuid, primary key)
      - `user_message` (text)
      - `bot_response` (text)
      - `conversation_id` (text)
      - `device_type` (text)
      - `device_name` (text)
      - `browser` (text)
      - `os` (text)
      - `user_agent` (text)
      - `referrer` (text)
      - `session_id` (text)
      - `response_time_ms` (integer)
      - `ip_address` (text)
      - `country` (text)
      - `region` (text)
      - `city` (text)
      - `latitude` (numeric)
      - `longitude` (numeric)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `chat_logs` table
    - No public access policies (admin only access)
*/

CREATE TABLE IF NOT EXISTS chat_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_message text NOT NULL,
  bot_response text NOT NULL,
  conversation_id text,
  device_type text,
  device_name text,
  browser text,
  os text,
  user_agent text,
  referrer text,
  session_id text,
  response_time_ms integer DEFAULT 0,
  ip_address text,
  country text,
  region text,
  city text,
  latitude numeric,
  longitude numeric,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_logs ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_chat_logs_conversation_id ON chat_logs(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_logs_session_id ON chat_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_logs_created_at ON chat_logs(created_at DESC);
