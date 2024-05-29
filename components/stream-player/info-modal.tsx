'use client'

interface InfoModalProps {
    initialName: string;
    initialThumbnailUrl: string | null;
}

import {
    useRef,
    useState,
    ElementRef,
    useTransition
} from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useRouter } from "next/navigation";
import Image from "next/image";

import { toast } from "sonner";
import { UploadDropzone } from "@/lib/uploadthing";
import { updateStream } from "@/actions/stream";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Hint } from "@/components/hint";
import { Trash } from "lucide-react";


export const InfoModal = ({
    initialName, initialThumbnailUrl
}: InfoModalProps) => {
    const router = useRouter();
    const closeRef = useRef<ElementRef<"button">>(null);
    const [isPending, startTransition] = useTransition();

    const [name, setName] = useState(initialName);
    const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(() => {
            updateStream({ name: name })
                .then(() => {
                    toast.success("Stream updated");
                    closeRef.current?.click();
                })
                .catch(() => toast.error("Something went wrong"))
        })
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const onRemove = () => {
        startTransition(() => {
            updateStream({ thumbnailUrl: null })
                .then(() => {
                    toast.success("Thumbnail removed");
                    setThumbnailUrl("");
                    closeRef.current?.click();
                })
                .catch(() => toast.error("Something went wrong"))
        })
    }
    const onSave = () => {
        startTransition(() => {
            updateStream({ thumbnailUrl: thumbnailUrl })
                .then(() => {
                    toast.success("Changes saved")
                    closeRef.current?.click();
                })
                .catch(() => toast.error("Something went wrong"))
        })
    }


    return (
        <Dialog >
            <DialogTrigger asChild >
                <Button variant="link" size='sm' className="ml-auto">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit stream Info
                    </DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={onSubmit}
                    className="space-y-14">
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                            placeholder="Stream name"
                            disabled={isPending}
                            onChange={onChange}
                            value={name}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Thumbnail</Label>
                        {thumbnailUrl ? (
                            // If URL EXISTS SHOW THIS
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                                <div className="absolute top-2 right-2 z-[10]">
                                    <Hint asChild side="left" label="Remove thumbnail">
                                        <Button
                                            type="button"
                                            disabled={isPending}
                                            onClick={onRemove}
                                            className="size-auto p-1.5"
                                        ><Trash className="size-4" /></Button>
                                    </Hint>
                                </div>
                                <Image
                                    src={thumbnailUrl}
                                    fill
                                    alt="thumbnail"
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            // If URL DOESNOT EXIST SHOW THIS
                            <div className="rounded-xl border outline-dashed outline-muted">
                                <UploadDropzone
                                    endpoint="thumbnailUploader"
                                    appearance={{
                                        label: {
                                            color: '#FFFFFF'
                                        },
                                        allowedContent: {
                                            color: '#FFFFFF'
                                        },
                                    }}
                                    onClientUploadComplete={(res) => {
                                        setThumbnailUrl(res?.[0]?.url);
                                        router.refresh();
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between">
                        <DialogClose asChild ref={closeRef}>
                            <Button type="button" variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            onClick={onSave}
                            disabled={isPending}
                            type="submit" variant="primary">
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};