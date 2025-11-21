'use client';
import { CategoryRepository } from '@/repositories/CategoryRepository';
import { TaskRepository } from '@/repositories/TasksRepository';
import { Tarea, TaskContextInterface } from '@/types/interfaces';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';

const TaskContext = createContext<TaskContextInterface | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
    const { usuario } = useAuth(); 
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [categorias, setCategorias] = useState<string[]>([]);
    
    const taskRepo = useMemo(() => new TaskRepository(), []);
    const categoryRepo = useMemo(() => new CategoryRepository(), []);
    
    const loadData = () => {
        setTareas(taskRepo.ObtenerTareas());
        setCategorias(categoryRepo.ObtenerCategorias());
    };
    
    useEffect(() => {
        if (usuario) {
            loadData();
        } else {
            setTareas([]);
            setCategorias([]);
        }
    }, [usuario]);

    const crearTarea: TaskContextInterface['crearTarea'] = (tarea) => {
        const newTask = taskRepo.CrearTarea(tarea);
        setTareas((prev) => [...prev, newTask]);
        return newTask;
    };

    const actualizarTarea: TaskContextInterface['actualizarTarea'] = (id, updates) => {
        const updated = taskRepo.ActualizarTarea(id, updates);
        if (updated) {
        setTareas((prev) => prev.map(t => t.id === id ? updated : t));
        }
        return updated;
    };

    const eliminarTarea: TaskContextInterface['eliminarTarea'] = (id) => {
        const success = taskRepo.EliminarTarea(id);
        if (success) {
        setTareas((prev) => prev.filter(t => t.id !== id));
        }
        return success;
    };

    const crearCategoria: TaskContextInterface['crearCategoria'] = (category) => {
        const success = categoryRepo.CrearCategoria(category);
        if (success) {
        setCategorias((prev) => [...prev, category]);
        }
        return success;
    };

    const value = {
        tareas, categorias, loadData,
        crearTarea, actualizarTarea, eliminarTarea, crearCategoria
    };

    return (
        <TaskContext.Provider value={value}>
        {children}
        </TaskContext.Provider>
    );
    }

export const useTasks = (): TaskContextInterface => {
const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};