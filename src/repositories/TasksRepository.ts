import { Tarea } from "@/types/interfaces";

export class TaskRepository{
    private storageKey = 'app_tareas';

    private ObtenerTareasEjemplo(): Tarea[]{
        return [
            {
                id: '1',
                titulo: 'Comprar víveres',
                descripcion: 'Comprar frutas, verduras y leche en el supermercado.',
                categoria: 'Personal',
                fechaCreacion: new Date().toISOString(),
                completada: false
            },
            {
                id: '2',
                titulo: 'Reunión con el equipo',
                descripcion: 'Discutir el progreso del proyecto y próximos pasos.',
                categoria: 'Trabajo',
                fechaCreacion: new Date().toISOString(),
                completada: true
            }
        ]
    }

    ObtenerTareas(): Tarea[]{
        if(typeof window !== 'undefined'){
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data): this.ObtenerTareasEjemplo();
        };
        return this.ObtenerTareasEjemplo();
    }

    GuardarTareas(tareas: Tarea[]): boolean{
        if(typeof window === 'undefined') return false;
        localStorage.setItem(this.storageKey, JSON.stringify(tareas));
        return true;
    }

    CrearTarea(tarea: Omit<Tarea, 'id' | 'fechaCreacion' | 'completada'>): Tarea{
        const Tareas = this.ObtenerTareas();
        const nuevaTarea: Tarea = {
            ...tarea,
            id: (Tareas.length + 1).toString(),
            fechaCreacion: new Date().toISOString(),
            completada: false
        };
        Tareas.push(nuevaTarea);
        this.GuardarTareas(Tareas);
        return nuevaTarea;
    }

    ActualizarTarea(id: string, actualizaciones: Partial<Tarea>): Tarea | null{
        const tareas = this.ObtenerTareas();
        const indice = tareas.findIndex(t => t.id === id);
        if(indice !== -1){
            tareas[indice] = { ...tareas[indice], ...actualizaciones };
            this.GuardarTareas(tareas);
            return tareas[indice];
        }
        return null;
    }

    EliminarTarea(id: string): boolean{
        const tareas = this.ObtenerTareas();
        const nuevasTareas = tareas.filter(t => t.id !== id);
        if(nuevasTareas.length !== tareas.length){
            this.GuardarTareas(nuevasTareas);
            return true;
        }
        return false;
    }

    
}