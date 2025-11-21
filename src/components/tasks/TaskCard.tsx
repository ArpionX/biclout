'use client';

import { TaskCardProps } from '@/types/interfaces';
import { Check, Edit2, Trash2 } from 'lucide-react';

export const TaskCard: React.FC<TaskCardProps> = ({ tarea, onEdit, onDelete, onToggle }) => {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100 hover:shadow-xl transition-all duration-300">
        <div className="flex items-start gap-4">
            <button
            onClick={onToggle}
            aria-label={tarea.completada ? "Marcar como pendiente" : "Marcar como completada"}
            className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                tarea.completada
                ? 'bg-green-500 border-green-500 shadow-md'
                : 'border-gray-300 hover:bg-blue-50 hover:border-blue-500'
            }`}
            >
            {tarea.completada && <Check size={16} className="text-white" />}
            </button>

            <div className="flex-1 min-w-0">
            <h3 className={`text-xl font-semibold ${tarea.completada ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {tarea.titulo}
            </h3>
            <p className="text-sm text-gray-600 mt-1 truncate">{tarea.descripcion}</p>
            <div className="flex items-center gap-3 mt-3">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full shadow-sm">
                {tarea.categoria}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                <span className="text-sm">🗓️</span>
                {formatDate(tarea.fechaCreacion)}
                </span>
            </div>
            </div>

            <div className="flex gap-1 flex-shrink-0">
            <button
                onClick={() => onEdit(tarea)}
                aria-label="Editar tarea"
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
            >
                <Edit2 size={20} />
            </button>
            <button
                onClick={onDelete}
                aria-label="Eliminar tarea"
                className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
            >
                <Trash2 size={20} />
            </button>
            </div>
        </div>
        </div>
    );
};