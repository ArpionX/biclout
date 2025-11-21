'use client'

import { AuthRepository } from "@/repositories/AuthRepository";
import { AuthContextInterface, Usuario } from "@/types/interfaces";
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export function AuthProvider({children}: {children: React.ReactNode}){
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [cargando, setCargando] = useState<boolean>(false);
    const [esCliente, setEsCliente] = useState<boolean>(false);

    const router = useRouter();
    const authRepo = useMemo(() => new AuthRepository(), []);

    const navigateTo = (path:string) =>{
        if(path === '/login' || path === '/registro' || path === '/register') setEsCliente(false);
        else setEsCliente(true);
        try {
            router.push(path);
        } catch (err) {
            console.error('Navigation error:', err);
        }
    }

    useEffect(() =>{
        setEsCliente(true);
        const usuarioActual = authRepo.ObtenerSesion();
        if(usuarioActual){
            setUsuario(usuarioActual);
        }
        setCargando(false);
    }, [authRepo
        
    ])

    const login: AuthContextInterface['login'] = (email, password) => {
    const resultado = authRepo.login(email, password);
        if (resultado.logrado && resultado.usuario) {
        setUsuario(resultado.usuario);
        navigateTo('/dashboard'); 
        }
        return resultado;
    };

    const registro: AuthContextInterface['registro'] = (email, nombre, password) => {
        const resultado = authRepo.RegistrarUsuario({ email, password, nombre });
        if (resultado.logrado) {
        setTimeout(() => navigateTo('/login'), 500);
        }
        return resultado;
    };

    const logout = () => {
        authRepo.logout();
        setUsuario(null);
        navigateTo('/login');
    };

    return(
        <AuthContext.Provider value={{usuario, cargando, login, registro, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextInterface =>{
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
}