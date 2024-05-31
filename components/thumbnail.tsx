import Image from "next/image";

import { UserAvatar } from "@/components/user-avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { LiveBadge } from "@/components/live-badge";

interface ThumbnailProps {
    src: string | null;
    fallback: string;
    isLive: boolean;
    username: string;
}

export const Thumbnail = ({
    src,
    fallback,
    isLive,
    username,
}: ThumbnailProps) => {
    let content;
    if (!src) {
        content = (
            <div className="bg-background flex flex-col items-center justify-center gap-y-4 size-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-xl">
                <UserAvatar
                    showBadge
                    size="lg"
                    imageUrl={fallback}
                    userName={username}
                    isLive={isLive}
                />
            </div>
        )
    } else {
        content = (
            <Image
                src={src}
                fill
                alt="Thumbnail"
                className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-xl"
            />

        )
    }
    return (
        <div className="group aspect-video relative rounded-md cursor-pointer m-2">
            <div className="rounded-md absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center " />
            {content}
            {isLive && src && (
                <div
                    className="absolute top-2 left-2 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 "
                >
                    <LiveBadge />
                </div>
            )}
        </div>
    );
};


export const ThumbnailSkeleton = () => {
    return (
        <div className="group aspect-video relative rounded-xl
         cursor-pointer m-2">
            <Skeleton className="size-full" />
        </div>
    )
}