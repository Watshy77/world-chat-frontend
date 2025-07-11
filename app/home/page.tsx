"use client";

import ChatWindow from "@/components/ChatWindow";
import DMChatWindow from "@/components/DMChatWindow";
import DMList from "@/components/DMList";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function HomePage() {
	const [activeRoom, setActiveRoom] = useState("Monde");
	const [roomId, setRoomId] = useState<number | null>(null);

	const [activeDM, setActiveDM] = useState<string | null>(null);
	const [dmRoomId, setDmRoomId] = useState<number | null>(null);

	const handleSelectRoom = (roomName: string, roomId: number | null) => {
		setActiveRoom(roomName);
		setRoomId(roomId);
	};

	const handleSelectDM = (dmName: string, roomId: number | null) => {
		console.log("➡️ Sélection DM", dmName, "roomId:", roomId);
		setActiveDM(dmName);
		setDmRoomId(roomId);
	};

	return (
		<div className="flex h-screen">
			<Sidebar onSelectRoom={handleSelectRoom} />

			<ChatWindow activeRoom={activeRoom} roomId={roomId} />

			<div className="flex flex-col w-64 border-l bg-gray-100">
				<DMList onSelectDM={handleSelectDM} />

				{activeDM && dmRoomId !== null && (
					<div className="flex-1 border-t mt-2 p-2">
						<DMChatWindow activeDM={activeDM} roomId={dmRoomId} />
					</div>
				)}
			</div>
		</div>
	);
}
