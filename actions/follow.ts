"use server";

import { followUser, unfollowUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";

export const onFollow = async (id: string) => {
  try {
    const followedUser = await followUser(id);

    revalidatePath("/");

    if (followedUser) {
      revalidatePath(`/${followedUser.following.userName}`);
    }
    return followedUser;
  } catch (error) {
    throw new Error("Internal Error");
  }
};
export const onUnFollow = async (id: string) => {
  try {

    const unfollowedUser = await unfollowUser(id);

    revalidatePath("/");

    if (unfollowedUser) {
      revalidatePath(`/${unfollowedUser.following.userName}`);
    }
    
    return unfollowedUser;
    
  } catch (error) {
    throw new Error("Internal Error");
  }
};
