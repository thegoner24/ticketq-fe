'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaUser, FaLock, FaTicketAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import LoginMockup from '../components/LoginMockup';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
  });

  const [showMockup, setShowMockup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: '',
      password: '',
      general: '',
    };

    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        router.push('/tickets');
      } else {
        setErrors(prev => ({
          ...prev,
          general: 'Invalid email or password'
        }));
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        general: 'An error occurred. Please try again.'
      }));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 md:pt-28 py-6 md:py-8">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FaTicketAlt className="text-red-500 text-4xl" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Impact, fantasy', letterSpacing: '0.5px' }}>
            TICKET<span className="text-red-500">Q</span>
          </h1>
          <p className="text-gray-400">Sign in to access your tickets</p>
        </div>
        
        <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-lg overflow-hidden shadow-lg shadow-red-900/20">
          <div className="px-4 py-6 md:px-6 md:py-8">
            {errors.general && (
              <div className="bg-red-900/30 border border-red-800 text-red-400 px-4 py-3 rounded mb-4 text-sm">
                {errors.general}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-xs md:text-sm font-medium text-gray-300 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-500 text-sm" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-800 block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-xs md:text-sm font-medium text-gray-300 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-500 text-sm" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-gray-800 block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    placeholder="••••••"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
                
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Back to Home
                </Link>
              </div>
              
              <div className="text-center text-sm text-gray-400">
                Don't have an account?{' '}
                <Link href="/register" className="text-red-500 hover:text-red-400">
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <button 
            onClick={() => setShowMockup(!showMockup)} 
            className="text-red-500 hover:text-red-400 text-sm underline"
          >
            {showMockup ? 'Hide' : 'Show'} Login Mockup
          </button>
        </div>
      </div>

      {showMockup && (
        <div className="mt-8">
          <LoginMockup />
        </div>
      )}
    </div>
  );
}
