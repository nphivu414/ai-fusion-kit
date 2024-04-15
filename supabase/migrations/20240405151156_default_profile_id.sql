alter table "public"."chats" alter column "profile_id" set default auth.uid();
alter table "public"."messages" alter column "profile_id" set default auth.uid();


