import { Tarea } from '@/types/interfaces';

export function filterTasks(
    tareas: Tarea[],
    searchTerm: string,
    filterCategory: string,
    filterStatus: string
    ): Tarea[] {
    const normalize = (s: string) =>
        s
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase()
        .trim();

    const term = normalize(searchTerm);

    return tareas.filter((tarea) => {
        const titulo = normalize(tarea.titulo);
        const descripcion = normalize(tarea.descripcion);

        const matchesSearch = term === '' || titulo.includes(term) || descripcion.includes(term);

        const matchesCategory = filterCategory === 'all' || tarea.categoria === filterCategory;

        const matchesStatus =
        filterStatus === 'all' ||
        (filterStatus === 'completed' && tarea.completada) ||
        (filterStatus === 'pending' && !tarea.completada);

        return matchesSearch && matchesCategory && matchesStatus;
    });
}

export default filterTasks;
