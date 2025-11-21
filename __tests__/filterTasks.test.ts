import { Tarea } from '@/types/interfaces';
import filterTasks from '@/utils/filterTasks';

const sampleTasks: Tarea[] = [
    {
        id: '1',
        titulo: 'Comprar batería',
        descripcion: 'Comprar batería para la bici',
        categoria: 'mantenimiento',
        fechaCreacion: '2025-11-21',
        completada: false,
    },
    {
        id: '2',
        titulo: 'Enviar email',
        descripcion: 'Enviar correo al cliente',
        categoria: 'trabajo',
        fechaCreacion: '2025-11-20',
        completada: true,
    },
    {
        id: '3',
        titulo: 'Lavar bicicleta',
        descripcion: 'Lavar y engrasar cadena',
        categoria: 'mantenimiento',
        fechaCreacion: '2025-11-19',
        completada: true,
    },
];

test('filtra por término de búsqueda (titulo/descripcion)', () => {
    const res = filterTasks(sampleTasks, 'bateria', 'all', 'all');
    expect(res).toHaveLength(1);
    expect(res[0].id).toBe('1');
});

test('filtra por categoría y estado', () => {
    const res = filterTasks(sampleTasks, '', 'mantenimiento', 'completed');
    expect(res).toHaveLength(1);
    expect(res[0].id).toBe('3');
});
