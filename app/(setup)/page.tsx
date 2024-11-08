import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

const SetupPage = async () => {
    const profile = await initialProfile();

    if (!profile) {
        throw new Error("User is not authenticated");
    }

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if (server) {
        return redirect(`/server/${server.id}`);
    }

    return <div>Create a server</div>
}

export default SetupPage;