import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const getSelf = async () => {
  const self = await currentUser();
  if (!self ) throw new Error("unauthorized");

  const user = await db.user.findUnique({
    where: {
      externalUserId: self.id,
    },
  });

  if (!user) {
    throw new Error("User Not found");
  }
  return user;
};
export const getSelfByUsername = async (userName: string) => {
  const self = await currentUser();

  if (!self || !self.username) throw new Error("unauthorized");

  const user = await db.user.findUnique({
    where: {
      userName,
    },
  });

  if (!user) {
    throw new Error("User Not found");
  }
  if (self.username !== user.userName) {
    throw new Error("unauthorized");
  }
  return user;
};
