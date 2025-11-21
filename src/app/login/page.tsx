'use client'; 

import { LoginForm } from '@/components/Auth/LoginForm';

const LoginPage = () => {
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                            <LoginForm />

            </div>
        </div>
    );
};

export default LoginPage;