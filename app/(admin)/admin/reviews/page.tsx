import { getReviews } from "@/lib/api/review";
import ReviewsContainer from "./components/ReviewsContainer";
import ReviewsFilter from "./components/ReviewsFilter";
import Pagination from "@/components/ui/Pagination";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function AdminReviewsPage({ searchParams } : PageProps) {
    
    const params = await searchParams
    const reviews = await getReviews({ 
        page: params.page ?? '0', 
        size: params.size ?? '10', 
        commented: true, 
        replied: params.replied ? true : undefined,
        sentiment: params.sentiment ?? [],
        createdAt: params.createdAt ?? undefined,
    })

    return (
        <div>
            <div className="flex justify-between">
                <h2 className="text-3xl">Avaliações</h2>
            </div>
            <ReviewsFilter />
            <ReviewsContainer reviews={reviews?.content ?? []} />
            <div className="flex justify-end my-[1rem]">
                <Pagination page={reviews.pageable.pageNumber ?? 0} totalPages={reviews?.totalPages ?? 1}/>
            </div>
        </div>
    )
}