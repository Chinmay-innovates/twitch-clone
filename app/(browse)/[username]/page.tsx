import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUserName } from "@/lib/user-service";
import { notFound } from "next/navigation";
import Actions from "./_components/actions";
import { blockUser, isBlockedByUser } from "@/lib/block-service";


interface UserPageProps {
    params: {
        username: string;
    },
}

const UserPage = async ({
    params
}: UserPageProps) => {
    const user = await getUserByUserName(params.username);

    if (!user) notFound();

    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByUser(user.id);


    return (
        <div className="flex flex-col gap-y-4">
            <p>Username: {user.userName}</p>
            <p>User ID: {user.id}</p>
            <p>isFollowing: {`${isFollowing}`}</p>
            <p>
                is blocked by this is user : {`${isBlocked}`}
            </p>
            <Actions isFollowing={isFollowing} userId={user.id} />
        </div>
    )
}

export default UserPage