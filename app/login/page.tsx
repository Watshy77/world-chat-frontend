"use client";

import { login } from "@/libs/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const submit = async () => {
		const { token } = await login(username, password);
		localStorage.setItem("token", token);
		router.replace("/home");
	};

	return (
		<div>
			<h1>Connexion</h1>
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
			<button onClick={submit}>Login</button>
		</div>
	);
}
