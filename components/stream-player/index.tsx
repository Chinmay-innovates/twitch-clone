'use client'

import { cn } from "@/lib/utils";
import { Stream } from "@prisma/client"
import { LiveKitRoom } from "@livekit/components-react"
import { useViewerToken } from "@/hooks/use-viewer-token";
import { InfoCard } from "./info-card";
import { ChatToggle } from "./chat-toggle";
import { Chat, ChatSkeleton } from "./chat";
import { Video, VideoSkeleton } from "./video";
import { Header, HeaderSkeleton } from "./header";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { AboutCard } from "./about-card";

type CustomStream = {
    id: string;
    isLive: boolean;
    isChatDelayed: boolean;
    isChatEnabled: boolean;
    isChatFollowersOnly: boolean;
    thumbnailUrl: string | null;
    name: string;
}

type CustomUser = {
    id: string;
    bio: string | null;
    stream: CustomStream | null;
    userName: string;
    imageUrl: string;
    _count: {
        followedBy: number;
    }
}


interface StreamPlayerProps {
    user: CustomUser;
    stream: CustomStream;
    isFollowing: boolean;
}

export const StreamPlayer = ({
    user,
    stream,
    isFollowing,
}: StreamPlayerProps) => {
    const { identity, name, token } = useViewerToken(user?.id);
    const { collapsed } = useChatSidebar((state) => state)

    if (!identity || !name || !token) {
        return <StreamPlayerSkeleton />
    }
    return (
        <>
            {collapsed && (
                <div className="hidden fixed lg:block top-[100px] right-2 z-50">
                    <ChatToggle />
                </div>
            )}
            <LiveKitRoom
                token={token}
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
                className={cn(
                    "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4",
                    collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
                )}
            >
                <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
                    <Video
                        hostname={user.userName}
                        hostIdentity={user.id}
                    />
                    <Header
                        hostName={user.userName}
                        hostIdentity={user.id}
                        viewerIdentitiy={identity}
                        imageUrl={user.imageUrl}
                        isFollowing={isFollowing}
                        name={stream.name}
                    />
                    <InfoCard
                        hostIdentity={user.id}
                        viewerIdentitiy={identity}
                        name={stream.name}
                        thumbnailUrl={stream.thumbnailUrl}
                    />
                    <AboutCard
                        hostName={user.userName}
                        hostIdentity={user.id}
                        viewerIdentitiy={identity}
                        bio={user.bio}
                        followedByCount={user._count.followedBy}
                    />
                </div>
                <div className={cn(
                    "col-span-1",
                    collapsed && "hidden"
                )}>
                    <Chat
                        viewerName={name}
                        hostName={user.userName}
                        hostIdentity={user.id}
                        isFollowing={isFollowing}
                        isChatEnabled={stream.isChatEnabled}
                        isChatDelayed={stream.isChatDelayed}
                        isChatFollowersOnly={stream.isChatFollowersOnly}
                    />
                </div>
            </LiveKitRoom>
        </>
    )
}

export const StreamPlayerSkeleton = () => {
    return (
        <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
            <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
                <VideoSkeleton />
                <HeaderSkeleton />
            </div>
            <div className="col-span-1 bg-background">
                <ChatSkeleton />
            </div>
        </div>
    )
}