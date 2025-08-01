'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockUsers } from '../data/users';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';

export default function LoginMockup() {
  const { login, isLoading } = useAuth();
  const [selectedUser, setSelectedUser] = useState('');
  const [password, setPassword] = useState('password123');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleLogin = async () => {
    if (!selectedUser) {
      setMessage('Please select a user');
      setMessageType('error');
      return;
    }

    const user = mockUsers.find(u => u.email === selectedUser);
    if (!user) {
      setMessage('User not found');
      setMessageType('error');
      return;
    }

    const success = await login(user.email, password);
    
    if (success) {
      setMessage(`Successfully logged in as ${user.name}`);
      setMessageType('success');
    } else {
      setMessage('Login failed');
      setMessageType('error');
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Login Mockup</h2>
      
      <div className="mb-6">
        <label className="block text-gray-300 text-sm font-bold mb-2">
          Select Mock User
        </label>
        <div className="relative">
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="bg-gray-800 text-white w-full py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 pl-10"
            disabled={isLoading}
          >
            <option value="">Select a user</option>
            {mockUsers.map(user => (
              <option key={user.id} value={user.email}>
                {user.name} ({user.email}) - {user.role}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaUser className="text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-300 text-sm font-bold mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-800 text-white w-full py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 pl-10"
            placeholder="Enter password"
            disabled={isLoading}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaLock className="text-gray-400" />
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-1">Default password: password123</p>
      </div>
      
      {message && (
        <div className={`p-3 rounded-md mb-4 ${messageType === 'success' ? 'bg-green-800 text-green-100' : 'bg-red-800 text-red-100'}`}>
          {message}
        </div>
      )}
      
      <button
        onClick={handleLogin}
        disabled={isLoading}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center"
      >
        {isLoading ? (
          <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
        ) : (
          <FaSignInAlt className="mr-2" />
        )}
        {isLoading ? 'Logging in...' : 'Login as Selected User'}
      </button>
      
      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">
          This is a mockup for demonstration purposes.
          <br />
          All users have the password: <span className="font-mono">password123</span>
        </p>
      </div>
    </div>
  );
}
