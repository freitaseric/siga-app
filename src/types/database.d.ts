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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      defined_permissions: {
        Row: {
          code: string
          description: string
        }
        Insert: {
          code: string
          description: string
        }
        Update: {
          code?: string
          description?: string
        }
        Relationships: []
      }
      logs: {
        Row: {
          message: string | null
        }
        Insert: {
          message?: string | null
        }
        Update: {
          message?: string | null
        }
        Relationships: []
      }
      producers: {
        Row: {
          caf: string | null
          cpf: string
          created_at: string | null
          email: string | null
          name: string
          nickname: string | null
          phone: string | null
          uid: string
          updated_at: string | null
        }
        Insert: {
          caf?: string | null
          cpf: string
          created_at?: string | null
          email?: string | null
          name: string
          nickname?: string | null
          phone?: string | null
          uid?: string
          updated_at?: string | null
        }
        Update: {
          caf?: string | null
          cpf?: string
          created_at?: string | null
          email?: string | null
          name?: string
          nickname?: string | null
          phone?: string | null
          uid?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          name: string
          permissions: string[] | null
          position: string | null
          sector: Database["public"]["Enums"]["sector_type"]
          uid: string
        }
        Insert: {
          created_at?: string | null
          name: string
          permissions?: string[] | null
          position?: string | null
          sector: Database["public"]["Enums"]["sector_type"]
          uid: string
        }
        Update: {
          created_at?: string | null
          name?: string
          permissions?: string[] | null
          position?: string | null
          sector?: Database["public"]["Enums"]["sector_type"]
          uid?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          area: number | null
          complemento: string | null
          created_at: string | null
          gleba: string | null
          id: number
          latitude: number | null
          longitude: number | null
          name: string | null
          numero: string | null
          pa: string | null
          producer_id: string
          vicinal: string | null
          vila: string | null
        }
        Insert: {
          area?: number | null
          complemento?: string | null
          created_at?: string | null
          gleba?: string | null
          id?: number
          latitude?: number | null
          longitude?: number | null
          name?: string | null
          numero?: string | null
          pa?: string | null
          producer_id: string
          vicinal?: string | null
          vila?: string | null
        }
        Update: {
          area?: number | null
          complemento?: string | null
          created_at?: string | null
          gleba?: string | null
          id?: number
          latitude?: number | null
          longitude?: number | null
          name?: string | null
          numero?: string | null
          pa?: string | null
          producer_id?: string
          vicinal?: string | null
          vila?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "producers"
            referencedColumns: ["uid"]
          },
        ]
      }
      services: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: number
          observations: string | null
          producer_id: string
          sector: Database["public"]["Enums"]["sector_type"]
          status: Database["public"]["Enums"]["status_servico"] | null
          type: Database["public"]["Enums"]["tipo_servico"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: number
          observations?: string | null
          producer_id: string
          sector: Database["public"]["Enums"]["sector_type"]
          status?: Database["public"]["Enums"]["status_servico"] | null
          type: Database["public"]["Enums"]["tipo_servico"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: number
          observations?: string | null
          producer_id?: string
          sector?: Database["public"]["Enums"]["sector_type"]
          status?: Database["public"]["Enums"]["status_servico"] | null
          type?: Database["public"]["Enums"]["tipo_servico"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "services_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["uid"]
          },
          {
            foreignKeyName: "services_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "producers"
            referencedColumns: ["uid"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      jwt_custom_claims: {
        Args: { event: Json } | { user_id: string }
        Returns: Json
      }
    }
    Enums: {
      sector_type: "gestao" | "credito" | "administrativo"
      status_servico: "iniciado" | "finalizado" | "cancelado"
      tipo_servico: "caf" | "declaracao_produtor_rural"
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
    Enums: {
      sector_type: ["gestao", "credito", "administrativo"],
      status_servico: ["iniciado", "finalizado", "cancelado"],
      tipo_servico: ["caf", "declaracao_produtor_rural"],
    },
  },
} as const
