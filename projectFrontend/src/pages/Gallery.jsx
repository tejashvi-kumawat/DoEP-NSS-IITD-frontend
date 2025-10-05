// src/pages/Gallery.jsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import projectData from '../assets/data/projects.json';
import galleryData from '../assets/data/gallery.json';

const getProjectKeyFromSubdomain = () => {
  const host = window.location.hostname;
  if (host.includes('localhost')) {
    return host.split('.')[0];
  }
  if (host.includes('nssiitd.in')) {
    return host.split('.')[0];
  }
  return 'munirka';
};

// Lazy Loading Image Component
const LazyImage = ({ src, alt, index, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  const heights = [280, 320, 380, 340, 300, 360, 400, 350];
  const height = heights[index % heights.length];

  return (
    <div
      ref={imgRef}
      className="gallery-item group relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
      style={{ height: `${height}px` }}
      onClick={onClick}
    >
      {/* Skeleton loader */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
      
      {/* Actual image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      )}

      {/* Parallax overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content on hover */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <h3 className="text-white font-bold text-base mb-2">{alt}</h3>
        <div className="flex items-center gap-2 text-xs text-white/80">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span>View Full Size</span>
        </div>
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none shine-effect" />
    </div>
  );
};

// Lightbox Component
const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNext, onPrev]);

  if (currentIndex === null) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl animate-fadeIn">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Previous button */}
      <button
        onClick={onPrev}
        className="absolute left-6 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next button */}
      <button
        onClick={onNext}
        className="absolute right-6 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image */}
      <div className="max-w-7xl max-h-[90vh] px-20">
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].title}
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-scaleIn"
        />
        <div className="text-center mt-6">
          <h3 className="text-white text-xl font-bold mb-2">{images[currentIndex].title}</h3>
          <p className="text-white/70 text-sm">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>
  );
};

const Gallery = () => {
  const [project, setProject] = useState(null);
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const key = getProjectKeyFromSubdomain();
    const projectInfo = projectData[key];
    setProject(projectInfo);
    setImages(galleryData);
    setFilteredImages(galleryData);

    if (projectInfo?.theme) {
      document.documentElement.style.setProperty('--theme-primary', projectInfo.theme.primary);
      document.documentElement.style.setProperty('--theme-secondary', projectInfo.theme.secondary);
    }

    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['all', ...new Set(images.map(img => img.category))];

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category === 'all') {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter(img => img.category === category));
    }
  };

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % filteredImages.length);
  }, [filteredImages.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  }, [filteredImages.length]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-t-transparent border-white mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-black transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }

        .shine-effect {
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          background-size: 200% 100%;
          background-position: -200% center;
        }

        .group:hover .shine-effect {
          animation: shine 1.5s ease-in-out;
        }

        .gallery-grid {
          column-count: 1;
          column-gap: 1rem;
        }

        @media (min-width: 640px) {
          .gallery-grid {
            column-count: 2;
          }
        }

        @media (min-width: 1024px) {
          .gallery-grid {
            column-count: 3;
          }
        }

        @media (min-width: 1280px) {
          .gallery-grid {
            column-count: 4;
          }
        }

        .gallery-item {
          break-inside: avoid;
          margin-bottom: 1rem;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }

        ::-webkit-scrollbar-thumb {
          background: ${project.theme.primary};
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${project.theme.secondary};
        }
      `}</style>

      {/* Parallax Hero Header */}
      <div className="relative h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            background: `radial-gradient(circle at 50% 50%, ${project.theme.primary}40, ${project.theme.secondary}20, #000)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
        
        {/* Animated blobs */}
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{
            background: project.theme.primary,
            top: '10%',
            left: '10%',
            transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.15}px)`,
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: project.theme.secondary,
            top: '30%',
            right: '10%',
            transform: `translate(-${scrollY * 0.12}px, ${scrollY * 0.1}px)`,
          }}
        />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1
            className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tight"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              textShadow: `0 0 80px ${project.theme.primary}60`,
            }}
          >
            Gallery
          </h1>
          <p
            className="text-xl text-gray-300 max-w-2xl"
            style={{
              transform: `translateY(${scrollY * 0.4}px)`,
            }}
          >
            Capturing moments, creating memories
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10 py-6">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category
                    ? 'text-white shadow-lg scale-105'
                    : 'text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white'
                }`}
                style={
                  activeCategory === category
                    ? {
                        background: `linear-gradient(135deg, ${project.theme.primary}, ${project.theme.secondary})`,
                      }
                    : {}
                }
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry Gallery Grid */}
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="gallery-grid">
          {filteredImages.map((image, index) => (
            <LazyImage
              key={image.id}
              src={image.url}
              alt={image.title}
              index={index}
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </div>
  );
};

export default Gallery;
