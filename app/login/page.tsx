"use client";

import { login } from "@/libs/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const submit = async () => {
		try {
			const data = await login(username, password);
			localStorage.setItem("token", data.token);
			router.push("/home");
		} catch (error) {
			console.error("Erreur lors de la connexion", error);
		}
	};

	return (
		<div className="p-4">
			<h1 className="text-xl font-bold mb-4">Connexion</h1>
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
				className="bg-green-500 text-white px-4 py-2 rounded"
			>
				Se connecter
			</button>
		</div>
	);
}
