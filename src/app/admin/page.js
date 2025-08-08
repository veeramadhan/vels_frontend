'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new URLSearchParams();
      data.append('username', form.username);
      data.append('password', form.password);

      const res = await axios.post('https://vels-backend-xkam.onrender.com/api/auth/login', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      localStorage.setItem('admin_token', res.data.access_token);
      console.log('Login successful', res.data.access_token);
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center pt-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        className="self-start mb-6 text-white  font-semibold transition"
      >
        ← Back to Home
      </button>

      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full p-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-700"
      >
        <h2 className="text-4xl font-extrabold text-white mb-8 text-center tracking-wide">
          Admin Login
        </h2>
        {error && (
          <p className="mb-4 text-center text-red-500 font-semibold bg-red-100 rounded-md py-2 px-4">
            {error}
          </p>
        )}
        <input
          name="username"
          onChange={handleChange}
          placeholder="Username"
          className="w-full mb-6 px-5 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          autoComplete="username"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          className="w-full mb-8 px-5 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          autoComplete="current-password"
        />
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold text-lg tracking-wide transition shadow-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
}
