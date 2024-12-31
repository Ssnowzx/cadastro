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
      products: {
        Row: {
          id: string;
          created_at: string;
          category: string;
          fields: Json;
          quantity: number;
          stock: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          category: string;
          fields: Json;
          quantity: number;
          stock?: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          category?: string;
          fields?: Json;
          quantity?: number;
          stock?: number;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
