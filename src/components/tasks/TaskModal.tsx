'use client';

import { Tarea, TaskModalProps } from '@/types/interfaces';
import { X } from 'lucide-react';
import { useState } from 'react';

export const TaskModal: React.FC<TaskModalProps> = ({ tarea, categorias, onClose, onCreate, onUpdate }) => {
    const [title, setTitle] = useState(tarea?.titulo || '');
    const [description, setDescription] = useState(tarea?.descripcion || '');
    // Usamos categories prop que ya viene del Dashboard
    const [category, setCategory] = useState(tarea?.categoria || categorias[0] || 'trabajo'); 

    const isEditMode = !!tarea;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        const taskData: Omit<Tarea, 'id' | 'fechaCreacion' | 'completada'> = { titulo: title, descripcion: description, categoria: category };
        
        if (isEditMode && tarea) {
        onUpdate(tarea.id, taskData);
        } else {
        onCreate(taskData);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fade-in">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 animate-slide-up-in">
            <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800">
                {isEditMode ? 'Editar Tarea' : 'Nueva Tarea'}
                </h2>
                <button onClick={onClose} type="button" className="text-gray-400 hover:text-gray-700 p-1 rounded-full transition-colors">
                <X size={24} />
                </button>
            </div>

            <div className="p-6 space-y-5">
                <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Título</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-200 transition duration-150"
                    placeholder="Título de la tarea"
                    required
                />
                </div>

                <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-200 transition duration-150 resize-none"
                    placeholder="Describe la tarea..."
                />
                </div>

                <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Categoría</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-200 transition duration-150 bg-white"
                    required
                >
                    {categorias.map((cat: string) => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                    ))}
                </select>
                </div>
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
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold shadow-md hover:shadow-lg"
                disabled={!title.trim()}
                >
                {isEditMode ? 'Guardar Cambios' : 'Crear Tarea'}
                </button>
            </div>
            </form>
        </div>
        </div>
    );
};