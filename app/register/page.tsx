"use client";

import { register } from "@/libs/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const submit = async () => {
		try {
			await register(username, password);
			router.push("/login");
		} catch (error) {
			console.error("Erreur lors de l’inscription", error);
		}
	};

	return (
		<div className="p-4">
			<h1 className="text-xl font-bold mb-4">Inscription</h1>
			<input
				placeholder="Nom d’utilisateur"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				className="block border p-2 mb-2 w-full"
			/>
			<input
				placeholder="Mot de passe"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="block border p-2 mb-4 w-full"
			/>
			<button
				onClick={submit}
				className="bg-blue-500 text-white px-4 py-2 rounded"
			>
				Créer un compte
			</button>
		</div>
	);
}
