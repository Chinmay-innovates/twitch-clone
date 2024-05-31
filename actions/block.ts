"use server";

import { getSelf } from "@/lib/auth-service";
import { blockUser, unBlockUser } from "@/lib/block-service";
import { RoomServiceClient } from "livekit-server-sdk";

import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export const onBlock = async (id: string) => {
  const self = await getSelf();
  let blockedUser;
  try {
    blockedUser = await blockUser(id);
  } catch {
    // USER is a guest
  }
  try {
    await roomService.removeParticipant(self.id, id);
  } catch {
    // USER is a not in the room
  }

  revalidatePath(`/u/${self.userName}/community`);

  return blockedUser;
};

export const onUnblock = async (id: string) => {
  const self = await getSelf();

  const unblockedUser = await unBlockUser(id);

  revalidatePath(`/u/${self.userName}/community`);

  return onUnblock;
};
