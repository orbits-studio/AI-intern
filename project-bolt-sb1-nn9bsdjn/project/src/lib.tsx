import { supabase } from './supabase';
import type { AuthError } from '../types/auth';

export async function signIn(email: string, password: string): Promise<AuthError | null> {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        return { message: 'Invalid email or password' };
      }
      return { message: error.message };
    }

    return null;
  } catch (err: any) {
    return { message: 'An unexpected error occurred' };
  }
}

export async function signUp(email: string, password: string, fullName: string): Promise<AuthError | null> {
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      if (error.message.includes('already registered')) {
        return { message: 'This email is already registered' };
      }
      return { message: error.message };
    }

    return null;
  } catch (err: any) {
    return { message: 'An unexpected error occurred' };
  }
}

export async function resetPassword(email: string): Promise<AuthError | null> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      return { message: error.message };
    }

    return null;
  } catch (err: any) {
    return { message: 'An unexpected error occurred' };
  }
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}
