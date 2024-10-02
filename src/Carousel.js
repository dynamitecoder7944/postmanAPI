import React, { useRef } from 'react';
import './Carousel.css'; // Ensure you have the appropriate styles

// Import images from the 'src/image' folder
import im1 from './image/im1.webp';

import im3 from './image/im3.jpg';
import im4 from './image/im4.jpg';

const Carousel = () => {
  const sliderRef = useRef(null);
  const sliderListRef = useRef(null);
  const thumbnailRef = useRef(null);

  const handleNext = () => {
    moveSlider('next');
  };

  const handlePrev = () => {
    moveSlider('prev');
  };

  const moveSlider = (direction) => {
    const sliderItems = sliderListRef.current.querySelectorAll('.item');
    const thumbnailItems = thumbnailRef.current.querySelectorAll('.item');

    if (direction === 'next') {
      sliderListRef.current.appendChild(sliderItems[0]);
      thumbnailRef.current.appendChild(thumbnailItems[0]);
      sliderRef.current.classList.add('next');
    } else {
      sliderListRef.current.prepend(sliderItems[sliderItems.length - 1]);
      thumbnailRef.current.prepend(thumbnailItems[thumbnailItems.length - 1]);
      sliderRef.current.classList.add('prev');
    }

    const handleAnimationEnd = () => {
      sliderRef.current.classList.remove(direction === 'next' ? 'next' : 'prev');
      sliderRef.current.removeEventListener('animationend', handleAnimationEnd);
    };
    sliderRef.current.addEventListener('animationend', handleAnimationEnd, { once: true });
  };

  return (
    <div className="slider" ref={sliderRef}>
      <div className="list" ref={sliderListRef}>
        {[
          { src: im1,  },
          
          { src: im3,  },
          { src: im4, },
        ].map((item, index) => (
          <div className="item" key={index}>
            <img src={item.src} alt={`Slide ${index + 1}`} />
            <div className="content">
              <div className="title">{item.title}</div>
              <div className="type">{item.type}</div>
              
            </div>
          </div>
        ))}
      </div>

      <div className="thumbnail" ref={thumbnailRef}>
        {[im1,im3, im4].map((src, index) => (
          <div className="item" key={index}>
            <img src={src} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>

      <div className="nextPrevArrows">
        <button className="prev" onClick={handlePrev}> &lt; </button>
        <button className="next" onClick={handleNext}> &gt; </button>
      </div>
    </div>
  );
};

export default Carousel;
