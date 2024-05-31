import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { useAuth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  thumbnailUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const self = getSelf();
      return { user: self };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      db.stream.update({
        where: {
          userId: (await metadata.user).id,
        },
        data: {
          thumbnailUrl: file.url,
        },
      });
      console.log("file url: " + file.url);
      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
