'use client'

import { useTransition } from "react";
import { updateStream } from "@/actions/stream";
import { Switch } from "@/components/ui/switch";

import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

type FeildTypes =
    "isChatEnabled"
    | "isChatDelayed" |
    "isChatFollowersOnly"

interface ToggleCardProps {
    label: string;
    value: boolean;
    field: FeildTypes
}


export const ToggleCard = ({
    label,
    value = false,
    field,
}: ToggleCardProps) => {
    const [isPending, startTransition] = useTransition();

    const onChange = () => {
        startTransition(() => {
            updateStream({ [field]: !value })
                .then(() => toast.success(`Chat settings updated`))
                .catch(() => toast.error("Something went wrong"))
        })

    }
    return (
        <div className="rounded-xl bg-muted p-6">
            <div className="flex items-center justify-between space-x-4">
                <p className="shrink-0 font-semibold">{label}</p>
                <div className="space-y-2">
                    <Switch
                        onCheckedChange={onChange}
                        disabled={isPending}
                        checked={value}
                    >
                        {value ? "On" : "Off"}
                    </Switch>
                </div>
            </div>
        </div>
    )
}
export const ToggleCardSkeleton = () => {
    return (
        <Skeleton className="w-full rounded-xl p-10" />
    );
};