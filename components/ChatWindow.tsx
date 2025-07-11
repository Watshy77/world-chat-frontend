"use client";

import { getAuthHeaders } from "@/libs/api";
import { socket } from "@/libs/socket";
import { useEffect, useState } from "react";

type Message = {
	id?: number;
	sender: { username: string } | string;
	content: string;
	createdAt?: string;
};

type Props = {
	activeRoom: string;
	roomId: number | null;
};

export default function ChatWindow({ activeRoom, roomId }: Props) {
	const [messages, setMessages] = useState<Message[]>([]);

	// Connexion socket (une seule fois)
	useEffect(() => {
		const token = localStorage.getItem("token");
		socket.auth = { token };
		socket.connect();

		return () => {
			socket.disconnect();
		};
	}, []); // <= socket.connect() une seule fois au montage

	// Gestion des messages socket pour chaque room
	useEffect(() => {
		socket.emit("chat:join", activeRoom);

		const messageHandler = ({
			sender,
			message,
		}: {
			sender: string;
			message: string;
		}) => {
			setMessages((prev) => [...prev, { sender, content: message }]);
		};

		socket.on("chat:message", messageHandler);

		return () => {
			socket.off("chat:message", messageHandler);
		};
	}, [activeRoom]); // à chaque changement de room, on réattache le listener proprement

	// Chargement historique
	useEffect(() => {
		if (activeRoom === "Monde") {
			setMessages([]);
			return;
		}

		const fetchMessages = async () => {
			try {
				const res = await fetch(
					`https://world-chat-backend.onrender.com/api/rooms/${roomId}/messages`,
					{
						headers: getAuthHeaders(),
					}
				);
				const data = await res.json();
				setMessages(data);
			} catch (err) {
				console.error(err);
				setMessages([]);
			}
		};

		fetchMessages();
	}, [activeRoom, roomId]);

	const sendMessage = (message: string) => {
		setMessages((prev) => [...prev, { sender: "Moi", content: message }]);
		socket.emit("chat:message", { room: roomId, message });
	};

	return (
		<div className="flex-1 p-4">
			<h2 className="text-xl font-bold mb-4">Salon {activeRoom}</h2>
			<div className="h-[80vh] bg-white border p-4 overflow-y-scroll">
				{messages.map((msg, i) => (
					<div key={i}>
						<strong>
							{typeof msg.sender === "string"
								? msg.sender
								: msg.sender.username}{" "}
							:
						</strong>{" "}
						{msg.content}
					</div>
				))}
			</div>
			<input
				className="mt-4 w-full border p-2"
				placeholder="Envoyer un message..."
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						sendMessage(e.currentTarget.value);
						e.currentTarget.value = "";
					}
				}}
			/>
		</div>
	);
}
