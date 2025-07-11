"use client";

import { getAuthHeaders } from "@/libs/api";
import { socket } from "@/libs/socket";
import { useEffect, useState } from "react";

type Message = {
	sender: { username: string } | string;
	content: string;
};

type Props = {
	activeDM: string;
	roomId: number | null;
};

export default function DMChatWindow({ activeDM, roomId }: Props) {
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		socket.auth = { token };
		socket.connect();

		return () => {
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		if (!roomId) return;

		console.log("➡️ Join roomId", roomId);
		socket.emit("chat:join", roomId);

		const handler = ({
			sender,
			message,
		}: {
			sender: string;
			message: string;
		}) => {
			setMessages((prev) => [...prev, { sender, content: message }]);
		};

		socket.on("chat:message", handler);

		return () => {
			socket.off("chat:message", handler);
		};
	}, [roomId]);

	useEffect(() => {
		if (!roomId) return;

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
	}, [roomId]);

	const sendMessage = (message: string) => {
		console.log("➡️ Envoi message dans roomId", roomId);
		setMessages((prev) => [...prev, { sender: "Moi", content: message }]);
		socket.emit("chat:message", { room: roomId, message });
	};

	return (
		<div className="flex flex-col h-full bg-white border p-2">
			<h3 className="text-lg font-bold mb-2">{activeDM}</h3>
			<div className="flex-1 overflow-y-scroll mb-2">
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
				className="w-full border p-1"
				placeholder="Votre message..."
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
