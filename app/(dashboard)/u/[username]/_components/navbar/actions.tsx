import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs"

import { LogOutIcon } from "lucide-react"
import Link from "next/link"

export const Actions = () => {
    return (
        <div className="flex items-center justify-end gap-x-2 ">
            <Button
                size="sm"
                variant="ghost"
                className="text-muted-foreground hover:text-primary"
                asChild
            >
                <Link href="/">
                    <LogOutIcon className="size-5 mr-2" />
                    Exit
                </Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
        </div>
    )
}

