import { CarouselSkeleton } from "@/components/CarouselSkeleton";

export default function Loading(){
  return(
    <section className="pt-8 pl-16 animate-pulse">
      
      {/* User */}
      <div className="flex items-center gap-4">
        <div className="w-28 h-28 skeleton-color rounded-full"/>
        <div>
          <div className="w-40 h-4 skeleton-color rounded"/>
          <div className="w-20 h-4 skeleton-color rounded mt-2"/>
        </div>
      </div>

      {/* User Books */}
      <div className="mt-36 overflow-hidden">
        <div className="w-56 h-4 skeleton-color rounded my-8"/>
        <div className="flex gap-16">
          <CarouselSkeleton quantity={5}/>
        </div>
      </div>
    </section>
  )
}