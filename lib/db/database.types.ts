export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      apps: {
        Row: {
          createdAt: string | null;
          description: string | null;
          id: string;
          logoUrl: string | null;
          name: string;
          slug: string;
          updatedAt: string | null;
        };
        Insert: {
          createdAt?: string | null;
          description?: string | null;
          id?: string;
          logoUrl?: string | null;
          name: string;
          slug: string;
          updatedAt?: string | null;
        };
        Update: {
          createdAt?: string | null;
          description?: string | null;
          id?: string;
          logoUrl?: string | null;
          name?: string;
          slug?: string;
          updatedAt?: string | null;
        };
        Relationships: [];
      };
      chats: {
        Row: {
          appId: string;
          createdAt: string | null;
          id: string;
          name: string | null;
          profileId: string;
          settings: Json | null;
          updatedAt: string | null;
        };
        Insert: {
          appId: string;
          createdAt?: string | null;
          id?: string;
          name?: string | null;
          profileId: string;
          settings?: Json | null;
          updatedAt?: string | null;
        };
        Update: {
          appId?: string;
          createdAt?: string | null;
          id?: string;
          name?: string | null;
          profileId?: string;
          settings?: Json | null;
          updatedAt?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "chats_appId_fkey";
            columns: ["appId"];
            isOneToOne: false;
            referencedRelation: "apps";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chats_profileId_fkey";
            columns: ["profileId"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      customers: {
        Row: {
          id: string;
          stripe_customer_id: string | null;
        };
        Insert: {
          id: string;
          stripe_customer_id?: string | null;
        };
        Update: {
          id?: string;
          stripe_customer_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "customers_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      messages: {
        Row: {
          chatId: string | null;
          content: string | null;
          createdAt: string | null;
          id: string;
          profileId: string | null;
          role: Database["public"]["Enums"]["message_role"] | null;
          updatedAt: string | null;
        };
        Insert: {
          chatId?: string | null;
          content?: string | null;
          createdAt?: string | null;
          id?: string;
          profileId?: string | null;
          role?: Database["public"]["Enums"]["message_role"] | null;
          updatedAt?: string | null;
        };
        Update: {
          chatId?: string | null;
          content?: string | null;
          createdAt?: string | null;
          id?: string;
          profileId?: string | null;
          role?: Database["public"]["Enums"]["message_role"] | null;
          updatedAt?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "messages_chatId_fkey";
            columns: ["chatId"];
            isOneToOne: false;
            referencedRelation: "chats";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "messages_profileId_fkey";
            columns: ["profileId"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      prices: {
        Row: {
          active: boolean | null;
          currency: string | null;
          description: string | null;
          id: string;
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null;
          interval_count: number | null;
          metadata: Json | null;
          product_id: string | null;
          trial_period_days: number | null;
          type: Database["public"]["Enums"]["pricing_type"] | null;
          unit_amount: number | null;
        };
        Insert: {
          active?: boolean | null;
          currency?: string | null;
          description?: string | null;
          id: string;
          interval?:
            | Database["public"]["Enums"]["pricing_plan_interval"]
            | null;
          interval_count?: number | null;
          metadata?: Json | null;
          product_id?: string | null;
          trial_period_days?: number | null;
          type?: Database["public"]["Enums"]["pricing_type"] | null;
          unit_amount?: number | null;
        };
        Update: {
          active?: boolean | null;
          currency?: string | null;
          description?: string | null;
          id?: string;
          interval?:
            | Database["public"]["Enums"]["pricing_plan_interval"]
            | null;
          interval_count?: number | null;
          metadata?: Json | null;
          product_id?: string | null;
          trial_period_days?: number | null;
          type?: Database["public"]["Enums"]["pricing_type"] | null;
          unit_amount?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      products: {
        Row: {
          active: boolean | null;
          description: string | null;
          id: string;
          image: string | null;
          metadata: Json | null;
          name: string | null;
        };
        Insert: {
          active?: boolean | null;
          description?: string | null;
          id: string;
          image?: string | null;
          metadata?: Json | null;
          name?: string | null;
        };
        Update: {
          active?: boolean | null;
          description?: string | null;
          id?: string;
          image?: string | null;
          metadata?: Json | null;
          name?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          billing_address: Json | null;
          full_name: string | null;
          id: string;
          payment_method: Json | null;
          updated_at: string | null;
          username: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          billing_address?: Json | null;
          full_name?: string | null;
          id: string;
          payment_method?: Json | null;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          billing_address?: Json | null;
          full_name?: string | null;
          id?: string;
          payment_method?: Json | null;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      subscriptions: {
        Row: {
          cancel_at: string | null;
          cancel_at_period_end: boolean | null;
          canceled_at: string | null;
          created: string;
          current_period_end: string;
          current_period_start: string;
          ended_at: string | null;
          id: string;
          metadata: Json | null;
          price_id: string | null;
          quantity: number | null;
          status: Database["public"]["Enums"]["subscription_status"] | null;
          trial_end: string | null;
          trial_start: string | null;
          user_id: string;
        };
        Insert: {
          cancel_at?: string | null;
          cancel_at_period_end?: boolean | null;
          canceled_at?: string | null;
          created?: string;
          current_period_end?: string;
          current_period_start?: string;
          ended_at?: string | null;
          id: string;
          metadata?: Json | null;
          price_id?: string | null;
          quantity?: number | null;
          status?: Database["public"]["Enums"]["subscription_status"] | null;
          trial_end?: string | null;
          trial_start?: string | null;
          user_id: string;
        };
        Update: {
          cancel_at?: string | null;
          cancel_at_period_end?: boolean | null;
          canceled_at?: string | null;
          created?: string;
          current_period_end?: string;
          current_period_start?: string;
          ended_at?: string | null;
          id?: string;
          metadata?: Json | null;
          price_id?: string | null;
          quantity?: number | null;
          status?: Database["public"]["Enums"]["subscription_status"] | null;
          trial_end?: string | null;
          trial_start?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey";
            columns: ["price_id"];
            isOneToOne: false;
            referencedRelation: "prices";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      token_usage: {
        Row: {
          created_at: string;
          date_used: string | null;
          id: string;
          remaining_tokens: number | null;
          tokens_used: number | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          date_used?: string | null;
          id?: string;
          remaining_tokens?: number | null;
          tokens_used?: number | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          date_used?: string | null;
          id?: string;
          remaining_tokens?: number | null;
          tokens_used?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "token_usage_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      message_role: "system" | "user" | "assistant";
      pricing_plan_interval: "day" | "week" | "month" | "year";
      pricing_type: "one_time" | "recurring";
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
        | "paused";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
