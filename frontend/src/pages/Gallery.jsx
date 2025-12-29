import { useState, useEffect } from 'react';
import api from '../apiClient';
import { Loader, ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';

export default function Gallery() {
  const [loading, setLoading] = useState(true);
  const [heroSlides, setHeroSlides] = useState([]);
  const [videoItems, setVideoItems] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL.replace('/api', '');
  const getImageUrl = (url) => url && url.startsWith('/uploads') ? `${API_URL}${url}` : url;

  useEffect(() => {
    api.get('/gallery').then(({ data }) => {
      setHeroSlides(data.filter(i => i.section === 'Hero'));
      setVideoItems(data.filter(i => i.section === 'Video'));
      setGalleryItems(data.filter(i => i.section === 'General'));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Auto-play Carousel with Reset on Change
  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 6000); // 6 Seconds per slide
    return () => clearInterval(interval);
  }, [heroSlides]);

  const nextSlide = () => setCurrentSlide(prev => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? heroSlides.length - 1 : prev - 1));

  if (loading) {
    return (
      <div className="gr-loader" style={{ padding: '50px', textAlign: 'center' }}>
        <Loader className="animate-spin" />
        <style>{`
          .gr-loader svg { width: 36px; height: 36px; color: var(--church-blue, #0b3d91); }
        `}</style>
      </div>
    );
  }

  return (
    <div className="gr-root">
      {/* Inline CSS block (keeps everything in one file). Media queries only target small screens so desktop remains unchanged */}
      <style>{`
        /* Base / Desktop-first styles (match your inline styles) */
        .gr-hero {
          position: relative;
          height: 80vh;
          min-height: 500px;
          overflow: hidden;
          background-color: #000;
        }
        .gr-hero-slide {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background-size: cover;
          background-position: center;
          transition: opacity 1.5s ease-in-out;
        }
        .gr-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9), transparent 60%);
        }
        .gr-hero-content {
          position: relative;
          height: 100%;
          display: flex;
          align-items: flex-end;
          padding-bottom: 100px;
        }
        .gr-hero-text { color: white; padding: 0 20px; }
        .gr-badge {
          background-color: var(--church-gold, #d4a017);
          padding: 5px 15px;
          border-radius: 3px;
          font-size: 0.8rem;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: inline-block;
        }
        .gr-title {
          font-size: 4rem;
          margin-top: 20px;
          margin-bottom: 15px;
          line-height: 1.1;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }
        .gr-sub { font-size: 1.2rem; opacity: 0.9; }

        .gr-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(5px);
          color: white;
          border: none;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: 0.3s;
        }
        .gr-nav-left { left: 20px; }
        .gr-nav-right { right: 20px; }

        /* Video section */
        .gr-video {
          position: relative;
          height: 500px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #000;
        }
        .gr-video video { width: 100%; height: 100%; object-fit: cover; opacity: 0.7; }
        .gr-video-center { position: absolute; text-align: center; color: white; z-index: 10; }
        .gr-video-title { font-size: 3rem; text-transform: uppercase; letter-spacing: 5px; font-weight: 300; }
        .gr-video-sub { font-size: 1.1rem; letter-spacing: 2px; text-transform: uppercase; margin-top: 10px; }

        /* Gallery */
        .gr-section { padding: 80px 20px; }
        .gr-section h2 { color: var(--church-blue, #0b3d91); font-size: 2.5rem; margin-bottom: 10px; }
        .gr-underline { width: 60px; height: 4px; background-color: var(--church-gold, #d4a017); margin: 0 auto; }

        .gr-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        .gr-item {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          height: 300px;
        }
        .gr-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
          display: block;
        }
        .gr-item:hover img { transform: scale(1.1); }
        .gr-item-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          padding: 20px;
          color: white;
        }
        .gr-item-title { margin: 0; font-size: 1.1rem; font-weight: bold; }
        .gr-item-cat { font-size: 0.8rem; color: var(--church-gold, #d4a017); text-transform: uppercase; }

        /* Small-screen overrides only (do not change desktop) */
        @media (max-width: 768px) {
          .gr-hero { height: 56vh; min-height: 320px; }
          .gr-hero-content { padding-bottom: 40px; }
          .gr-title { font-size: 2rem; margin-top: 12px; margin-bottom: 10px; }
          .gr-sub { font-size: 0.95rem; }

          .gr-badge { font-size: 0.7rem; padding: 4px 10px; }

          .gr-nav-btn { width: 44px; height: 44px; }
          .gr-nav-btn svg { width: 20px; height: 20px; }

          .gr-video { height: 300px; }
          .gr-video-title { font-size: 1.4rem; letter-spacing: 2px; }
          .gr-video-sub { font-size: 0.85rem; letter-spacing: 1px; }
          .gr-video-center svg { width: 50px; height: 50px; margin-bottom: 12px; }

          .gr-section { padding: 40px 16px; }
          .gr-section h2 { font-size: 1.6rem; }
          .gr-grid {
            grid-template-columns: 1fr; /* single column on phones */
            gap: 15px;
          }
          .gr-item { height: auto; border-radius: 10px; }
          .gr-item img { height: 250px; max-height: 60vh; }
          .gr-item-overlay { padding: 14px; }
          .gr-item-title { font-size: 1rem; }
          .gr-item-cat { font-size: 0.75rem; }
        }

        /* Small tweak for very small devices */
        @media (max-width: 420px) {
          .gr-title { font-size: 1.6rem; }
          .gr-video-title { font-size: 1.1rem; }
          .gr-video-center svg { width: 44px; height: 44px; }
        }

        /* Optional simple animations (desktop only) */
        @media (prefers-reduced-motion: no-preference) {
          .ken-burns { animation: kenBurns 18s ease-in-out infinite; transform-origin: center; }
          @keyframes kenBurns {
            0% { transform: scale(1) translateZ(0); }
            50% { transform: scale(1.06) translateZ(0); }
            100% { transform: scale(1) translateZ(0); }
          }
          .animate-slide-up { animation: slideUp 0.8s ease forwards; }
          @keyframes slideUp {
            from { transform: translateY(12px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        }
      `}</style>

      {/* 1. ANIMATED HERO CAROUSEL */}
      {heroSlides.length > 0 ? (
        <div className="gr-hero" role="region" aria-label="Hero gallery">
          {heroSlides.map((slide, index) => (
            <div
              key={slide._id}
              className={`gr-hero-slide ${index === currentSlide ? 'ken-burns' : ''}`}
              style={{
                backgroundImage: `url('${getImageUrl(slide.imageUrl)}')`,
                opacity: index === currentSlide ? 1 : 0,
                zIndex: index === currentSlide ? 1 : 0
              }}
            >
              <div className="gr-hero-overlay" />
              <div className="gr-hero-content container">
                <div className={index === currentSlide ? 'gr-hero-text animate-slide-up' : 'gr-hero-text'}>
                  <span className="gr-badge">Featured Gallery</span>
                  <h1 className="gr-title">{slide.title}</h1>
                  <p className="gr-sub">Abundant Rain Church</p>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={prevSlide}
            className="gr-nav-btn gr-nav-left"
            aria-label="Previous slide"
            type="button"
          >
            <ChevronLeft size={30} />
          </button>

          <button
            onClick={nextSlide}
            className="gr-nav-btn gr-nav-right"
            aria-label="Next slide"
            type="button"
          >
            <ChevronRight size={30} />
          </button>
        </div>
      ) : (
        <div style={{ backgroundColor: 'var(--church-blue)', color: 'white', padding: '100px 20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>Our Gallery</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--church-gold)' }}>Visual moments of our journey</p>
        </div>
      )}

      {/* 2. VIDEO IMMERSION SECTION */}
      {videoItems.length > 0 && (
        <div className="gr-video" role="region" aria-label="Video immersion">
          <div className="video-overlay" style={{ position: 'absolute', inset: 0, zIndex: 2 }} />
          <video autoPlay muted loop playsInline>
            <source src={getImageUrl(videoItems[0].imageUrl)} type="video/mp4" />
          </video>

          <div className="gr-video-center">
            <PlayCircle size={80} color="var(--church-gold)" style={{ marginBottom: '30px', filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))' }} />
            <h2 className="gr-video-title">{videoItems[0].title}</h2>
            <p className="gr-video-sub">Experience The Atmosphere</p>
          </div>
        </div>
      )}

      {/* 3. MASONRY STYLE GRID */}
      <div className="gr-section container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2>Latest Photos</h2>
          <div className="gr-underline" />
        </div>

        {galleryItems.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>No photos found in the gallery.</p>
        ) : (
          <div className="gr-grid" role="list">
            {galleryItems.map(photo => (
              <div key={photo._id} className="gr-item" role="listitem" tabIndex={0}>
                <img
                  src={getImageUrl(photo.imageUrl)}
                  alt={photo.title || 'Gallery photo'}
                  onMouseOver={(e) => { if (window.matchMedia('(hover: hover)').matches) e.currentTarget.style.transform = 'scale(1.1)'; }}
                  onMouseOut={(e) => { if (window.matchMedia('(hover: hover)').matches) e.currentTarget.style.transform = 'scale(1)'; }}
                />
                <div className="gr-item-overlay">
                  <h4 className="gr-item-title">{photo.title}</h4>
                  <span className="gr-item-cat">{photo.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
