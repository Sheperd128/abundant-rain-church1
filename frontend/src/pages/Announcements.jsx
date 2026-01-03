import { useState, useEffect } from 'react';
import api from '../apiClient';
import { Loader, Bell, Calendar, Tag } from 'lucide-react';

export default function Announcements() {
  const [allUpdates, setAllUpdates] = useState([]);
  const [filteredUpdates, setFilteredUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      const { data } = await api.get('/ministries'); 
      setAllUpdates(data);
      setFilteredUpdates(data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (category) => {
    setFilter(category);
    if (category === 'All') {
      setFilteredUpdates(allUpdates);
    } else {
      setFilteredUpdates(allUpdates.filter(update => update.ministry === category));
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'General': return 'var(--church-gold)';
      case 'Men': return '#2563eb';
      case 'Women': return '#db2777';
      case 'Youth': return '#ea580c';
      case 'Children': return '#16a34a';
      default: return '#666';
    }
  };

  if (loading) return <div style={{padding:'100px', textAlign:'center'}}><Loader className="animate-spin" size={40} /></div>;

  return (
    <div style={{backgroundColor: '#f8f9fa', minHeight: '100vh'}}>
      {/* Header */}
      <div style={{
        backgroundColor: 'var(--church-blue)', 
        color: 'white', 
        padding: '80px 20px', 
        textAlign: 'center',
        backgroundImage: 'linear-gradient(to bottom, var(--church-blue), #0f1c3f)'
      }}>
        <h1 style={{fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '15px', fontWeight: 'bold'}}>Church News</h1>
        <p style={{fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--church-gold)', maxWidth: '600px', margin: '0 auto'}}>
          Stay connected with the latest updates and events.
        </p>
      </div>

      <div className="container" style={{padding: '40px 20px'}}>
        
        {/* Filter Buttons */}
        <div style={{
          display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '20px', marginBottom: '40px', 
          borderBottom: '1px solid #eee', whiteSpace: 'nowrap', justifyContent: 'center'
        }}>
          {['All', 'General', 'Men', 'Women', 'Youth', 'Children'].map(cat => (
            <button 
              key={cat}
              onClick={() => handleFilter(cat)}
              style={{
                padding: '10px 25px',
                borderRadius: '50px',
                border: filter === cat ? `2px solid ${getCategoryColor(cat === 'All' ? 'General' : cat)}` : '1px solid #ddd',
                cursor: 'pointer',
                backgroundColor: filter === cat ? getCategoryColor(cat === 'All' ? 'General' : cat) : 'white',
                color: filter === cat ? 'white' : '#555',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                flexShrink: 0,
                transition: '0.2s ease-in-out',
                boxShadow: filter === cat ? '0 4px 10px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              {cat === 'General' ? '📢 General' : cat}
            </button>
          ))}
        </div>

        {/* Announcements Grid */}
        {filteredUpdates.length === 0 ? (
          <div style={{textAlign:'center', padding: '80px 20px', color: '#888', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)'}}>
            <Bell size={60} style={{marginBottom: '20px', opacity: 0.2}} />
            <h3>No announcements found for {filter}.</h3>
          </div>
        ) : (
          <div style={{
            display: 'grid', 
            gap: '30px', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'start'
          }}>
            {filteredUpdates.map(update => (
              <div key={update._id} style={{
                backgroundColor: 'white', 
                borderRadius: '15px', 
                overflow: 'hidden',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease',
                border: '1px solid #eee'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {/* IMAGE DISPLAY */}
                {update.image && (
                  <div style={{width: '100%', maxHeight: '250px', overflow: 'hidden', backgroundColor: '#eee'}}>
                    <img 
                      src={update.image} 
                      alt={update.title} 
                      style={{width: '100%', height: '100%', objectFit: 'cover'}}
                    />
                  </div>
                )}

                <div style={{padding: '25px'}}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px'}}>
                    <span style={{
                      fontSize: '0.7rem', 
                      fontWeight: '800', 
                      textTransform: 'uppercase', 
                      color: getCategoryColor(update.ministry),
                      backgroundColor: `${getCategoryColor(update.ministry)}15`,
                      padding: '5px 12px',
                      borderRadius: '50px',
                      display: 'flex', alignItems: 'center', gap: '5px'
                    }}>
                      <Tag size={12} /> {update.ministry}
                    </span>
                    <span style={{display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: '#999'}}>
                      <Calendar size={14}/> {new Date(update.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h2 style={{margin: '0 0 15px 0', color: '#2d3748', fontSize: '1.4rem', lineHeight: '1.3'}}>{update.title}</h2>
                  <p style={{color: '#4a5568', lineHeight: '1.6', whiteSpace: 'pre-wrap', fontSize: '0.95rem'}}>{update.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}