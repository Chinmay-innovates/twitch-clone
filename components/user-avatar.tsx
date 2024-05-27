import { cn } from "@/lib/utils";

import { cva, type VariantProps } from "class-variance-authority"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LiveBadge } from "@/components/live-badge";
import { Skeleton } from "@/components/ui/skeleton";

const avatarSizes = cva(
    "",
    {
        variants: {
            size: {
                default: "size-8",
                lg: "size-14"
            },
        },
        defaultVariants: {
            size: "default"
        }
    },
);

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
    userName: string;
    imageUrl: string;
    isLive?: boolean;
    showBadge?: boolean;
}
export const UserAvatar = ({
    imageUrl,
    userName,
    isLive,
    showBadge,
    size,
}: UserAvatarProps) => {
    const canShowBadge = showBadge && isLive;
    return (
        <div className="relative">
            <Avatar
                className={cn(
                    isLive && "ring-2 ring-rose-500 border border-background",
                    avatarSizes({ size })
                )}
            >
                <AvatarImage
                    src={imageUrl}
                    className="object-cover"
                />
                <AvatarFallback>
                    {userName[0]}
                    {userName[userName.length - 1]}
                </AvatarFallback>
                {canShowBadge && (
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                        <LiveBadge />
                    </div>
                )}
            </Avatar>
        </div>
    )
}

interface UserAvatarSkeletonProps
    extends VariantProps<typeof avatarSizes> { };

export const UserAvatarSkeleton = ({
    size,
}: UserAvatarSkeletonProps) => {

    return (
        <Skeleton
            className={cn(
                "rounded-full",
                avatarSizes({ size })
            )} />
    )
}