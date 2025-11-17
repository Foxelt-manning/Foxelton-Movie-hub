import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useRef } from 'react'
import Movie from './MovieCard';

const Carousel = ({items}) => {
    const rowRef = useRef();

    const scroll =(direction)=>{
        const {current} = rowRef;
        if(!current) return;

        const  scrollAmount = current.clientWidth - 100;
        
        if(direction === "left"){
            current.scrollBy({left: -scrollAmount,behavoir:"smooth"})
        }else{
             current.scrollBy({left: scrollAmount,behavoir:"smooth"})
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
        <div ref={rowRef} className='flex overflow-x-scroll scrollbar-hide scroll-smooth space-x-3'>
            {items.map((item)=>(
                <div key={item.subjectId}
                 className="min-w-[180px] h-[260px] bg-gray-800 rounded-lg overflow-hidden shrink-0 cursor-pointer hover:scale-105 transition"
                >
                    <Movie movie={item}/>
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