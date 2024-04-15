alter table "public"."apps" enable row level security;

alter table "public"."chats" enable row level security;

alter table "public"."messages" enable row level security;

ALTER TABLE "public"."apps"
RENAME COLUMN "createdAt" TO created_at;
ALTER TABLE "public"."apps"
RENAME COLUMN "updatedAt" to updated_at;
ALTER TABLE "public"."apps"
RENAME COLUMN "logoUrl" to logo_url;

ALTER TABLE "public"."chats"
RENAME COLUMN "createdAt" TO created_at;
ALTER TABLE "public"."chats"
RENAME COLUMN "updatedAt" to updated_at;
ALTER TABLE "public"."chats"
RENAME COLUMN "profileId" to profile_id;
ALTER TABLE "public"."chats"
RENAME COLUMN "appId" to app_id;

ALTER TABLE "public"."messages"
RENAME COLUMN "createdAt" TO created_at;
ALTER TABLE "public"."messages"
RENAME COLUMN "updatedAt" to updated_at;
ALTER TABLE "public"."messages"
RENAME COLUMN "profileId" to profile_id;
ALTER TABLE "public"."messages"
RENAME COLUMN "chatId" to chat_id;

CREATE POLICY "Allow read-only access to authenticated users" ON "public"."apps"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "User can view their chat sessions" ON "public"."chats"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (profile_id = auth.uid());


CREATE POLICY "User can create their chat sessions" ON "public"."chats"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (profile_id = auth.uid());


CREATE POLICY "User can update their chat sessions" ON "public"."chats"
AS PERMISSIVE FOR UPDATE
TO public
USING (profile_id = auth.uid())
WITH CHECK (profile_id = auth.uid());


CREATE POLICY "User can delete their chat sessions" ON "public"."chats"
AS PERMISSIVE FOR DELETE
TO authenticated
USING (profile_id = auth.uid());

CREATE POLICY "User can view chat messages" ON "public"."messages"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (EXISTS ( SELECT 1 FROM chats WHERE chats.id = chat_id ));

CREATE POLICY "User can create chat messages" ON "public"."messages"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (EXISTS ( SELECT 1 FROM chats WHERE chat_id = chats.id ) AND profile_id = auth.uid());

CREATE POLICY "User can update chat messages" ON "public"."messages"
AS PERMISSIVE FOR UPDATE
TO authenticated
USING (EXISTS ( SELECT 1 FROM chats WHERE chat_id = chats.id ) AND profile_id = auth.uid())
WITH CHECK (EXISTS ( SELECT 1 FROM chats WHERE chat_id = chats.id ) AND profile_id = auth.uid());
