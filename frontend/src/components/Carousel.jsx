import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useRef } from 'react'
import Movie from './MovieCard';

const Carousel = ({items,renderItem}) => {
    const rowRef = useRef();

    const scroll =(direction)=>{
        const {current} = rowRef;
        if(!current) return;

        const  scrollAmount = current.clientWidth - 100;
        
        if(direction === "left"){
          current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
        }else{
             current.scrollBy({ left: scrollAmount, behavior:"smooth"})
        }
    };

  return (
    <>
    <div className="mb-8 relative">

      {/* Mobile and tablet list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
        {items.map((item) => (
          <div
            key={item.id || item.subjectId}
            className="w-full"
          >
            {renderItem(item)}
          </div>
        ))}
      </div>

        {/* left Arrow Button */}
      <button className='left-arrow hidden lg:flex'
        onClick={()=>scroll("left")}>
        <ChevronLeft size={28}/>
        </button>

        {/* scroll Row */}
      <div ref={rowRef} className='hidden lg:flex responsive-carousel flex overflow-x-scroll hide-scrollbar scroll-smooth space-x-3'>
            {items.map((item)=>(
                
                <div key={item.id || item.subjectId}
           className="w-[200px] max-w-[40%] h-[300px] rounded-lg overflow-hidden shrink-0 cursor-pointer hover:scale-110 transition"
                >
                   {renderItem(item)}
                </div>
            ))}
        </div>

        {/* Right Arrow Button */}
      <button className='right-arrow hidden lg:flex'
        onClick={()=>scroll("right")}
        >
            <ChevronRight size={28}/>
        </button>
    </div>
    </>
  )
}

export default Carousel