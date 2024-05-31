import { db } from "@/lib/db";

export const getUserByUserName = async (userName: string) => {
  const user = await db.user.findUnique({
    where: { userName },
    select: {
      id: true,
      bio: true,
      imageUrl: true,
      userName: true,
      externalUserId: true,
      stream: {
        select: {
          id: true,
          isLive: true,
          isChatDelayed: true,
          isChatEnabled: true,
          isChatFollowersOnly: true,
          thumbnailUrl: true,
          name: true,
        },
      },
      _count: {
        select: {
          followedBy: true,
        },
      },
    },
  });
  return user;
};

export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id },
    include: { stream: true },
  });
  return user;
};
