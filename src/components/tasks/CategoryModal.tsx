import { CategoryModalProps } from '@/types/interfaces';
import { X } from 'lucide-react';
import { useState } from 'react';

export const CategoryModal: React.FC<CategoryModalProps> = ({ onClose, onCreate }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!name.trim()) {
            setError('El nombre de la categoría es requerido.');
            return;
        }

        const success = onCreate(name.toLowerCase().trim());
        if (success) {
        onClose();
        } else {
        setError('Esta categoría ya existe.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black opacity-80 flex items-center justify-center p-4 z-50 animate-fade-in">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 animate-slide-up-in">
            <form onSubmit={handleSubmit}>
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800">Nueva Categoría</h2>
                    <button onClick={onClose} type="button" className="text-gray-400 hover:text-gray-700 p-1 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-200 transition duration-150"
                            placeholder="ej: proyectos o fitness"
                            required
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-200">{error}</div>
                    )}
                </div>

                <div className="flex gap-3 p-6 border-t border-gray-100">
                    <button
                        onClick={onClose}
                        type="button"
                        className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-bold shadow-md hover:shadow-lg"
                        disabled={!name.trim()}
                    >
                        Crear Categoría
                    </button>
                </div>
            </form>
        </div>
        </div>
    );
};