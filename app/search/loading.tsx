import { CarouselSkeleton } from "@/components/CarouselSkeleton";

export default function SearchLoading() {
  return (
    <section className="h-full p-4 overflow-hidden">
      <div className="mt-20 flex max-md:flex-col max-md:items-center gap-1 ">
        <CarouselSkeleton quantity={5}/>
      </div>
    </section>
  )
}