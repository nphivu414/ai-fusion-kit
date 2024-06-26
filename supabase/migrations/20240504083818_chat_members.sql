drop policy "User can view their joined chat sessions" on "public"."chat_members";

create policy "User can view their joined chat sessions"
on "public"."chat_members"
as permissive
for select
to authenticated
using (true);

ALTER TABLE "public"."chat_members"
ADD CONSTRAINT unique_chat_member UNIQUE (chat_id, member_id);
