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
             current.scrollBy({ left: scrollAmount,behavoir:"smooth"})
        }
    };

  return (
    <>
    <div className="mb-8 relative">

        {/* left Arrow Button */}
        <button className='left-arrow'
        onClick={()=>scroll("left")}>
        <ChevronLeft size={28}/>
        </button>

        {/* scroll Row */}
        <div ref={rowRef} className=' responsive-carousel
 flex overflow-x-scroll  hide-scrollbar scroll-smooth space-x-3'>
            {items.map((item)=>(
                
                <div key={item.subjectId}
                 className="w-[200px] max-w-[40%]  h-[300px] rounded-lg overflow-hidden shrink-0 cursor-pointer hover:scale-110 transition"
                >
                   {renderItem(item)}
                </div>
            ))}
        <button className='right-arrow'
        onClick={()=>scroll("right")}
        >
            <ChevronRight size={28}/>
        </button>
        </div>
    </div>
    </>
  )
}

export default Carousel