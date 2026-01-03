import { useState, useEffect } from 'react';
import api from '../apiClient';
import { Loader, Youtube, Facebook, AlertCircle } from 'lucide-react';

export default function Live() {
  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStream = async () => {
      try {
        const { data } = await api.get('/live');
        setStream(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStream();
  }, []);

  // Helper to convert standard YouTube URL to Embed URL
  const getEmbedUrl = (url) => {
    if (!url) return '';
    try {
      let videoId = '';
      if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('v=')[1].split('&')[0];
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
      } else if (url.includes('youtube.com/live/')) {
        videoId = url.split('live/')[1].split('?')[0];
      }
      
      if(videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      
      return url; // Return original if it's not a standard YouTube link (e.g. Facebook embed src)
    } catch (e) {
      return url;
    }
  };

  return (
    <div style={{backgroundColor: '#0a0a0a', minHeight: '100vh', color: 'white'}}>
      <div className="container" style={{padding: '60px 20px', textAlign: 'center'}}>
        <h1 style={{marginBottom: '10px', color: 'var(--church-gold)', fontSize: 'clamp(2rem, 5vw, 3rem)'}}>Abundant Rain Live</h1>
        <p style={{color: '#888', marginBottom: '40px'}}>Join us in worship, wherever you are.</p>
        
        {loading ? (
          <div style={{height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Loader className="animate-spin text-white" size={40} />
          </div>
        ) : (
          <div style={{maxWidth: '1000px', margin: '0 auto'}}>
            {stream && stream.isActive && stream.embedUrl ? (
              <div style={{
                position: 'relative', 
                paddingBottom: '56.25%', /* 16:9 Aspect Ratio */
                height: 0, 
                overflow: 'hidden', 
                background: '#000', 
                borderRadius: '15px', 
                boxShadow: '0 0 50px rgba(198, 156, 58, 0.2)',
                marginBottom: '40px'
              }}>
                <iframe 
                  style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
                  src={getEmbedUrl(stream.embedUrl)} 
                  title="Live Stream"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div style={{
                padding: '80px 20px', 
                backgroundColor: '#161616', 
                borderRadius: '15px', 
                marginBottom: '40px',
                border: '1px solid #333'
              }}>
                <h2 style={{color: 'white', marginBottom: '15px'}}>We are currently offline</h2>
                <p style={{color: '#888'}}>Please check back during our service times (Sundays 10:00 AM).</p>
                <p style={{marginTop: '20px'}}>
                  <a href={stream?.youtubeLink || 'https://www.youtube.com/@abundant_rainVosloorus'} target="_blank" rel="noreferrer" style={{color: 'var(--church-gold)', textDecoration: 'underline'}}>View past sermons on YouTube</a>
                </p>
              </div>
            )}

            {/* OPTIONS SECTION */}
            <div style={{
              textAlign: 'left', 
              backgroundColor: '#1a1a1a', 
              padding: '30px', 
              borderRadius: '12px', 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '30px', 
              alignItems: 'center'
            }}>
              <div style={{flex: 1, minWidth: '280px'}}>
                <h3 style={{display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', marginBottom: '10px'}}>
                  <AlertCircle size={20} color="var(--church-gold)" /> Having trouble watching?
                </h3>
                <p style={{color: '#aaa', fontSize: '0.95rem'}}>
                  If the player above isn't loading, try watching directly on our social platforms.
                </p>
              </div>
              
              <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
                <a 
                  href={stream?.facebookLink || "www.facebook.com"} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn" 
                  style={{backgroundColor: '#1877F2', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', border: 'none'}}
                >
                  <Facebook size={18} /> Watch on Facebook
                </a>
                <a 
                  href={stream?.youtubeLink || "https://www.youtube.com/@abundant_rainVosloorus"} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn" 
                  style={{backgroundColor: '#FF0000', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', border: 'none'}}
                >
                  <Youtube size={18} /> Watch on YouTube
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}