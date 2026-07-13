export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      bay_notes: {
        Row: {
          bay: string
          date: string
          note: string
          updated_at: string
        }
        Insert: {
          bay: string
          date: string
          note?: string
          updated_at?: string
        }
        Update: {
          bay?: string
          date?: string
          note?: string
          updated_at?: string
        }
        Relationships: []
      }
      counters: {
        Row: {
          key: string
          updated_at: string
          value: number
        }
        Insert: {
          key: string
          updated_at?: string
          value?: number
        }
        Update: {
          key?: string
          updated_at?: string
          value?: number
        }
        Relationships: []
      }
      job_hours: {
        Row: {
          created_at: string
          created_at_ms: number
          date: string
          id: string
          job_id: string
          person: string
          start_time: string | null
          stop_time: string | null
        }
        Insert: {
          created_at?: string
          created_at_ms?: number
          date: string
          id?: string
          job_id: string
          person?: string
          start_time?: string | null
          stop_time?: string | null
        }
        Update: {
          created_at?: string
          created_at_ms?: number
          date?: string
          id?: string
          job_id?: string
          person?: string
          start_time?: string | null
          stop_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_hours_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      job_notes: {
        Row: {
          created_at_ms: number
          id: string
          job_id: string
          text: string
        }
        Insert: {
          created_at_ms?: number
          id?: string
          job_id: string
          text?: string
        }
        Update: {
          created_at_ms?: number
          id?: string
          job_id?: string
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_notes_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          bay: string
          color: string | null
          company: string | null
          completed: boolean
          created_at_ms: number
          date: string
          employee: string
          id: string
          priority: number | null
          shift: string
          truck_id: string
          updated_at: string
          work: string
        }
        Insert: {
          bay: string
          color?: string | null
          company?: string | null
          completed?: boolean
          created_at_ms?: number
          date: string
          employee?: string
          id?: string
          priority?: number | null
          shift?: string
          truck_id: string
          updated_at?: string
          work: string
        }
        Update: {
          bay?: string
          color?: string | null
          company?: string | null
          completed?: boolean
          created_at_ms?: number
          date?: string
          employee?: string
          id?: string
          priority?: number | null
          shift?: string
          truck_id?: string
          updated_at?: string
          work?: string
        }
        Relationships: []
      }
      truck_files: {
        Row: {
          data_url: string
          id: string
          name: string
          size: number
          truck_id: string
          type: string
          uploaded_at_ms: number
        }
        Insert: {
          data_url: string
          id?: string
          name: string
          size?: number
          truck_id: string
          type?: string
          uploaded_at_ms?: number
        }
        Update: {
          data_url?: string
          id?: string
          name?: string
          size?: number
          truck_id?: string
          type?: string
          uploaded_at_ms?: number
        }
        Relationships: []
      }
      truck_notes: {
        Row: {
          note: string
          truck_id: string
          updated_at: string
        }
        Insert: {
          note?: string
          truck_id: string
          updated_at?: string
        }
        Update: {
          note?: string
          truck_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      truck_status: {
        Row: {
          completed: boolean
          invoiced: boolean
          truck_id: string
          updated_at: string
        }
        Insert: {
          completed?: boolean
          invoiced?: boolean
          truck_id: string
          updated_at?: string
        }
        Update: {
          completed?: boolean
          invoiced?: boolean
          truck_id?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      bump_counter: { Args: { _key: string }; Returns: number }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
