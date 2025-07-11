"use client";

import "./globals.css";

import { useAuth } from "@/libs/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user, loading } = useAuth();
	const router = useRouter();
	const pathname = usePathname();

	const isPublic =
		pathname.startsWith("/login") || pathname.startsWith("/register");

	useEffect(() => {
		if (loading) return;

		// if (!user && !isPublic) {
		// 	router.replace("/login");
		// 	return;
		// }

		if (user && pathname === "/") {
			router.replace("/home");
			return;
		}
	}, [user, loading, pathname, router, isPublic]);

	return (
		<html lang="fr">
			<body>{loading ? <p>Chargement...</p> : children}</body>
		</html>
	);
}
