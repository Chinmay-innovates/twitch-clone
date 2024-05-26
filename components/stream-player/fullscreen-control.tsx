import { Maximize2, Minimize2 } from "lucide-react";
import { Hint } from "../hint";

interface FullscreenControlProps {
    isFullscreen: boolean;
    onToggle: () => void
}

export const FullscreenControl = ({
    isFullscreen,
    onToggle,
}: FullscreenControlProps) => {
    const Icon = isFullscreen ? Minimize2 : Maximize2;
    const label = isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen";
    return (
        <div className="flex items-center justify-center gap-4">
            <Hint label={label} asChild>
                <button onClick={onToggle}
                    className="text-white p-1.5 hover:bg-white/10 rounded-lg"
                >
                    <Icon className="size-5" />
                </button>
            </Hint>
        </div>
    )
}