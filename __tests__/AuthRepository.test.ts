import { AuthRepository } from '@/repositories/AuthRepository';

// Simple in-memory localStorage mock
function createLocalStorageMock() {
    let store: Record<string, string> = {};
    return {
        getItem(key: string) {
        return store[key] ?? null;
        },
        setItem(key: string, value: string) {
        store[key] = String(value);
        },
        removeItem(key: string) {
        delete store[key];
        },
        clear() {
        store = {};
        },
    };
}

describe('AuthRepository', () => {
    let repo: AuthRepository;

    beforeEach(() => {
        
        global.window = global.window || {};
        // @ts-ignore
        global.window.localStorage = createLocalStorageMock();
        repo = new AuthRepository();
    });

    test('RegistrarUsuario evita duplicados y permite nuevo registro', () => {
        const duplicate = repo.RegistrarUsuario({ email: 'demo@example.com', nombre: 'usuarioPrueba', password: 'demo123' });
        expect(duplicate.logrado).toBe(false);

        const nuevo = repo.RegistrarUsuario({ email: 'nuevo@ejemplo.com', nombre: 'nuevoUser', password: 'abc123' });
        expect(nuevo.logrado).toBe(true);
    });

    test('login retorna usuario válido y logout borra sesion', () => {
        repo.RegistrarUsuario({ email: 'u@t.com', nombre: 'u', password: 'pass' });
        const res = repo.login('u@t.com', 'pass');
        expect(res.logrado).toBe(true);
        expect(res.usuario).toBeDefined();
        expect(res.usuario?.email).toBe('u@t.com');

        repo.logout();
        const session = repo.ObtenerSesion();
        expect(session).toBeNull();
    });
});
