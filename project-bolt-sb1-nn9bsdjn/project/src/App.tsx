import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import SignUp from './components/SignUp';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState<'login' | 'forgot-password' | 'signup'>('login');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (email.includes('@') && password.length >= 6) {
        setIsLoggedIn(true);
      } else {
        setError('Invalid email or password');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    setError('');

    // Simulate social login API call
    setTimeout(() => {
      console.log(`Logging in with ${provider}`);
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 1000);
  };

  if (isLoggedIn) {
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

            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleSocialLogin('google')}
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                Continue with Google
              </button>
              <button
                onClick={() => handleSocialLogin('facebook')}
                className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white rounded-lg px-4 py-2 hover:bg-[#1865F2] transition-colors"
                disabled={isLoading}
              >
                <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5" />
                Continue with Facebook
              </button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with email</span>
              </div>
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
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #4a1d96 0%, #312e81 100%)',
        backgroundImage: `url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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