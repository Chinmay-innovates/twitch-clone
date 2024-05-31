
import { getSeach } from "@/lib/search-service";
import { ResultCard, ResultCardSkeleton } from "./result-card";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultsProps {
    term?: string;
}

export const Results = async ({
    term
}: ResultsProps) => {

    if (!term) return term = "";

    const data = await getSeach(term);

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">
                Results for term &quot;{term}&quot;
            </h2>
            {data.length === 0 && (
                <p className="text-muted-foreground text-sm">
                    No results. Try searching for something else
                </p>
            )}
            <div className="flex flex-col gap-y-4">
                {data.map((result: any) => (
                    <ResultCard
                        data={result}
                        key={result.id}
                    />
                ))}
            </div>
        </div>
    );
};

export const ResultsSkeleton = () => {
    return (
        <div>
            <Skeleton className="h-8 w-[280px] mb-4" />
            <div className="flex flex-col items-center gap-y-4">
                {[...Array(4)].map((_, i) => (
                    <ResultCardSkeleton key={i} />
                ))}
            </div>
        </div>
    )
}