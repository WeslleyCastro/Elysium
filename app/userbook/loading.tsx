export default function Loading() {
  return(
    <section className="p-4 animate-pulse">
      <div className="flex flex-col sm:flex-row my-8 gap-6">
        <div className="flex flex-col gap-2 min-w-[250px]">
          <div className="max-w-[250px] min-h-[360px] skeleton-color"/>
          <div className="h-3 w-32 rounded-sm skeleton-color"/>
          <div className="h-4 w-44 rounded-sm skeleton-color"/>
        </div>
       
        <div className="lg:w-2/6"> 
          <div className="mb-2 h-8 w-full skeleton-color rounded-sm"/>
            <div className="mb-6 h-3 w-36 skeleton-color rounded-sm"/>
            
            <div className="flex flex-col gap-2">
              <div className="w-full h-3 skeleton-color"/>
              <div className="w-full h-3 skeleton-color"/>
              <div className="w-full h-3 skeleton-color"/>
            </div>
        </div>
      </div>
     
      <section className="sm:mt-28">
        <div className="mb-4 h-4 w-32 skeleton-color rounded-sm"/>

        <div className="h-20 w-72 skeleton-color rounded-md"/>
      </section>
      
    </section>
  )
}