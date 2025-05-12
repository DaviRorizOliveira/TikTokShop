'use client';

import { usePathname } from "next/navigation";
import Header from "../header/header";

export default function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();

    return (
        <>
            {pathname !== "/login" && <Header />}
            {children}
        </>
    );
}