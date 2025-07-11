export default function HomePage() {
	return (
		<main className="flex h-screen flex-col items-center justify-center bg-gray-100">
			{/* eslint-disable react/no-unescaped-entities */}
			<h1 className="text-black text-4xl font-bold mb-4">
				Bienvenue sur le Chat
			</h1>
			<p className="text-lg text-gray-600 mb-8">
				Connectez-vous pour discuter en temps réel.
			</p>

			<div className="flex space-x-4">
				<a
					href="/login"
					className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
				>
					Se connecter
				</a>
				<a
					href="/register"
					className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
				>
					S'inscrire
				</a>
			</div>
			{/* eslint-enable react/no-unescaped-entities */}
		</main>
	);
}
