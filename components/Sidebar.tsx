"use client";

import { getAuthHeaders } from "@/libs/api";
import { useEffect, useState } from "react";

type Room = {
	id: number;
	name: string;
};

type Props = {
	onSelectRoom: (roomName: string, roomId: number | null) => void;
};

export default function Sidebar({ onSelectRoom }: Props) {
	const [rooms, setRooms] = useState<Room[]>([]);

	useEffect(() => {
		fetchRooms();
	}, []);

	const fetchRooms = async () => {
		try {
			const res = await fetch(
				"https://world-chat-backend.onrender.com/api/rooms",
				{
					headers: getAuthHeaders(),
				}
			);
			const data = await res.json();
			console.log("Rooms API response:", data);

			if (!Array.isArray(data)) {
				console.error("Unexpected response:", data);
				setRooms([]);
				return;
			}

			setRooms(data);
		} catch (err) {
			console.error(err);
			setRooms([]);
		}
	};

	return (
		<div className="w-64 bg-gray-200 p-4">
			<h2 className="text-xl font-bold mb-4">Salons</h2>
			<ul>
				<li
					onClick={() => onSelectRoom("Monde", null)}
					className="cursor-pointer"
				>
					# Monde
				</li>
				{rooms.map((room) => (
					<li
						key={room.id}
						onClick={() => onSelectRoom(room.name, room.id)}
						className="cursor-pointer"
					>
						# {room.name}
					</li>
				))}
			</ul>
		</div>
	);
}
