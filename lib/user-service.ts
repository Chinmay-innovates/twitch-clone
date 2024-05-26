import { db } from "@/lib/db";

export const getUserByUserName = async (userName: string) => {
  const user = await db.user.findUnique({
    where: { userName },
    include: { stream: true },
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
