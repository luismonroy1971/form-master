'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()
  const login = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/signin`,
        {
          email: email,
          password: password,
        }
      );
      toast.success('Sesión iniciada correctamente');
      // Here set user details or tokens in the state or localStorage as needed
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', JSON.stringify(response.data.email));
      localStorage.setItem('userId', JSON.stringify(response.data.id));
      router.push('/admin')
    } catch (error: any) {
      const errorResponse = error.response.data?.msg;
      toast.error(errorResponse || 'Ocurrió un error');
      // Handle login failure (e.g., incorrect credentials, network error, etc.)
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded mb-2"
      />
      <button className="bg-blue-500 text-white p-2 rounded" onClick={login}>
        Login
      </button>
    </div>
  );
};
