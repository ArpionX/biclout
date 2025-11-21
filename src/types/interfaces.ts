export interface Usuario{
    email: string;
    nombre: string;
    password?: string;
}

export interface Tarea{
    id: string;
    titulo: string;
    descripcion: string;
    categoria: string;
    fechaCreacion: string;
    completada: boolean;
}

export interface AuthResultado{
    logrado: boolean;
    error?: string;
    usuario?: Usuario;
}



export interface AuthContextInterface{
    usuario: Usuario | null;
    cargando: boolean;
    login: (email: string, password: string) => {logrado: boolean; error?: string, usuario?: Usuario};
    registro: (email:string, nombre:string, password:string) => {logrado: boolean; error?: string};
    logout: () => void;
}

export interface TaskContextInterface{
    tareas: Tarea[];
    categorias: string[];
    crearTarea: (Tarea: Omit<Tarea, 'id' | 'fechaCreacion' | 'completada'>) => Tarea;
    actualizarTarea: (id: string, actualizaciones: Partial<Tarea>) => Tarea | null;
    eliminarTarea: (id: string) => boolean;
    crearCategoria: (categoria: string) => boolean;
    loadData: () => void;
}

export interface TaskCardProps {
    tarea: Tarea;
    onEdit: (tarea: Tarea) => void;
    onDelete: () => void;
    onToggle: () => void;
    }

export interface TaskModalProps {
    tarea?: Tarea | null;
    categorias: string[];
    onClose: () => void;
    onCreate: (tarea: { titulo: string; descripcion: string; categoria: string }) => void;
    onUpdate: (id: string, actualizaciones: Partial<Tarea>) => void;
}
export interface CategoryModalProps {
    onClose: () => void;
    onCreate: (category: string) => boolean;
}
