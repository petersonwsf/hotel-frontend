import ReviewsFilter from "./components/ReviewsFilter";

export default function LoadingReviewsPage() {
    return (
        <div>
            <div className="flex justify-between">
                <h2 className="text-3xl">Avaliações</h2>
            </div>
            <ReviewsFilter />
            <div className="my-[1.5rem]">
                <div className="grid grid-cols-2 gap-[2rem] items-start">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="w-full h-[200px] rounded-lg bg-gray-300 animate-pulse"></div>
                    ))}
                </div>
            </div>
        </div>
    )
}