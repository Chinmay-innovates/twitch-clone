"use client"
import { toast } from 'sonner'
import { onFollow, onUnFollow } from '@/actions/follow'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react'

import { onBlock, onUnblock } from '@/actions/block'

interface ActionsProps {
    isFollowing: boolean;
    userId: string;
}
const Actions = ({
    isFollowing,
    userId,
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`You are now following ${data.following.userName}`))
                .catch(() => toast.error("Something went wrong"))
        });
    };
    const handleUnFollow = () => {
        startTransition(() => {
            onUnFollow(userId)
                .then((data) => toast.success(`You have unfollowed ${data.following.userName}`))
                .catch(() => toast.error("Something went wrong"))
        });
    };
    const onClick = () => {
        isFollowing ? handleUnFollow() : handleFollow()
    }

    const handleBlock = () => {
        startTransition(() => {
            onBlock(userId)
                .then((data) => toast.success(`Blocked the user ${data?.blocked.userName}`)
                )
                .catch(() => toast.error("Something went wrong"))
        });
    };

    return (
        <>
            <Button
                disabled={isPending}
                onClick={onClick}
                variant="primary"
            >
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>
            <Button
                className='text-black'
                disabled={isPending}
                onClick={handleBlock}
            >
              Unblock 
            </Button>
        </>
    )
}

export default Actions