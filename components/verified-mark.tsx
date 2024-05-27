import { Check } from "lucide-react"


export const VerfiedMark = ()=>{
    return(
        <div className="p-0.5 flex items-center justify-center size-4 
        rounded-full bg-blue-600
        ">
            <Check className="size-[10px] text-primary stroke-[4px]"/>
        </div>
    )
}