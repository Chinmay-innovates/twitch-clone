"use client"
import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar"

interface Wrapperprops {
    children: React.ReactNode;
}
export const Wrapper = ({ children }: Wrapperprops) => {
    const { collapsed } = useCreatorSidebar((state) => state)
    return (
        <aside className={cn("fixed left-0 flex-col flex w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50",
            collapsed && "lg:w-[70px]"
            
        )}>
            {children}
        </aside>
    )
}

