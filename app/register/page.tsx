"use client";

import { register } from "@/libs/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const submit = async () => {
		setError("");
		if (!username || !password)
			return setError("Remplissez tous les champs.");

		try {
			await register(username, password);
			router.push("/login");
		} catch (err) {
			setError("Échec de l'inscription");
		}
	};

	return (
		<div>
			<h1>Inscription</h1>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<input
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<input
				placeholder="Password"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={submit}>Register</button>
		</div>
	);
}
