import { useState, useRef, useEffect } from 'react';

const Carousel = ({ resources }) => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <div className='carousel'>
      <div className='relative'>
        <div className='flex justify-between items-center h-full absolute top left w-full'>
          <button
            onClick={movePrev}
            className='-translate-x-10'
            disabled={isDisabled('prev')}
          >
            <div className='group-disabled:hidden w-5 h-5 rounded-full bg-theme flex items-center justify-center'>
              <span className='w-[6px] h-[6px] border-l-2 border-t-2 border-white -rotate-45 translate-x-[1px]' />
            </div>
            <span className='sr-only'>Prev</span>
          </button>
          <button
            onClick={moveNext}
            className='translate-x-10'
            disabled={isDisabled('next')}
          >
            <div className='group-disabled:hidden w-5 h-5 rounded-full bg-theme flex items-center justify-center'>
              <span className='w-[6px] h-[6px] border-r-2 border-b-2 border-white -rotate-45 -translate-x-[1px]' />
            </div>
            <span className='sr-only'>Next</span>
          </button>
        </div>
        <div
          ref={carousel}
          className='carousel-container py-6 relative flex overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0'
        >
          {resources.map((resource, index) => {
            return (
              <div
                key={index}
                className='pr-[50px] last:pr-8 carousel-item relative snap-start'
              >
                {resource}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
