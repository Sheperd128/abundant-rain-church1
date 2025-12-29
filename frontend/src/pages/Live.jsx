import { useState, useEffect } from 'react';
import api from '../apiClient';
import { Loader } from 'lucide-react';

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
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    // Return original if we can't parse it (or if it is Facebook)
    return url; 
  };

  return (
    <div style={{backgroundColor: '#000', minHeight: '100vh', color: 'white'}}>
      <div className="container" style={{padding: '40px 20px', textAlign: 'center'}}>
        <h1 style={{marginBottom: '20px', color: 'var(--church-gold)'}}>Abundant Rain Live</h1>
        
        {loading ? (
          <div style={{height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Loader className="animate-spin text-white" />
          </div>
        ) : (
          <>
            {stream && stream.isActive ? (
              <div style={{position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%', background: '#222', borderRadius: '10px', marginBottom: '30px'}}>
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
              <div style={{padding: '60px', backgroundColor: '#111', borderRadius: '10px', marginBottom: '30px'}}>
                <h2>We are currently offline.</h2>
                <p>Please check back during our service times (Sundays 10:00 AM).</p>
              </div>
            )}
          </>
        )}

        <div style={{maxWidth: '800px', margin: '0 auto', textAlign: 'left'}}>
          <h3>Experiencing issues?</h3>
          <p style={{color: '#ccc', marginBottom: '20px'}}>Watch directly on our platforms:</p>
          <div style={{display: 'flex', gap: '15px'}}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="btn btn-primary" style={{backgroundColor: '#1877F2'}}>Watch on Facebook</a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="btn btn-primary" style={{backgroundColor: '#FF0000'}}>Watch on YouTube</a>
          </div>
        </div>
      </div>
    </div>
  );
}