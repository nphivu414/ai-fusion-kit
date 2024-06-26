drop policy "User can view their chat sessions" on "public"."chats";

drop policy "User can update their chat sessions" on "public"."chats";

create table "public"."chat_members" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "chat_id" uuid not null,
    "member_id" uuid not null
);


alter table "public"."chat_members" enable row level security;

CREATE UNIQUE INDEX chat_members_pkey ON public.chat_members USING btree (id);

alter table "public"."chat_members" add constraint "chat_members_pkey" PRIMARY KEY using index "chat_members_pkey";

alter table "public"."chat_members" add constraint "public_chat_members_chat_id_fkey" FOREIGN KEY (chat_id) REFERENCES chats(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."chat_members" validate constraint "public_chat_members_chat_id_fkey";

alter table "public"."chat_members" add constraint "public_chat_members_member_id_fkey" FOREIGN KEY (member_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."chat_members" validate constraint "public_chat_members_member_id_fkey";

grant delete on table "public"."chat_members" to "anon";

grant insert on table "public"."chat_members" to "anon";

grant references on table "public"."chat_members" to "anon";

grant select on table "public"."chat_members" to "anon";

grant trigger on table "public"."chat_members" to "anon";

grant truncate on table "public"."chat_members" to "anon";

grant update on table "public"."chat_members" to "anon";

grant delete on table "public"."chat_members" to "authenticated";

grant insert on table "public"."chat_members" to "authenticated";

grant references on table "public"."chat_members" to "authenticated";

grant select on table "public"."chat_members" to "authenticated";

grant trigger on table "public"."chat_members" to "authenticated";

grant truncate on table "public"."chat_members" to "authenticated";

grant update on table "public"."chat_members" to "authenticated";

grant delete on table "public"."chat_members" to "service_role";

grant insert on table "public"."chat_members" to "service_role";

grant references on table "public"."chat_members" to "service_role";

grant select on table "public"."chat_members" to "service_role";

grant trigger on table "public"."chat_members" to "service_role";

grant truncate on table "public"."chat_members" to "service_role";

grant update on table "public"."chat_members" to "service_role";

create policy "Owner can invite members"
on "public"."chat_members"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM chats
  WHERE (chat_members.chat_id = chats.id))));


create policy "Owner can remove members"
on "public"."chat_members"
as permissive
for delete
to authenticated
using ((EXISTS ( SELECT 1
   FROM chats
  WHERE (chats.id = chat_members.chat_id))));


create policy "User can view their joined chat sessions"
on "public"."chat_members"
as permissive
for select
to authenticated
using ((member_id = auth.uid()));


create policy "Owner can view their chat sessions"
on "public"."chats"
as permissive
for select
to authenticated
using ((profile_id = auth.uid()));


create policy "User can view their invited chat sessions"
on "public"."chats"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM chat_members
  WHERE ((chat_members.member_id = auth.uid()) AND (chat_members.chat_id = chats.id)))));


create policy "User can update their chat sessions"
on "public"."chats"
as permissive
for update
to authenticated
using ((profile_id = auth.uid()))
with check ((profile_id = auth.uid()));

alter publication supabase_realtime add table messages;

