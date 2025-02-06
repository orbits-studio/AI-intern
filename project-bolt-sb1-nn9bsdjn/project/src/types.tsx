import type { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthError {
  message: string;
  status?: number;
}

export interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: AuthError | null;
}
