'use client';

import { useAuth } from '@/context/AuthContext';
import { LayoutDashboard } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Todos los campos son requeridos');
      return;
    }

    const resultado = login(email, password);
    if (!resultado.logrado) {
      setError(resultado.error || 'Error de inicio de sesión');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md border border-gray-100">
      <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center flex items-center justify-center gap-2">
        <LayoutDashboard size={30} className='text-indigo-500'/> Task Manager
      </h1>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-200 transition duration-150"
            placeholder="usuario@ejemplo.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-200 transition duration-150"
            placeholder="••••••••"
            required
          />
        </div>
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-200">{error}</div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-bold shadow-md hover:shadow-lg"
        >
          Iniciar Sesión
        </button>
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={() => router.push('/register')}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          ¿No tienes cuenta? Regístrate aquí
        </button>
      </div>
      <div className="mt-8 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Credenciales Demo: demo@example.com / demo123
        </p>
      </div>
    </form>
  );
};