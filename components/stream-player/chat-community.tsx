import { useMemo, useState } from "react";

import { useParticipants } from "@livekit/components-react";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

import { useDebounceValue } from "usehooks-ts";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CommunityItem } from "./community-item";
import { useDebounce } from "@/hooks/use-debounce";

interface ChatCommunityProps {
    viewerName: string;
    hostName: string;
    isHidden: boolean;
}

export const ChatCommunity = ({
    hostName, isHidden, viewerName
}: ChatCommunityProps) => {
    const [value, setValue] = useState("");
    const participants = useParticipants();



    const debouncedValue = useDebounce(value, 500);

    // functin to filte participants in community
    const filterParticipants = useMemo(() => {
        const deduped = participants.reduce((acc, participant) => {
            const hostAsViewer = `host-${participant.identity}`;
            if (!acc.some((p) => p.identity === hostAsViewer)) {
                acc.push(participant);
            }
            return acc;
        }, [] as (RemoteParticipant | LocalParticipant)[]);

        return deduped.filter(participant => {
            return participant.name?.toLowerCase().includes(debouncedValue.toLowerCase())
        })
    }, [participants, debouncedValue]);




    const onChange = (newValue: string) => {
        setValue(newValue);
    };

    if (isHidden) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Community is disabled
                </p>
            </div>
        );
    };

    return (
        <div className="p-4">
            <Input
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search community"
                className="border-white/10"
            />
            <ScrollArea
                className="gap-y-2 mt-4"
            >
                <p className="text-center text-sm text-muted-foreground  last:block p-2">No results</p>
                {filterParticipants.map((p) => (
                    <CommunityItem
                        key={p.identity}
                        hostName={hostName}
                        viewerName={viewerName}
                        participantName={p.name}
                        participantIdentity={p.identity}
                    />
                ))}
            </ScrollArea>
        </div>
    );
};