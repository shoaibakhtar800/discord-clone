import { auth } from '@clerk/nextjs/server'
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();

/**
 * Handles authentication by verifying the user through Clerk.
 * Throws an error if the user is not authenticated.
 */

const handleAuth = async () => {
    const user = await auth();
    if (!user.userId) throw new Error("Unauthorized");

    return { userId: user.userId };
}


/**
 * Defines the file router with upload configurations.
 */
export const ourFileRouter = {
    serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),
    messageFile: f(["image", "pdf"])
        .middleware(() => handleAuth())
        .onUploadComplete(() => {})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;