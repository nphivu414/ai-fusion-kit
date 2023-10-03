import { PostgrestError } from "@supabase/supabase-js"

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      apps: {
        Row: {
          createdAt: string | null
          description: string | null
          id: string
          logoUrl: string | null
          name: string
          slug: string
          updatedAt: string | null
        }
        Insert: {
          createdAt?: string | null
          description?: string | null
          id?: string
          logoUrl?: string | null
          name: string
          slug: string
          updatedAt?: string | null
        }
        Update: {
          createdAt?: string | null
          description?: string | null
          id?: string
          logoUrl?: string | null
          name?: string
          slug?: string
          updatedAt?: string | null
        }
        Relationships: []
      }
      chats: {
        Row: {
          appId: string
          createdAt: string | null
          id: string
          name: string | null
          profileId: string
          settings: Json | null
          updatedAt: string | null
        }
        Insert: {
          appId: string
          createdAt?: string | null
          id?: string
          name?: string | null
          profileId: string
          settings?: Json | null
          updatedAt?: string | null
        }
        Update: {
          appId?: string
          createdAt?: string | null
          id?: string
          name?: string | null
          profileId?: string
          settings?: Json | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chats_appId_fkey"
            columns: ["appId"]
            referencedRelation: "apps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chats_profileId_fkey"
            columns: ["profileId"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          chatId: string
          content: string | null
          createdAt: string | null
          id: string
          profileId: string
          role: Database["public"]["Enums"]["message_role"] | null
          updatedAt: string | null
        }
        Insert: {
          chatId?: string | null
          content?: string | null
          createdAt?: string | null
          id?: string
          profileId?: string | null
          role?: Database["public"]["Enums"]["message_role"] | null
          updatedAt?: string | null
        }
        Update: {
          chatId?: string | null
          content?: string | null
          createdAt?: string | null
          id?: string
          profileId?: string | null
          role?: Database["public"]["Enums"]["message_role"] | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_chatId_fkey"
            columns: ["chatId"]
            referencedRelation: "chat"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_profileId_fkey"
            columns: ["profileId"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      message_role: "system" | "user" | "assistant"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Insert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Update<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
export type DbResult<T> = T extends PromiseLike<infer U> ? U : never
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never
export type DbResultErr = PostgrestError

export type Profile = Tables<'profiles'>
export type App = Tables<'apps'>
export type Chat = Tables<'chats'>
export type Message = Tables<'messages'>