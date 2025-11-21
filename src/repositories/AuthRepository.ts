import { AuthResultado, Usuario } from "@/types/interfaces";

export class AuthRepository{
    private storageKey = 'auth_usuarios';
    private sessionKey = 'auth_sesion';

    ObtenerUsuarios():Usuario[]{
        if(typeof window === 'undefined') return [];
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data): [{ email: 'demo@example.com', nombre: 'usuarioPrueba', password: 'demo123'}];
    }

    RegistrarUsuario(usuario:Usuario): AuthResultado{
        const usuarios = this.ObtenerUsuarios();
        if(usuarios.find(u => u.email === usuario.email)){
            return { logrado: false, error: 'El correo ya está registrado.'};
        }else if(usuarios.find(u => u.nombre === usuario.nombre)){
            return { logrado: false, error: 'El nombre de usuario ya está en uso.'};
        }
        usuarios.push(usuario);
        if(typeof window !== 'undefined'){
            localStorage.setItem(this.storageKey, JSON.stringify(usuarios))
        }
        return{ logrado: true};
    }

    login(email:string, password:string): AuthResultado{
        const usuarios = this.ObtenerUsuarios();
        const usuario = usuarios.find(u => u.email === email && u.password === password);
        if(usuario){
            const userData = {email: usuario.email, nombre: usuario.nombre};
            if(typeof window !== 'undefined'){
                localStorage.setItem(this.sessionKey, JSON.stringify(userData));
            }
            return {logrado: true, usuario: userData};
        }
        return {logrado: false, error: 'credenciales invalidas'};
    }

    logout(): void{
        if(typeof window !== 'undefined'){
            localStorage.removeItem(this.sessionKey);
        }
    }

    ObtenerSesion(): Usuario | null{
        if(typeof window === 'undefined'){
            return null;
        }
        const data = localStorage.getItem(this.sessionKey);
        return data ? JSON.parse(data) : null;
    }
}