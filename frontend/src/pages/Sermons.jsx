import { useState, useEffect } from 'react';
import api from '../apiClient';
import { PlayCircle, Calendar, User } from 'lucide-react';

export default function Sermons() {
  const [sermons, setSermons] = useState([]);

  useEffect(() => {
    api.get('/sermons').then(({ data }) => setSermons(data)).catch(console.error);
  }, []);

  return (
    <div className="container" style={{padding: '60px 20px'}}>
      <h1 style={{color: 'var(--church-blue)', marginBottom: '40px', borderBottom: '4px solid var(--church-gold)', display: 'inline-block'}}>
        Sermon Library
      </h1>

      {sermons.length === 0 ? (
        <p>No sermons uploaded yet. Check back soon!</p>
      ) : (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px'}}>
          {sermons.map(sermon => (
            <div key={sermon._id} className="card" style={{padding: 0, overflow: 'hidden'}}>
              {/* If it's a YouTube link, we can show a thumbnail, otherwise a placeholder */}
              <div style={{height: '200px', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <PlayCircle size={50} color="var(--church-blue)"/>
              </div>
              
              <div style={{padding: '20px'}}>
                <h3 style={{marginBottom: '10px', color: 'var(--church-blue)'}}>{sermon.title}</h3>
                <div style={{fontSize: '0.9rem', color: '#666', marginBottom: '15px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px'}}>
                    <User size={14}/> {sermon.preacher}
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                    <Calendar size={14}/> {new Date(sermon.date).toLocaleDateString()}
                  </div>
                </div>
                {sermon.videoUrl && (
                  <a href={sermon.videoUrl} target="_blank" rel="noreferrer" className="btn btn-primary" style={{width: '100%', justifyContent: 'center'}}>
                    Watch Now
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}