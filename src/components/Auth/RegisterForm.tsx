'use client';

import { useAuth } from '@/context/AuthContext';
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export const RegisterForm = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const { registro } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

        if (!name || !email || !password) {
        setError('Todos los campos son requeridos');
        return;
        }

        if (password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres');
        return;
        }

        // registro espera (email, nombre, password)
        const resultado = registro(email, name, password);
        if (resultado.logrado) {
        setSuccess(true);
        setError('');
        } else {
        setError(resultado.error || 'Error de registro');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center flex items-center justify-center gap-2">
        <User size={30} className='text-indigo-500'/> Crear Cuenta
        </h1>
        <div className="space-y-5">
            <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-200 transition duration-150"
                placeholder="Tu nombre completo"
                required
            />
            </div>
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
                placeholder="Mínimo 6 caracteres"
                required
            />
            </div>
            {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-200">{error}</div>
            )}
            {success && (
            <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm font-medium border border-green-200">
                ¡Cuenta creada! Serás redirigido al login.
            </div>
            )}
            <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-bold shadow-md hover:shadow-lg"
            >
            Registrarse
            </button>
        </div>
        <div className="mt-6 text-center">
            <button
            onClick={() => router.push('/login')}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
            ¿Ya tienes cuenta? Inicia sesión
            </button>
        </div>
        </form>
    );
};