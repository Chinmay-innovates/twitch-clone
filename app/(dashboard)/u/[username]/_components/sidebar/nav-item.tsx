'use client'

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { LucideIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton";

interface NavItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
    isActive?: boolean;
}
export const NavItem = ({
    icon: Icon,
    label,
    href,
    isActive
}: NavItemProps) => {
    const { collapsed } = useCreatorSidebar((state) => state)
    return (
        <Button
            asChild
            variant="ghost"
            className={cn(
                "w-full h-12",
                collapsed ? "justify-center" : "justify-start",
                isActive && "bg-accent",
            )}
        >
            <Link href={href}>
                <div className="flex items-center gap-x-4"
                >
                    <Icon className={cn(
                        "size-4",
                        collapsed ? "mr-0" : "mr-2"
                    )} />
                    {!collapsed && (
                        <span className="hidden lg:block">
                            {label}
                        </span>
                    )}
                </div>
            </Link>
        </Button>
    )
}

export const NavItemSkeleton = () => {
    return (
        <li className="flex items-center gap-x-4 px-3 py-2">
            <Skeleton
                className="min-h-[48px] min-w-[48px] 
        rounded-md"
            />
            <div
                className="hidden flex-1 lg:block"
            >
                <Skeleton className="h-6" />
            </div>
        </li>
    )
}