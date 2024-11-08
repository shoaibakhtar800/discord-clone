import { RedirectToSignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

interface Profile {
    id: string;
    userId: string;
    name: string;
    imageUrl: string | null;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export const initialProfile = async () => {
    const user = await currentUser();

    if (!user) {
        // return RedirectToSignIn({ redirectUrl: "/sign-in" });
        return RedirectToSignIn({ redirectUrl: "/" });
    }

    const profile = await db.profile.findUnique({
        where: {
            userId: user.id
        }
    });

    if (profile) {
        return profile;
    }

    const newProfile = await db.profile.create({
        data: {
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
        }
    });

    return newProfile;
}