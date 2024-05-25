import { db } from "@/lib/db";

export const getUserByUserName = async (userName: string) => {
  const user = await db.user.findUnique({
    where: { userName },
  });
  return user;
};
