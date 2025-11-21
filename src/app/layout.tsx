import { AuthProvider } from "@/context/AuthContext";
import { TaskProvider } from "@/context/TaskContext";
import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Task Manager",
  description: "Aplicacion modular de gestion de tareas con Next.js y Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <AuthProvider>
            <TaskProvider>
                {children}
            </TaskProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
