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
  const getImageUrl = (url) => url.startsWith('/uploads') ? `${API_URL}${url}` : url;

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

  if (loading) return <div style={{padding:'50px', textAlign:'center'}}><Loader className="animate-spin" /></div>;

  return (
    <div>
      {/* 1. ANIMATED HERO CAROUSEL */}
      {heroSlides.length > 0 ? (
        <div style={{position: 'relative', height: '80vh', minHeight: '500px', overflow: 'hidden', backgroundColor: '#000'}}>
          {heroSlides.map((slide, index) => (
            <div 
              key={slide._id}
              className={index === currentSlide ? "ken-burns" : ""} // Adds the slow zoom effect
              style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: `url('${getImageUrl(slide.imageUrl)}')`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                opacity: index === currentSlide ? 1 : 0,
                transition: 'opacity 1.5s ease-in-out', // Smooth fade
                zIndex: index === currentSlide ? 1 : 0
              }}
            >
              {/* Gradient Overlay */}
              <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent 60%)'}}></div>
              
              {/* Text Content */}
              <div className="container" style={{position: 'relative', height: '100%', display: 'flex', alignItems: 'flex-end', paddingBottom: '100px'}}>
                <div className={index === currentSlide ? "animate-slide-up" : ""} style={{color: 'white', padding: '0 20px'}}>
                  <span style={{backgroundColor: 'var(--church-gold)', padding: '5px 15px', borderRadius: '3px', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px'}}>Featured Gallery</span>
                  <h1 style={{fontSize: '4rem', marginTop: '20px', marginBottom: '15px', lineHeight: '1.1', textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}>{slide.title}</h1>
                  <p style={{fontSize: '1.2rem', opacity: 0.9}}>Abundant Rain Church</p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Navigation Arrows */}
          <button onClick={prevSlide} style={{position:'absolute', left:'20px', top:'50%', transform:'translateY(-50%)', background:'rgba(255,255,255,0.1)', backdropFilter: 'blur(5px)', color:'white', border:'none', borderRadius:'50%', width:'60px', height:'60px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', zIndex: 10, transition: '0.3s'}}>
            <ChevronLeft size={30}/>
          </button>
          <button onClick={nextSlide} style={{position:'absolute', right:'20px', top:'50%', transform:'translateY(-50%)', background:'rgba(255,255,255,0.1)', backdropFilter: 'blur(5px)', color:'white', border:'none', borderRadius:'50%', width:'60px', height:'60px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', zIndex: 10, transition: '0.3s'}}>
            <ChevronRight size={30}/>
          </button>
        </div>
      ) : (
        /* Fallback Header */
        <div style={{backgroundColor: 'var(--church-blue)', color: 'white', padding: '100px 20px', textAlign: 'center'}}>
          <h1 style={{fontSize: '3rem', marginBottom: '10px'}}>Our Gallery</h1>
          <p style={{fontSize: '1.2rem', color: 'var(--church-gold)'}}>Visual moments of our journey</p>
        </div>
      )}

      {/* 2. VIDEO IMMERSION SECTION */}
      {videoItems.length > 0 && (
        <div className="video-container" style={{position: 'relative', height: '500px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000'}}>
           <div className="video-overlay" style={{position: 'absolute', inset: 0, zIndex: 2}}></div>
           
           {/* Background Video */}
           <video 
              autoPlay muted loop playsInline
              style={{width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7}}
           >
             <source src={getImageUrl(videoItems[0].imageUrl)} type="video/mp4" />
           </video>
           
           {/* Center Content */}
           <div style={{position: 'absolute', textAlign: 'center', color: 'white', zIndex: 10}}>
              <PlayCircle size={80} color="var(--church-gold)" style={{marginBottom: '30px', filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))'}} />
              <h2 style={{fontSize: '3rem', textTransform: 'uppercase', letterSpacing: '5px', fontWeight: '300'}}>{videoItems[0].title}</h2>
              <p style={{fontSize: '1.1rem', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '10px'}}>Experience The Atmosphere</p>
           </div>
        </div>
      )}

      {/* 3. MASONRY STYLE GRID */}
      <div className="container" style={{padding: '80px 20px'}}>
        <div style={{textAlign: 'center', marginBottom: '50px'}}>
          <h2 style={{color: 'var(--church-blue)', fontSize: '2.5rem', marginBottom: '10px'}}>Latest Photos</h2>
          <div style={{width: '60px', height: '4px', backgroundColor: 'var(--church-gold)', margin: '0 auto'}}></div>
        </div>
        
        {galleryItems.length === 0 ? (
          <p style={{textAlign:'center', color: '#888'}}>No photos found in the gallery.</p>
        ) : (
          <div style={{
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '20px'
          }}>
            {galleryItems.map(photo => (
              <div key={photo._id} style={{position: 'relative', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', height: '300px'}} className="group hover:shadow-2xl transition duration-500">
                <img 
                  src={getImageUrl(photo.imageUrl)} 
                  alt={photo.title} 
                  style={{width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease'}}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                {/* Hover Overlay */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, 
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', 
                  padding: '20px', color: 'white', opacity: 1
                }}>
                  <h4 style={{margin: 0, fontSize: '1.1rem', fontWeight: 'bold'}}>{photo.title}</h4>
                  <span style={{fontSize: '0.8rem', color: 'var(--church-gold)', textTransform: 'uppercase'}}>{photo.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}