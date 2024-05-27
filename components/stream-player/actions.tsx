
import { useTransition } from "react";
import { onFollow, onUnFollow } from "@/actions/follow";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface ActionsProps {
    isFollowing: boolean
    hostIdentity: string
    isHost: boolean
}

export const Actions = ({
    isFollowing,
    hostIdentity,
    isHost,

}: ActionsProps) => {
    const [isPending, startTransition] = useTransition();
    const { userId } = useAuth();
    const router = useRouter();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(hostIdentity)
                .then((data) => toast.success(`You are now following ${data.following.userName}`))
                .catch(() => toast.error("Something went wrong"))
        })
    }
    const handleUnFollow = () => {
        startTransition(() => {
            onUnFollow(hostIdentity)
                .then((data) => toast.success(`You have unfollowed ${data.following.userName}`))
                .catch(() => toast.error("Something went wrong"))
        })
    }

    const toggleFollow = () => {
        if (!userId) return router.push("/sign-in");

        if (isHost) return;

        if (isFollowing) {
            handleUnFollow();
        } else {
            handleFollow();
        }
    }
    return (
        <Button
            disabled={isPending || isHost}
            onClick={toggleFollow}
            variant="primary"
            size="sm"
            className="w-full lg:w-auto"
        >
            <Heart className={cn(
                "size-4 mr-2",
                isFollowing ? "fill-white" : "fill-none"
            )} />
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    );
};

export const ActionsSkeleton = () => {
    return (
        <Skeleton className="h-10 w-full lg:w-24" />
    )
}