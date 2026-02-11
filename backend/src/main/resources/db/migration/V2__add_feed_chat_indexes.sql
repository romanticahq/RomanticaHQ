CREATE INDEX IF NOT EXISTS idx_messages_conversation_created_at
    ON messages (conversation_id, created_at);

CREATE INDEX IF NOT EXISTS idx_messages_sender_created_at
    ON messages (sender_id, created_at);

CREATE INDEX IF NOT EXISTS idx_conversations_user1_created_at
    ON conversations (user1_id, created_at);

CREATE INDEX IF NOT EXISTS idx_conversations_user2_created_at
    ON conversations (user2_id, created_at);

CREATE INDEX IF NOT EXISTS idx_user_likes_to_status
    ON user_likes (to_user_id, status);

CREATE INDEX IF NOT EXISTS idx_user_likes_from_status
    ON user_likes (from_user_id, status);

CREATE INDEX IF NOT EXISTS idx_profiles_user_id
    ON profiles (user_id);
