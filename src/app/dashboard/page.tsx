'use client';

import { CategoryModal } from '@/components/tasks/CategoryModal';
import { TaskCard } from '@/components/tasks/TaskCard';
import { TaskModal } from '@/components/tasks/TaskModal';
import { useAuth } from '@/context/AuthContext';
import { useTasks } from '@/context/TaskContext';
import { Tarea } from '@/types/interfaces';
import { Check, Filter, LayoutDashboard, LogOut, Plus, Search } from 'lucide-react';
import { useMemo, useState } from 'react';


const Dashboard = () => {
    // Ahora usamos los hooks específicos
    const { usuario, logout } = useAuth();
    const { tareas, categorias, crearTarea, actualizarTarea, eliminarTarea, crearCategoria } = useTasks();
    
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [editingTask, setEditingTask] = useState<Tarea | null>(null);

    const filteredTasks = useMemo(() => {
        return tareas.filter(tarea => {
            
            const matchesSearch = tarea.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    tarea.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = filterCategory === 'all' || tarea.categoria === filterCategory;
            const matchesStatus = filterStatus === 'all' || 
                                    (filterStatus === 'completed' && tarea.completada) ||
                                    (filterStatus === 'pending' && !tarea.completada);
        return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [tareas, searchTerm, filterCategory, filterStatus]);

    const totalTasks = tareas.length;
    const pendingTasks = tareas.filter(t => !t.completada).length;
    const completedTasks = tareas.filter(t => t.completada).length;


    const handleEditTask = (task: Tarea) => {
        setEditingTask(task);
        setShowTaskModal(true);
    };

    const handleCloseModal = () => {
        setShowTaskModal(false);
        setEditingTask(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
                    <LayoutDashboard className="text-blue-500" size={28}/> Task Manager
                </h1>
                <p className="text-sm text-gray-600 mt-1">Bienvenido, <span className="font-semibold text-blue-600">{usuario?.nombre}</span></p>
            </div>
            <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors border border-red-200"
            >
                <LogOut size={18} />
                Cerrar Sesión
            </button>
            </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-10">
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <MetricCard title="Total Tareas" value={totalTasks} color="text-gray-800" icon="list" />
            <MetricCard title="Pendientes" value={pendingTasks} color="text-orange-600" icon="clock" />
            <MetricCard title="Completadas" value={completedTasks} color="text-green-600" icon="check" />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex flex-wrap gap-4 items-center">
                <div className="flex-1 min-w-[200px] sm:min-w-64">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                    type="text"
                    placeholder="Buscar por título o descripción..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-200 transition duration-150"
                    />
                </div>
                </div>

                <div className="flex gap-4">
                    <SelectFilter
                        label="Categoría"
                        value={filterCategory}
                        onChange={setFilterCategory}
                        options={categorias}
                    />

                    <SelectFilter
                        label="Estado"
                        value={filterStatus}
                        onChange={setFilterStatus}
                        options={['pending', 'completed']}
                        isStatus={true}
                    />
                </div>
                
                <div className='flex gap-2 ml-auto'>
                    <button
                        onClick={() => setShowCategoryModal(true)}
                        className="px-4 py-2.5 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm flex items-center gap-2 shadow-md"
                    >
                        <Filter size={18} /> + Cat.
                    </button>

                    <button
                        onClick={() => setShowTaskModal(true)}
                        className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold text-sm flex items-center gap-2 shadow-lg"
                    >
                        <Plus size={18} />
                        Nueva Tarea
                    </button>
                </div>
            </div>
            </div>

            <div className="space-y-4">
            {filteredTasks.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg p-16 text-center border border-gray-100">
                <p className="text-xl text-gray-500 font-medium">
                    {tareas.length === 0 ? "¡Crea tu primera tarea!" : "No hay tareas que coincidan con los filtros aplicados."}
                </p>
                </div>
            ) : (
                filteredTasks.map((task) => (
                <TaskCard
                    key={task.id}
                    tarea={task}
                    onEdit={handleEditTask}
                    onDelete={() => eliminarTarea(task.id)}
                    onToggle={() => actualizarTarea(task.id, { completada: !task.completada })}
                />
                ))
            )}
            </div>
        </main>

        {showTaskModal && (
            <TaskModal
            tarea={editingTask}
            // Pasamos categorías que vienen de useTasks
            categorias={categorias} 
            onClose={handleCloseModal}
            onCreate={crearTarea}
            onUpdate={actualizarTarea}
            />
        )}

        {showCategoryModal && (
            <CategoryModal
            onClose={() => setShowCategoryModal(false)}
            onCreate={crearCategoria}
            />
        )}
        </div>
    );
    };

    // ============================================
    // Componentes Auxiliares del Dashboard
    // ============================================

    interface MetricCardProps {
        title: string;
        value: number;
        color: string;
        icon: 'list' | 'clock' | 'check';
    }

    const MetricCard: React.FC<MetricCardProps> = ({ title, value, color, icon }) => {
        let IconComponent;
        if (icon === 'list') IconComponent = LayoutDashboard;
        else if (icon === 'clock') IconComponent = Filter;
        else IconComponent = Check;

        return (
            <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
                <div>
                    <p className="text-sm font-medium text-gray-500 uppercase">{title}</p>
                    <p className={`text-4xl font-extrabold mt-1 ${color}`}>{value}</p>
                </div>
                <IconComponent size={40} className={`opacity-20 ${color.replace('text-', 'text-')}`} />
            </div>
        );
    };

    interface SelectFilterProps {
        label: string;
        value: string;
        onChange: (value: string) => void;
        options: string[];
        isStatus?: boolean;
    }

    const SelectFilter: React.FC<SelectFilterProps> = ({ label, value, onChange, options, isStatus = false }) => {
        return (
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-200 transition duration-150 bg-white"
                aria-label={`Filtrar por ${label}`}
            >
                <option value="all">{`Todas las ${label.toLowerCase()}s`}</option>
                {options.map(opt => (
                    <option key={opt} value={opt}>
                        {isStatus 
                            ? (opt === 'completed' ? 'Completadas' : 'Pendientes')
                            : opt.charAt(0).toUpperCase() + opt.slice(1)
                        }
                    </option>
                ))}
            </select>
        );
};

export default Dashboard;