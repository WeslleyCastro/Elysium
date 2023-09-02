export const CarouselSkeleton = ({ quantity }: {quantity: number}) => {
  const books = new Array(quantity).fill(0)
 
  return(
    <>
     {books.map(book => (
      <div key={book}  className="flex flex-col justify-center min-h-[350px] max-w-[200px] animate-pulse">
       <div className="rounded-md min-h-[320px] min-w-[210px] skeleton-color mb-2"/>
       <div className="skeleton-color w-2/4 h-2 rounded-md mb-2"/>
       <div className="skeleton-color w-1/4 h-2 rounded-md"/>
     </div>))}
    </>
  )
}
