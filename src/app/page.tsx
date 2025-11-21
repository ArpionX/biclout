
import Link from 'next/link'

export default function Home() {
	return (
		<main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
			<div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12 text-center">
				<h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Bienvenido a Biclout3</h1>
				<p className="mt-3 text-gray-600">Tu gestor de tareas y categorías.</p>

				<nav className="mt-8">
					<ul className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6">
						<li>
							<Link href="/login" className="inline-block px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">Iniciar sesión</Link>
						</li>
						<li>
							<Link href="/register" className="inline-block px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">Registrarse</Link>
						</li>
						<li>
							<Link href="/dashboard" className="inline-block px-5 py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition">Ir al dashboard</Link>
						</li>
					</ul>
				</nav>
			</div>
		</main>
	)
}

