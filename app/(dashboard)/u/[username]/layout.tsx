import { getSelfByUsername } from "@/lib/auth-service"
import { redirect } from "next/navigation";

import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";

interface CreatorLayoutProps {
    params: { username: string },
    children: React.ReactNode,
}
const CreatorLayout = async ({
    params,
    children,
}: CreatorLayoutProps) => {
    const self = getSelfByUsername(params.username);
    if (!self) redirect("/")
    return (
        <>
            <Navbar />
            <div className="h-full flex pt-20 ">
                <Sidebar />
                <Container>
                    {children}
                </Container>
            </div>
        </>
    )
}

export default CreatorLayout