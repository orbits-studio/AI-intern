import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import SignUp from './components/SignUp';
import { supabase } from './lib/supabase';
import { signIn, signOut } from './lib/auth';
import type { User } from '@supabase/supabase-js';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'login' | 'forgot-password' | 'signup'>('login');

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for changes on auth state (signed in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const error = await signIn(email, password);
    if (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await signOut();
    setEmail('');
    setPassword('');
  };

  if (user) {
    return <Dashboard onLogout={handleLogout} />;
  }

  const renderView = () => {
    switch (view) {
      case 'forgot-password':
        return <ForgotPassword onBack={() => setView('login')} />;
      case 'signup':
        return <SignUp onBack={() => setView('login')} />;
      default:
        return (
          <>
            <div className="mb-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#ff5757] to-[#ff3d3d] rounded-2xl flex items-center justify-center">
                <span className="text-3xl font-bold text-white">Z</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome back</h1>
              <p className="text-gray-600">Please enter your details to sign in</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5757] focus:border-[#ff5757]"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5757] focus:border-[#ff5757]"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-[#ff5757] border-gray-300 rounded focus:ring-[#ff5757]" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setView('forgot-password')}
                  className="text-sm text-[#ff5757] hover:text-[#ff3d3d]"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={!email || !password || isLoading}
                className="w-full bg-gradient-to-r from-[#ff5757] to-[#ff3d3d] text-white py-2 px-4 rounded-lg hover:from-[#ff3d3d] hover:to-[#ff2424] focus:ring-4 focus:ring-[#ff5757]/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => setView('signup')}
                className="text-[#ff5757] hover:text-[#ff3d3d] font-medium"
              >
                Sign up
              </button>
            </p>
          </>
        );
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(74, 29, 150, 0.8), rgba(49, 46, 129, 0.8)), url('https://pin.it/53hvB1hHX?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80')`,
        backgroundBlendMode: 'multiply'
      }}
    >
      <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
        {renderView()}
      </div>
    </div>
  );
}

export default App;
