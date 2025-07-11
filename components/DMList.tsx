"use client";

import { getAuthHeaders } from "@/libs/api";
import { useEffect, useState } from "react";

type User = { id: number; username: string };

type Props = {
	onSelectDM: (dmName: string, roomId: number | null) => void;
};

export default function DMList({ onSelectDM }: Props) {
	const [users, setUsers] = useState<User[]>([]);

	// 🔑 Récupérer la liste des utilisateurs existants
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await fetch(
					"https://world-chat-backend.onrender.com/api/users",
					{
						headers: getAuthHeaders(),
					}
				);
				const data = await res.json();
				console.log("✅ Utilisateurs récupérés :", data);
				setUsers(data);
			} catch (err) {
				console.error(err);
			}
		};

		fetchUsers();
	}, []);

	const createOrJoinDM = async (targetUserId: number, username: string) => {
		try {
			const res = await fetch(
				`https://world-chat-backend.onrender.com/api/dm/${targetUserId}`,
				{
					method: "POST",
					headers: getAuthHeaders(),
				}
			);
			const data = await res.json();
			console.log("✅ DM créé / récupéré :", data);
			onSelectDM(`DM avec ${username}`, data.id);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="w-full">
			<h2 className="text-lg font-bold mb-2">Discussions Privées</h2>
			<ul>
				{users.map((user) => (
					<li
						key={user.id}
						onClick={() => createOrJoinDM(user.id, user.username)}
						className="cursor-pointer hover:underline"
					>
						{user.username}
					</li>
				))}
			</ul>
		</div>
	);
}
