"use client";

import { useEffect, useState } from "react";
import { InviteModal } from "@/components/modals/invite-modal";
import { MembersModal } from "@/components/modals/members-modal";
import { EditServerModal } from "@/components/modals/edit-server-modal";
import { EditChannelModel } from "@/components/modals/edit-channel-modal";
import { LeaveServerModal } from "@/components/modals/leave-server-modal";
import { DeleteServerModal } from "@/components/modals/delete-server-modal";
import { CreateServerModal } from "@/components/modals/create-server-modal";
import { DeleteChannelModal } from "@/components/modals/delete-channel-modal";
import { CreateChannelModel } from "@/components/modals/create-channel-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <CreateServerModal />
            <InviteModal />
            <EditServerModal />
            <MembersModal />
            <CreateChannelModel />
            <LeaveServerModal />
            <DeleteServerModal />
            <DeleteChannelModal />
            <EditChannelModel />
        </>
    )
}