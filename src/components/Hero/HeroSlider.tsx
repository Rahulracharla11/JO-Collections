import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

interface Slide {
  id: number;
  image: string;
  subtitle: string;
  title: string;
  link: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: 'https://jocollections.com/wp-content/uploads/2024/01/sareebg1.jpg',
    subtitle: 'Welcome to',
    title: 'Jo Collections',
    link: '#products'
  },
  {
    id: 2,
    image: 'https://jocollections.com/wp-content/uploads/2024/01/sareebg2.jpg',
    subtitle: 'Welcome to',
    title: 'Jo Collections',
    link: '#products'
  }
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setActiveCategory } = useShop();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] md:h-[600px] lg:h-[720px] overflow-hidden bg-black select-none">
      {/* Slides */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with Zoom animation */}
            <div
              className={`w-full h-full bg-cover bg-center transition-transform duration-[6000ms] ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Slide Content */}
            <div className="absolute inset-0 flex items-end pb-12 sm:pb-20 md:pb-28 lg:pb-36">
              <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 w-full">
                <div className="max-w-xl text-white space-y-2 sm:space-y-4 animate-fade-in">
                  <p className="text-sm sm:text-base md:text-xl font-normal tracking-wide text-gray-200">
                    {slide.subtitle}
                  </p>
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none text-white drop-shadow-md">
                    {slide.title}
                  </h1>
                  <div className="pt-2 sm:pt-4">
                    <a
                      href={slide.link}
                      onClick={() => setActiveCategory('all')}
                      className="inline-flex items-center space-x-2 bg-white text-black hover:bg-[#f372ac] hover:text-white px-6 sm:px-8 py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg group"
                    >
                      <span>Shop now</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 text-white/40 hover:text-white p-2 rounded-full transition-colors hidden sm:block"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-10 h-10 stroke-[1.5]" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 text-white/40 hover:text-white p-2 rounded-full transition-colors hidden sm:block"
        aria-label="Next slide"
      >
        <ChevronRight className="w-10 h-10 stroke-[1.5]" />
      </button>

      {/* Pagination Bullets (Hermes style matching Revolution slider) */}
      <div className="absolute right-6 sm:right-12 bottom-6 sm:bottom-10 z-20 flex space-x-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'bg-white scale-125 ring-2 ring-white/50'
                : 'bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
