import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUserName } from "@/lib/user-service";
import { notFound } from "next/navigation";

import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";


interface UserPageProps {
    params: {
        username: string;
    },
}

const UserPage = async ({
    params
}: UserPageProps) => {
    const user = await getUserByUserName(params.username);

    if (!user || !user.stream) notFound();

    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByUser(user.id);
    if (isBlocked) notFound();

    return (
        <StreamPlayer
            isFollowing={isFollowing}
            stream={user.stream}
            user={user}
        />
    )
}

export default UserPage